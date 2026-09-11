import crypto from "node:crypto"

import {
  ACTIVE_BOOKING_STATUSES,
  BOOKING_OPENS_AT,
  INITIAL_BOOKING_STATUS,
  DRIVE_END_DATE,
  DRIVE_START_DATE,
  type BookingStatus,
  type EducationLevelId,
  type InterviewLanguageId,
  type TechnologyTrackId,
} from "./config"
import { formatIstDate, formatIstTimeRange, formatIstWeekday, formatIstWeekdayShort, istToEpoch, nowInIst } from "./ist"
import { mutate, readDb } from "./store"
import type {
  AdminLog,
  Candidate,
  InterviewBooking,
  InterviewDriveDb,
  InterviewSlot,
  PublicDate,
  PublicSlot,
  ResumeRef,
} from "./types"

/** Error carrying an HTTP status + machine-readable code for the API layer. */
export class BookingError extends Error {
  status: number
  code: string
  details?: Record<string, unknown>

  constructor(code: string, message: string, status = 400, details?: Record<string, unknown>) {
    super(message)
    this.name = "BookingError"
    this.code = code
    this.status = status
    this.details = details
  }
}

const nowIso = () => new Date().toISOString()
const newId = () => crypto.randomUUID()

/* --------------------------------------------------------- campaign state */

/** End of the final interview day, IST. Bookings close the instant this passes. */
export function driveClosesAtEpoch(endDate = DRIVE_END_DATE): number {
  return istToEpoch(endDate, "00:00") + 24 * 60 * 60 * 1000 - 1
}

export type DriveState = {
  isOpen: boolean
  /** "open" | "not_started" | "closed" */
  phase: "open" | "not_started" | "closed"
  startDate: string
  endDate: string
  opensAt: string | null
  message: string | null
}

/**
 * Campaign window. Enforced on the server for every booking attempt — the
 * page also renders from this, but the frontend is never the authority.
 */
export function computeDriveState(db: InterviewDriveDb, now = Date.now()): DriveState {
  const startDate = db.drive.startDate || DRIVE_START_DATE
  const endDate = db.drive.endDate || DRIVE_END_DATE

  if (db.drive.status === "closed") {
    return { isOpen: false, phase: "closed", startDate, endDate, opensAt: null, message: "This interview drive has now closed." }
  }
  if (now > driveClosesAtEpoch(endDate)) {
    return { isOpen: false, phase: "closed", startDate, endDate, opensAt: null, message: "This interview drive has now closed." }
  }
  if (BOOKING_OPENS_AT && now < istToEpoch(BOOKING_OPENS_AT, "00:00")) {
    return {
      isOpen: false,
      phase: "not_started",
      startDate,
      endDate,
      opensAt: BOOKING_OPENS_AT,
      message: `Bookings open on ${formatIstDate(BOOKING_OPENS_AT)}.`,
    }
  }
  return { isOpen: true, phase: "open", startDate, endDate, opensAt: null, message: null }
}

/* ------------------------------------------------------------------ slots */

function activeBookingSlotIds(db: InterviewDriveDb): Set<string> {
  const ids = new Set<string>()
  for (const booking of db.bookings) {
    if (ACTIVE_BOOKING_STATUSES.includes(booking.status)) ids.add(booking.slotId)
  }
  return ids
}

function isSlotInDriveRange(slot: InterviewSlot, db: InterviewDriveDb): boolean {
  return slot.date >= (db.drive.startDate || DRIVE_START_DATE) && slot.date <= (db.drive.endDate || DRIVE_END_DATE)
}

/** A slot is "past" once its start time has gone by in IST. */
function isSlotPast(slot: InterviewSlot, now: number): boolean {
  return istToEpoch(slot.date, slot.startTime) <= now
}

function slotState(
  slot: InterviewSlot,
  bookedIds: Set<string>,
  now: number,
): PublicSlot["state"] {
  if (bookedIds.has(slot.id)) return "booked"
  if (slot.status === "blocked") return "unavailable"
  if (isSlotPast(slot, now)) return "past"
  return "available"
}

/** Public slot list for one date. Carries no candidate information at all. */
export async function listPublicSlots(date: string, now = Date.now()): Promise<PublicSlot[]> {
  const db = await readDb()
  const bookedIds = activeBookingSlotIds(db)

  return db.slots
    .filter((slot) => slot.date === date && isSlotInDriveRange(slot, db))
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .map((slot) => ({
      id: slot.id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      label: formatIstTimeRange(slot.startTime, slot.endTime),
      state: slotState(slot, bookedIds, now),
    }))
}

/**
 * Public date list with live availability counts.
 *
 * Counts are derived in a single pass over slots + bookings — no candidate
 * records are loaded or scanned to answer "how many slots are free".
 */
export async function listPublicDates(now = Date.now()): Promise<PublicDate[]> {
  const db = await readDb()
  const bookedIds = activeBookingSlotIds(db)
  const byDate = new Map<string, { total: number; available: number }>()

  for (const slot of db.slots) {
    if (!isSlotInDriveRange(slot, db)) continue
    const bucket = byDate.get(slot.date) ?? { total: 0, available: 0 }
    bucket.total += 1
    if (slotState(slot, bookedIds, now) === "available") bucket.available += 1
    byDate.set(slot.date, bucket)
  }

  const todayIst = nowInIst(now).date
  return [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, counts]) => ({
      date,
      label: formatIstDate(date),
      shortLabel: formatIstWeekdayShort(date),
      weekday: formatIstWeekday(date),
      totalSlots: counts.total,
      availableSlots: counts.available,
      isPast: date < todayIst,
    }))
}

/* -------------------------------------------------------- booking creation */

function generateBookingReference(db: InterviewDriveDb): string {
  // Unambiguous alphabet: no O/0 or I/1, so a reference read aloud or typed
  // from an email cannot land on the wrong booking.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const year = (db.drive.startDate || DRIVE_START_DATE).slice(0, 4)
  const taken = new Set(db.bookings.map((b) => b.bookingReference))

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const bytes = crypto.randomBytes(4)
    let suffix = ""
    for (let i = 0; i < 4; i += 1) suffix += alphabet[bytes[i] % alphabet.length]
    const reference = `RW-${year}-${suffix}`
    if (!taken.has(reference)) return reference
  }
  throw new BookingError("reference_generation_failed", "Could not generate a booking reference.", 500)
}

export type CreateBookingInput = {
  name: string
  email: string
  phone: string
  college: string
  graduationYear: number
  educationLevel: EducationLevelId | null
  technology: TechnologyTrackId
  language: InterviewLanguageId
  date: string
  slotId: string
  resume: ResumeRef | null
}

export type CreateBookingResult = {
  booking: InterviewBooking
  candidate: Candidate
  slot: InterviewSlot
}

/**
 * Creates a booking. Every check runs inside a single `mutate()` transaction,
 * so the window between "slot looks free" and "slot is mine" is closed: two
 * simultaneous requests for the same slot are serialised, and the second one
 * re-reads committed state and loses cleanly with SLOT_TAKEN.
 */
export async function createBooking(input: CreateBookingInput, now = Date.now()): Promise<CreateBookingResult> {
  const email = input.email.trim().toLowerCase()

  return mutate((db) => {
    // 5. Interview drive is still active.
    const state = computeDriveState(db, now)
    if (!state.isOpen) {
      throw new BookingError("drive_closed", state.message ?? "This interview drive is not accepting bookings.", 403)
    }

    // 1. Date is inside the drive window. Checked before the slot lookup so an
    //    out-of-window date gives a clear reason rather than a bare 404.
    const driveStart = db.drive.startDate || DRIVE_START_DATE
    const driveEnd = db.drive.endDate || DRIVE_END_DATE
    if (input.date < driveStart || input.date > driveEnd) {
      throw new BookingError("date_out_of_range", "Interviews are only available between 14 and 18 September 2026.", 400)
    }

    // 2. Selected slot exists.
    const slot = db.slots.find((s) => s.id === input.slotId)
    if (!slot) throw new BookingError("slot_not_found", "That interview slot does not exist.", 404)

    // 3. Selected slot belongs to the selected date.
    if (slot.date !== input.date) {
      throw new BookingError("slot_date_mismatch", "The selected slot does not belong to the selected date.", 400)
    }

    // Defence in depth: the slot's own date must also sit inside the window.
    if (!isSlotInDriveRange(slot, db)) {
      throw new BookingError("date_out_of_range", "Interviews are only available between 14 and 18 September 2026.", 400)
    }

    // 4a. Slot is not blocked by an admin.
    if (slot.status === "blocked") {
      throw new BookingError("slot_unavailable", "That slot is unavailable. Please choose another slot.", 409)
    }

    // 4b. Slot has not already started.
    if (isSlotPast(slot, now)) {
      throw new BookingError("slot_past", "That slot has already started. Please choose a later slot.", 409)
    }

    // 7. Slot is not already booked — the unique (slot -> active booking) rule.
    const slotTaken = db.bookings.some(
      (b) => b.slotId === slot.id && ACTIVE_BOOKING_STATUSES.includes(b.status),
    )
    if (slotTaken) {
      throw new BookingError(
        "slot_taken",
        "This slot has just been booked. Please select the next available 15-minute slot.",
        409,
      )
    }

    // One candidate = one active booking, keyed on email.
    if (!db.drive.allowMultipleBookings) {
      const existing = db.bookings.find((b) => {
        if (!ACTIVE_BOOKING_STATUSES.includes(b.status)) return false
        const candidate = db.candidates.find((c) => c.id === b.candidateId)
        return candidate?.email === email
      })
      if (existing) {
        throw new BookingError(
          "duplicate_booking",
          "You already have an interview slot booked for this drive.",
          409,
          {
            bookingReference: existing.bookingReference,
            date: existing.interviewDate,
            dateLabel: formatIstDate(existing.interviewDate),
            startTime: existing.interviewStartTime,
            endTime: existing.interviewEndTime,
            timeLabel: formatIstTimeRange(existing.interviewStartTime, existing.interviewEndTime),
            technology: existing.technology,
          },
        )
      }
    }

    const timestamp = nowIso()

    // Reuse the candidate record when the same email returns (e.g. after an
    // admin cancelled their previous booking), so history stays on one person.
    let candidate = db.candidates.find((c) => c.email === email)
    if (candidate) {
      candidate.name = input.name
      candidate.phone = input.phone
      candidate.college = input.college
      candidate.graduationYear = input.graduationYear
      candidate.educationLevel = input.educationLevel
      if (input.resume) candidate.resume = input.resume
      candidate.updatedAt = timestamp
    } else {
      candidate = {
        id: newId(),
        name: input.name,
        email,
        phone: input.phone,
        college: input.college,
        graduationYear: input.graduationYear,
        educationLevel: input.educationLevel,
        resume: input.resume,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      db.candidates.push(candidate)
    }

    const booking: InterviewBooking = {
      id: newId(),
      driveId: db.drive.id,
      candidateId: candidate.id,
      slotId: slot.id,
      technology: input.technology,
      language: input.language,
      // Awaiting admin verification — the slot is held, but the interview is
      // not confirmed to the candidate until an admin approves it.
      status: INITIAL_BOOKING_STATUS,
      bookingReference: generateBookingReference(db),
      interviewDate: slot.date,
      interviewStartTime: slot.startTime,
      interviewEndTime: slot.endTime,
      adminNotes: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      cancelledAt: null,
      rescheduledFrom: null,
    }
    db.bookings.push(booking)

    return { booking, candidate, slot }
  })
}

/* ---------------------------------------------------------------- lookups */

export async function getBookingByReference(reference: string) {
  const db = await readDb()
  const booking = db.bookings.find((b) => b.bookingReference === reference.trim().toUpperCase())
  if (!booking) return null
  const candidate = db.candidates.find((c) => c.id === booking.candidateId) ?? null
  return { booking, candidate }
}

export async function findActiveBookingByEmail(email: string) {
  const db = await readDb()
  const normalized = email.trim().toLowerCase()
  const candidate = db.candidates.find((c) => c.email === normalized)
  if (!candidate) return null
  const booking = db.bookings.find(
    (b) => b.candidateId === candidate.id && ACTIVE_BOOKING_STATUSES.includes(b.status),
  )
  return booking ? { booking, candidate } : null
}

/* ------------------------------------------------------------- admin logs */

export function appendAdminLog(
  db: InterviewDriveDb,
  entry: Omit<AdminLog, "id" | "createdAt">,
): AdminLog {
  const log: AdminLog = { ...entry, id: newId(), createdAt: nowIso() }
  db.adminLogs.push(log)
  // Bounded so the JSON file cannot grow without limit.
  if (db.adminLogs.length > 5000) db.adminLogs = db.adminLogs.slice(-5000)
  return log
}

export function isActiveStatus(status: BookingStatus) {
  return ACTIVE_BOOKING_STATUSES.includes(status)
}
