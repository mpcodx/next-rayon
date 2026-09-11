import crypto from "node:crypto"
import nodemailer from "nodemailer"

import { MAX_EMAIL_ATTEMPTS, REMINDABLE_BOOKING_STATUSES, type EmailKind } from "./config"
import {
  buildAdminNotificationEmail,
  buildConfirmationEmail,
  buildReminderEmail,
  buildSubmissionReceivedEmail,
} from "./email-templates"
import { istToEpoch } from "./ist"
import { mutate, readDb } from "./store"
import type { Candidate, EmailJob, InterviewBooking, InterviewDriveDb } from "./types"

/**
 * Durable email queue.
 *
 * Booking and email delivery are deliberately decoupled: the booking commits
 * first, then jobs are queued, then the API returns. A failing SMTP provider
 * therefore can never cancel or slow down a confirmed interview slot — the
 * job simply retries with backoff and the admin sees its status.
 */

const EMAIL_USER = (process.env.EMAIL_USER || "").trim()
const EMAIL_PASS = (process.env.EMAIL_PASS || "").replace(/\s+/g, "")
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Rayon Web Solutions"

/**
 * Where the internal booking notification is sent.
 *
 * Defaults to EMAIL_USER — the same account that sends everything else — so
 * no extra mail configuration is required. Override only if HR reads a
 * different inbox than the sending address. Server-side only: this address is
 * never rendered on the public page or included in the candidate's email.
 */
export const ADMIN_NOTIFICATION_EMAIL = (
  process.env.EMAIL_TO ||
  process.env.INTERVIEW_ADMIN_NOTIFICATION_EMAIL ||
  EMAIL_USER
).trim()

/** Retry backoff per attempt: 1m, 5m, 15m, 1h, 3h. */
const BACKOFF_MS = [60_000, 5 * 60_000, 15 * 60_000, 60 * 60_000, 3 * 60 * 60_000]

/** How long a claimed job is hidden from other workers while SMTP runs. */
const LEASE_MS = 2 * 60_000

export function isEmailConfigured(): boolean {
  return Boolean(EMAIL_USER && EMAIL_PASS)
}

let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      pool: true,
      maxConnections: 2,
      maxMessages: 50,
    })
  }
  return transporter
}

/* ----------------------------------------------------------- enqueueing */

const nowIso = () => new Date().toISOString()

function enqueue(
  db: InterviewDriveDb,
  job: { kind: EmailKind; bookingId: string | null; to: string; subject: string; scheduledAt: number },
): EmailJob {
  const record: EmailJob = {
    id: crypto.randomUUID(),
    kind: job.kind,
    bookingId: job.bookingId,
    to: job.to,
    subject: job.subject,
    status: "pending",
    attempts: 0,
    lastError: null,
    scheduledAt: job.scheduledAt,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    sentAt: null,
  }
  db.emailJobs.push(record)
  return record
}

/** Drops not-yet-sent jobs of the given kinds for a booking (used on reschedule/cancel). */
export function dropPendingJobs(db: InterviewDriveDb, bookingId: string, kinds: EmailKind[]): void {
  db.emailJobs = db.emailJobs.filter(
    (job) => !(job.bookingId === bookingId && kinds.includes(job.kind) && job.status !== "sent"),
  )
}

/**
 * Queues the emails that go out the moment a booking is submitted:
 * an "under review" acknowledgement to the candidate and a notification to HR.
 *
 * The interview confirmation is deliberately NOT sent here — it goes out only
 * once an admin has verified the candidate and moved them to Scheduled, via
 * `queueScheduledEmails`.
 */
export function queueBookingEmails(
  db: InterviewDriveDb,
  booking: InterviewBooking,
  candidate: Candidate,
  now = Date.now(),
): void {
  const received = buildSubmissionReceivedEmail({ booking, candidate })
  enqueue(db, {
    kind: "submission_received",
    bookingId: booking.id,
    to: candidate.email,
    subject: received.subject,
    scheduledAt: now,
  })

  if (ADMIN_NOTIFICATION_EMAIL) {
    const notification = buildAdminNotificationEmail({ booking, candidate })
    enqueue(db, {
      kind: "admin_notification",
      bookingId: booking.id,
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: notification.subject,
      scheduledAt: now,
    })
  }

  // Reminders are scheduled when the booking is approved, not when submitted.
}

/**
 * Sent when an admin verifies a candidate and moves them to Scheduled: the
 * real interview confirmation, plus the reminders that follow from it.
 */
export function queueScheduledEmails(
  db: InterviewDriveDb,
  booking: InterviewBooking,
  candidate: Candidate,
  now = Date.now(),
): void {
  const confirmation = buildConfirmationEmail({ booking, candidate })
  enqueue(db, {
    kind: "confirmation",
    bookingId: booking.id,
    to: candidate.email,
    subject: confirmation.subject,
    scheduledAt: now,
  })
  queueReminders(db, booking, candidate, now)
}

/**
 * (Re)schedules both reminders from the booking's CURRENT interview time, so a
 * rescheduled candidate is always reminded about the new slot, never the old.
 */
export function queueReminders(
  db: InterviewDriveDb,
  booking: InterviewBooking,
  candidate: Candidate,
  now = Date.now(),
): void {
  dropPendingJobs(db, booking.id, ["reminder_24h", "reminder_1h"])
  if (!REMINDABLE_BOOKING_STATUSES.includes(booking.status)) return

  const interviewAt = istToEpoch(booking.interviewDate, booking.interviewStartTime)
  const windows: { kind: EmailKind; at: number }[] = [
    { kind: "reminder_24h", at: interviewAt - 24 * 60 * 60 * 1000 },
    { kind: "reminder_1h", at: interviewAt - 60 * 60 * 1000 },
  ]

  for (const window of windows) {
    // Skip a reminder whose moment has already passed — a candidate booking
    // 30 minutes before their slot should not get a "tomorrow" email.
    if (window.at <= now) continue
    const subject =
      window.kind === "reminder_24h"
        ? "⏰ Interview Reminder – Your Rayon Web Interview is Tomorrow"
        : "⏰ Your Rayon Web Interview Starts in 1 Hour"
    enqueue(db, { kind: window.kind, bookingId: booking.id, to: candidate.email, subject, scheduledAt: window.at })
  }
}

/** Admin-triggered "Resend Confirmation Email". */
export function queueConfirmationResend(
  db: InterviewDriveDb,
  booking: InterviewBooking,
  candidate: Candidate,
  now = Date.now(),
): void {
  const confirmation = buildConfirmationEmail({ booking, candidate })
  enqueue(db, {
    kind: "confirmation",
    bookingId: booking.id,
    to: candidate.email,
    subject: confirmation.subject,
    scheduledAt: now,
  })
}

/* -------------------------------------------------------------- worker */

type ClaimedJob = { job: EmailJob; booking: InterviewBooking | null; candidate: Candidate | null }

/**
 * Atomically claims due jobs. Claiming pushes `scheduledAt` forward by the
 * lease so a second worker cannot pick up the same job while SMTP is in
 * flight — the queue's at-most-once-per-lease guarantee.
 */
async function claimDueJobs(now: number, limit: number): Promise<ClaimedJob[]> {
  return mutate((db) => {
    const due = db.emailJobs
      .filter(
        (job) =>
          (job.status === "pending" || job.status === "retrying") &&
          job.scheduledAt <= now &&
          job.attempts < MAX_EMAIL_ATTEMPTS,
      )
      .sort((a, b) => a.scheduledAt - b.scheduledAt)
      .slice(0, limit)

    return due.map((job) => {
      job.attempts += 1
      job.status = "retrying"
      job.scheduledAt = now + LEASE_MS
      job.updatedAt = nowIso()

      const booking = job.bookingId ? db.bookings.find((b) => b.id === job.bookingId) ?? null : null
      const candidate = booking ? db.candidates.find((c) => c.id === booking.candidateId) ?? null : null
      // Snapshot: the send happens outside the lock, so hand over plain copies.
      return {
        job: { ...job },
        booking: booking ? { ...booking } : null,
        candidate: candidate ? { ...candidate } : null,
      }
    })
  })
}

function renderJob(claimed: ClaimedJob): { subject: string; html: string; text: string } | null {
  const { job, booking, candidate } = claimed
  if (!booking || !candidate) return null
  const context = { booking, candidate }

  switch (job.kind) {
    case "submission_received":
      return buildSubmissionReceivedEmail(context)
    case "confirmation":
      return buildConfirmationEmail(context)
    case "admin_notification":
      return buildAdminNotificationEmail(context)
    case "reminder_24h":
      return buildReminderEmail(context, "24h")
    case "reminder_1h":
      return buildReminderEmail(context, "1h")
    default:
      return null
  }
}

/**
 * Decides whether a reminder should still go out, or be dropped/rescheduled.
 * Cancelled, rejected and rescheduled-away bookings must never be reminded.
 */
function reminderDisposition(
  claimed: ClaimedJob,
  now: number,
): { action: "send" } | { action: "drop"; reason: string } | { action: "reschedule"; at: number } {
  const { job, booking } = claimed
  if (job.kind !== "reminder_24h" && job.kind !== "reminder_1h") return { action: "send" }
  if (!booking) return { action: "drop", reason: "Booking no longer exists" }
  if (!REMINDABLE_BOOKING_STATUSES.includes(booking.status)) {
    return { action: "drop", reason: `Booking is ${booking.status}` }
  }

  const interviewAt = istToEpoch(booking.interviewDate, booking.interviewStartTime)
  if (interviewAt <= now) return { action: "drop", reason: "Interview time has passed" }

  const offset = job.kind === "reminder_24h" ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000
  const dueAt = interviewAt - offset
  // The booking was moved later (admin reschedule) — push the reminder out too.
  if (dueAt > now + 60_000) return { action: "reschedule", at: dueAt }
  return { action: "send" }
}

async function recordResult(
  jobId: string,
  outcome:
    | { ok: true }
    | { ok: false; error: string }
    | { ok: "drop"; reason: string }
    | { ok: "reschedule"; at: number },
): Promise<void> {
  await mutate((db) => {
    const job = db.emailJobs.find((j) => j.id === jobId)
    if (!job) return

    if (outcome.ok === true) {
      job.status = "sent"
      job.sentAt = nowIso()
      job.lastError = null
    } else if (outcome.ok === "drop") {
      job.status = "failed"
      job.lastError = outcome.reason
      job.attempts = MAX_EMAIL_ATTEMPTS // terminal: never retry a dropped reminder
    } else if (outcome.ok === "reschedule") {
      job.status = "pending"
      job.scheduledAt = outcome.at
      job.attempts = Math.max(0, job.attempts - 1) // a reschedule is not a failed attempt
    } else {
      job.lastError = outcome.error.slice(0, 500)
      if (job.attempts >= MAX_EMAIL_ATTEMPTS) {
        job.status = "failed"
      } else {
        job.status = "retrying"
        job.scheduledAt = Date.now() + (BACKOFF_MS[job.attempts - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1])
      }
    }
    job.updatedAt = nowIso()
  })
}

export type ProcessResult = { claimed: number; sent: number; failed: number; dropped: number; rescheduled: number }

/**
 * Drains due jobs. Safe to call from `after()` on the booking request, from a
 * cron ping, or manually from the admin dashboard.
 */
export async function processEmailQueue(now = Date.now(), limit = 25): Promise<ProcessResult> {
  const result: ProcessResult = { claimed: 0, sent: 0, failed: 0, dropped: 0, rescheduled: 0 }
  if (!isEmailConfigured()) return result

  const claimedJobs = await claimDueJobs(now, limit)
  result.claimed = claimedJobs.length

  for (const claimed of claimedJobs) {
    const disposition = reminderDisposition(claimed, now)
    if (disposition.action === "drop") {
      await recordResult(claimed.job.id, { ok: "drop", reason: disposition.reason })
      result.dropped += 1
      continue
    }
    if (disposition.action === "reschedule") {
      await recordResult(claimed.job.id, { ok: "reschedule", at: disposition.at })
      result.rescheduled += 1
      continue
    }

    const rendered = renderJob(claimed)
    if (!rendered) {
      await recordResult(claimed.job.id, { ok: "drop", reason: "Booking data unavailable" })
      result.dropped += 1
      continue
    }

    try {
      await getTransporter().sendMail({
        from: `${EMAIL_FROM_NAME} <${EMAIL_USER}>`,
        to: claimed.job.to,
        subject: rendered.subject,
        text: rendered.text,
        html: rendered.html,
      })
      await recordResult(claimed.job.id, { ok: true })
      result.sent += 1
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown email error"
      console.error(`[interview-drive] email ${claimed.job.kind} to ${claimed.job.to} failed:`, message)
      await recordResult(claimed.job.id, { ok: false, error: message })
      result.failed += 1
    }
  }

  return result
}

/** Per-booking delivery summary for the admin dashboard. */
export async function getEmailStatusByBooking(): Promise<Map<string, EmailJob[]>> {
  const db = await readDb()
  const byBooking = new Map<string, EmailJob[]>()
  for (const job of db.emailJobs) {
    if (!job.bookingId) continue
    const list = byBooking.get(job.bookingId) ?? []
    list.push(job)
    byBooking.set(job.bookingId, list)
  }
  return byBooking
}
