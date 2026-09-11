import {
  ACTIVE_BOOKING_STATUSES,
  BOOKING_STATUS_LABELS,
  getEducationLevelName,
  getLanguageName,
  getTrackName,
  type BookingStatus,
} from "./config"
import { dropPendingJobs, queueConfirmationResend, queueReminders, queueScheduledEmails } from "./email"
import { formatIstDate, formatIstDateShort, formatIstTimeRange, formatIstWeekday, istToEpoch, nowInIst } from "./ist"
import { BookingError, appendAdminLog, computeDriveState } from "./repo"
import { mutate, readDb } from "./store"
import type { AdminUser, EmailJob, InterviewBooking, InterviewDriveDb } from "./types"

/**
 * Admin dashboard operations.
 *
 * Everything here assumes the caller has already been authenticated by the
 * route handler — these functions are never reachable from a public endpoint.
 */

type ActorMeta = { admin: AdminUser; ip?: string | null }

const nowIso = () => new Date().toISOString()

/* ------------------------------------------------------------- overview */

export type Overview = {
  totalApplications: number
  totalBookings: number
  totalSlots: number
  availableSlots: number
  bookedSlots: number
  blockedSlots: number
  todaysInterviews: number
  pendingReview: number
  completedInterviews: number
  selected: number
  rejected: number
  noShow: number
  cancelled: number
  emailsPending: number
  emailsFailed: number
  driveStatus: "open" | "not_started" | "closed"
  byDate: {
    date: string
    label: string
    shortLabel: string
    weekday: string
    totalSlots: number
    bookedSlots: number
    availableSlots: number
    blockedSlots: number
  }[]
  byTechnology: { id: string; name: string; count: number }[]
  byLanguage: { id: string; name: string; count: number }[]
}

export async function getOverview(now = Date.now()): Promise<Overview> {
  const db = await readDb()
  const todayIst = nowInIst(now).date

  const activeBookings = db.bookings.filter((b) => ACTIVE_BOOKING_STATUSES.includes(b.status))
  const bookedSlotIds = new Set(activeBookings.map((b) => b.slotId))

  const byDate = new Map<
    string,
    { totalSlots: number; bookedSlots: number; availableSlots: number; blockedSlots: number }
  >()
  for (const slot of db.slots) {
    const bucket = byDate.get(slot.date) ?? { totalSlots: 0, bookedSlots: 0, availableSlots: 0, blockedSlots: 0 }
    bucket.totalSlots += 1
    if (bookedSlotIds.has(slot.id)) bucket.bookedSlots += 1
    else if (slot.status === "blocked") bucket.blockedSlots += 1
    else bucket.availableSlots += 1
    byDate.set(slot.date, bucket)
  }

  const countBy = <T extends string>(items: T[]) => {
    const map = new Map<T, number>()
    for (const item of items) map.set(item, (map.get(item) ?? 0) + 1)
    return map
  }
  const techCounts = countBy(activeBookings.map((b) => b.technology))
  const langCounts = countBy(activeBookings.map((b) => b.language))

  const statusCount = (status: BookingStatus) => db.bookings.filter((b) => b.status === status).length

  return {
    totalApplications: db.candidates.length,
    totalBookings: activeBookings.length,
    totalSlots: db.slots.length,
    availableSlots: [...byDate.values()].reduce((sum, d) => sum + d.availableSlots, 0),
    bookedSlots: bookedSlotIds.size,
    blockedSlots: [...byDate.values()].reduce((sum, d) => sum + d.blockedSlots, 0),
    todaysInterviews: activeBookings.filter((b) => b.interviewDate === todayIst).length,
    pendingReview: statusCount("pending"),
    completedInterviews: statusCount("completed"),
    selected: statusCount("selected"),
    rejected: statusCount("rejected"),
    noShow: statusCount("no_show"),
    cancelled: statusCount("cancelled"),
    emailsPending: db.emailJobs.filter((j) => j.status === "pending" || j.status === "retrying").length,
    emailsFailed: db.emailJobs.filter((j) => j.status === "failed").length,
    driveStatus: computeDriveState(db, now).phase,
    byDate: [...byDate.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, counts]) => ({
        date,
        label: formatIstDate(date),
        shortLabel: formatIstDateShort(date),
        weekday: formatIstWeekday(date),
        ...counts,
      })),
    byTechnology: [...techCounts.entries()].map(([id, count]) => ({ id, name: getTrackName(id), count })),
    byLanguage: [...langCounts.entries()].map(([id, count]) => ({ id, name: getLanguageName(id), count })),
  }
}

/* ------------------------------------------------------- candidate list */

export type CandidateRow = {
  bookingId: string
  bookingReference: string
  name: string
  email: string
  phone: string
  college: string
  graduationYear: number
  educationLevel: string | null
  technology: string
  technologyId: string
  interviewDate: string
  interviewDateLabel: string
  interviewTime: string
  interviewTimeLabel: string
  language: string
  languageId: string
  resume: { id: string; originalName: string; size: number } | null
  status: BookingStatus
  statusLabel: string
  adminNotes: string | null
  createdAt: string
  emailStatus: {
    submission: EmailJob["status"] | "none"
    confirmation: EmailJob["status"] | "none"
    reminder24h: EmailJob["status"] | "none"
    reminder1h: EmailJob["status"] | "none"
    lastError: string | null
  }
}

export type CandidateFilters = {
  date?: string
  technology?: string
  status?: string
  language?: string
  college?: string
  search?: string
  sortBy?: "interview_date" | "interview_time" | "registration_date" | "name"
  sortDir?: "asc" | "desc"
  page?: number
  pageSize?: number
}

function summariseEmails(jobs: EmailJob[]): CandidateRow["emailStatus"] {
  const pick = (kind: EmailJob["kind"]) => {
    const matches = jobs.filter((j) => j.kind === kind)
    if (matches.length === 0) return "none" as const
    // "sent" wins over a stale earlier failure for the same kind.
    if (matches.some((j) => j.status === "sent")) return "sent" as const
    return matches[matches.length - 1].status
  }
  // Surface the error while a job is still retrying too, not just once it has
  // given up — an admin wants to see "wrong SMTP password" on attempt 1.
  const failed = jobs.filter((j) => (j.status === "failed" || j.status === "retrying") && j.lastError)
  return {
    submission: pick("submission_received"),
    confirmation: pick("confirmation"),
    reminder24h: pick("reminder_24h"),
    reminder1h: pick("reminder_1h"),
    lastError: failed.length > 0 ? failed[failed.length - 1].lastError ?? null : null,
  }
}

export async function listCandidates(filters: CandidateFilters = {}) {
  const db = await readDb()
  const candidateById = new Map(db.candidates.map((c) => [c.id, c]))
  const jobsByBooking = new Map<string, EmailJob[]>()
  for (const job of db.emailJobs) {
    if (!job.bookingId) continue
    const list = jobsByBooking.get(job.bookingId) ?? []
    list.push(job)
    jobsByBooking.set(job.bookingId, list)
  }

  const search = filters.search?.trim().toLowerCase() ?? ""
  const college = filters.college?.trim().toLowerCase() ?? ""

  let rows: CandidateRow[] = db.bookings.flatMap((booking) => {
    const candidate = candidateById.get(booking.candidateId)
    if (!candidate) return []

    if (filters.date && booking.interviewDate !== filters.date) return []
    if (filters.technology && booking.technology !== filters.technology) return []
    if (filters.status && booking.status !== filters.status) return []
    if (filters.language && booking.language !== filters.language) return []
    if (college && !candidate.college.toLowerCase().includes(college)) return []
    if (search) {
      const haystack = [candidate.name, candidate.email, booking.bookingReference, candidate.phone, candidate.college]
        .join(" ")
        .toLowerCase()
      if (!haystack.includes(search)) return []
    }

    return [
      {
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        college: candidate.college,
        graduationYear: candidate.graduationYear,
        educationLevel: candidate.educationLevel ? getEducationLevelName(candidate.educationLevel) : null,
        technology: getTrackName(booking.technology),
        technologyId: booking.technology,
        interviewDate: booking.interviewDate,
        interviewDateLabel: formatIstDate(booking.interviewDate),
        interviewTime: booking.interviewStartTime,
        interviewTimeLabel: formatIstTimeRange(booking.interviewStartTime, booking.interviewEndTime),
        language: getLanguageName(booking.language),
        languageId: booking.language,
        resume: candidate.resume
          ? { id: candidate.resume.id, originalName: candidate.resume.originalName, size: candidate.resume.size }
          : null,
        status: booking.status,
        statusLabel: BOOKING_STATUS_LABELS[booking.status],
        adminNotes: booking.adminNotes ?? null,
        createdAt: booking.createdAt,
        emailStatus: summariseEmails(jobsByBooking.get(booking.id) ?? []),
      },
    ]
  })

  const dir = filters.sortDir === "desc" ? -1 : 1
  const comparators: Record<NonNullable<CandidateFilters["sortBy"]>, (a: CandidateRow, b: CandidateRow) => number> = {
    interview_date: (a, b) =>
      a.interviewDate === b.interviewDate
        ? a.interviewTime.localeCompare(b.interviewTime)
        : a.interviewDate.localeCompare(b.interviewDate),
    interview_time: (a, b) =>
      a.interviewTime === b.interviewTime
        ? a.interviewDate.localeCompare(b.interviewDate)
        : a.interviewTime.localeCompare(b.interviewTime),
    registration_date: (a, b) => a.createdAt.localeCompare(b.createdAt),
    name: (a, b) => a.name.localeCompare(b.name),
  }
  const comparator = comparators[filters.sortBy ?? "interview_date"]
  rows.sort((a, b) => comparator(a, b) * dir)

  const total = rows.length
  const pageSize = Math.min(Math.max(filters.pageSize ?? 50, 1), 200)
  const page = Math.max(filters.page ?? 1, 1)
  const start = (page - 1) * pageSize

  return {
    rows: rows.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    colleges: [...new Set(db.candidates.map((c) => c.college))].sort(),
  }
}

export async function getCandidateDetail(bookingId: string) {
  const db = await readDb()
  const booking = db.bookings.find((b) => b.id === bookingId)
  if (!booking) return null
  const candidate = db.candidates.find((c) => c.id === booking.candidateId)
  if (!candidate) return null
  const slot = db.slots.find((s) => s.id === booking.slotId) ?? null
  const emails = db.emailJobs
    .filter((j) => j.bookingId === bookingId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  return { booking, candidate, slot, emails }
}

/* ----------------------------------------------------------- mutations */

function requireBooking(db: InterviewDriveDb, bookingId: string): InterviewBooking {
  const booking = db.bookings.find((b) => b.id === bookingId)
  if (!booking) throw new BookingError("booking_not_found", "That booking no longer exists.", 404)
  return booking
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  adminNotes: string | null | undefined,
  actor: ActorMeta,
) {
  return mutate((db) => {
    const booking = requireBooking(db, bookingId)
    const previous = booking.status
    booking.status = status
    if (adminNotes !== undefined) booking.adminNotes = adminNotes
    booking.updatedAt = nowIso()
    if (status === "cancelled") booking.cancelledAt = nowIso()

    const candidate = db.candidates.find((c) => c.id === booking.candidateId)
    if (candidate) {
      if (status === "scheduled" && previous !== "scheduled") {
        // The admin has verified this candidate. This transition — and only
        // this one — sends the interview confirmation and starts reminders.
        queueScheduledEmails(db, booking, candidate)
      } else {
        // Any other status change just re-evaluates reminders: a cancelled,
        // rejected or completed booking stops being reminded.
        queueReminders(db, booking, candidate)
      }
    }

    appendAdminLog(db, {
      adminId: actor.admin.id,
      adminEmail: actor.admin.email,
      action: "booking.status_updated",
      targetType: "booking",
      targetId: booking.id,
      details: { from: previous, to: status, reference: booking.bookingReference },
      ip: actor.ip ?? null,
    })
    return { ...booking }
  })
}

export async function cancelBooking(bookingId: string, actor: ActorMeta) {
  return updateBookingStatus(bookingId, "cancelled", undefined, actor)
}

/**
 * Moves a candidate to a different slot. Runs the same slot-availability
 * checks as a public booking, inside the same transaction, so an admin cannot
 * accidentally double-book a slot a candidate is taking at that moment.
 */
export async function rescheduleBooking(bookingId: string, newSlotId: string, actor: ActorMeta, now = Date.now()) {
  return mutate((db) => {
    const booking = requireBooking(db, bookingId)
    const slot = db.slots.find((s) => s.id === newSlotId)
    if (!slot) throw new BookingError("slot_not_found", "That interview slot does not exist.", 404)

    if (slot.id === booking.slotId) {
      throw new BookingError("same_slot", "The candidate is already booked into that slot.", 400)
    }
    const taken = db.bookings.some(
      (b) => b.id !== booking.id && b.slotId === slot.id && ACTIVE_BOOKING_STATUSES.includes(b.status),
    )
    if (taken) throw new BookingError("slot_taken", "That slot is already booked by another candidate.", 409)
    if (slot.status === "blocked") {
      throw new BookingError("slot_unavailable", "That slot is blocked. Unblock it first.", 409)
    }

    const previous = { slotId: booking.slotId, date: booking.interviewDate, startTime: booking.interviewStartTime }
    booking.slotId = slot.id
    booking.interviewDate = slot.date
    booking.interviewStartTime = slot.startTime
    booking.interviewEndTime = slot.endTime
    booking.rescheduledFrom = previous
    booking.updatedAt = nowIso()
    // Reviving a cancelled booking returns it to review, not straight to
    // confirmed — an admin still has to approve it.
    if (booking.status === "cancelled") booking.status = "pending"

    const candidate = db.candidates.find((c) => c.id === booking.candidateId)
    if (candidate) {
      // Reminders must fire against the NEW date/time, never the old one.
      queueReminders(db, booking, candidate, now)
      // Only tell the candidate about the new time if they had already been
      // confirmed. A pending candidate has never been given a time to change.
      if (booking.status === "scheduled") queueConfirmationResend(db, booking, candidate, now)
    }

    appendAdminLog(db, {
      adminId: actor.admin.id,
      adminEmail: actor.admin.email,
      action: "booking.rescheduled",
      targetType: "booking",
      targetId: booking.id,
      details: { from: previous, to: { slotId: slot.id, date: slot.date, startTime: slot.startTime } },
      ip: actor.ip ?? null,
    })
    return { ...booking }
  })
}

export async function setSlotBlocked(
  slotId: string,
  blocked: boolean,
  reason: string | null | undefined,
  actor: ActorMeta,
) {
  return mutate((db) => {
    const slot = db.slots.find((s) => s.id === slotId)
    if (!slot) throw new BookingError("slot_not_found", "That interview slot does not exist.", 404)

    if (blocked) {
      const taken = db.bookings.some((b) => b.slotId === slot.id && ACTIVE_BOOKING_STATUSES.includes(b.status))
      if (taken) {
        throw new BookingError("slot_booked", "Cancel or reschedule the booking before blocking this slot.", 409)
      }
      slot.status = "blocked"
      slot.blockedReason = reason ?? null
      slot.blockedAt = nowIso()
      slot.blockedBy = actor.admin.id
    } else {
      slot.status = "available"
      slot.blockedReason = null
      slot.blockedAt = null
      slot.blockedBy = null
    }

    appendAdminLog(db, {
      adminId: actor.admin.id,
      adminEmail: actor.admin.email,
      action: blocked ? "slot.blocked" : "slot.unblocked",
      targetType: "slot",
      targetId: slot.id,
      details: { date: slot.date, startTime: slot.startTime, reason: reason ?? null },
      ip: actor.ip ?? null,
    })
    return { ...slot }
  })
}

export async function resendConfirmationEmail(bookingId: string, actor: ActorMeta) {
  return mutate((db) => {
    const booking = requireBooking(db, bookingId)
    const candidate = db.candidates.find((c) => c.id === booking.candidateId)
    if (!candidate) throw new BookingError("candidate_not_found", "That candidate no longer exists.", 404)

    // Clear stuck/failed confirmation jobs so the fresh one is the live record.
    dropPendingJobs(db, booking.id, ["confirmation"])
    queueConfirmationResend(db, booking, candidate)

    appendAdminLog(db, {
      adminId: actor.admin.id,
      adminEmail: actor.admin.email,
      action: "booking.confirmation_resent",
      targetType: "booking",
      targetId: booking.id,
      details: { to: candidate.email },
      ip: actor.ip ?? null,
    })
    return { queued: true, to: candidate.email }
  })
}

/* ------------------------------------------------------- slot management */

export type AdminSlotRow = {
  id: string
  date: string
  startTime: string
  endTime: string
  label: string
  status: "available" | "booked" | "blocked"
  blockedReason: string | null
  booking: { id: string; reference: string; candidateName: string; status: BookingStatus } | null
}

export async function listAdminSlots(date?: string): Promise<AdminSlotRow[]> {
  const db = await readDb()
  const candidateById = new Map(db.candidates.map((c) => [c.id, c]))
  const bookingBySlot = new Map<string, InterviewBooking>()
  for (const booking of db.bookings) {
    if (ACTIVE_BOOKING_STATUSES.includes(booking.status)) bookingBySlot.set(booking.slotId, booking)
  }

  return db.slots
    .filter((slot) => !date || slot.date === date)
    .sort((a, b) => (a.date === b.date ? a.startTime.localeCompare(b.startTime) : a.date.localeCompare(b.date)))
    .map((slot) => {
      const booking = bookingBySlot.get(slot.id) ?? null
      const candidate = booking ? candidateById.get(booking.candidateId) : null
      return {
        id: slot.id,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        label: formatIstTimeRange(slot.startTime, slot.endTime),
        status: booking ? "booked" : slot.status === "blocked" ? "blocked" : "available",
        blockedReason: slot.blockedReason ?? null,
        booking: booking
          ? {
              id: booking.id,
              reference: booking.bookingReference,
              candidateName: candidate?.name ?? "Unknown",
              status: booking.status,
            }
          : null,
      }
    })
}

/** Free slots an admin can reschedule a candidate into. */
export async function listReschedulableSlots(now = Date.now()): Promise<AdminSlotRow[]> {
  const slots = await listAdminSlots()
  return slots.filter((slot) => slot.status === "available" && istToEpoch(slot.date, slot.startTime) > now)
}
