import {
  DRIVE_END_DATE,
  DRIVE_ID,
  DRIVE_NAME,
  DRIVE_START_DATE,
  IST_TIMEZONE,
  SLOT_DAY_END,
  SLOT_DAY_START,
  SLOT_DURATION_MINUTES,
} from "./config"
import { eachDateInRange, minutesToTime, timeToMinutes } from "./ist"
import type { InterviewDriveDb, InterviewSlot } from "./types"

/**
 * Storage-agnostic document model for the interview drive.
 *
 * The whole campaign is a single small document: a fixed 160-slot grid plus at
 * most a few hundred bookings over five days. Both storage drivers (Postgres
 * and the local filesystem) load it, hand it to a mutation function, and write
 * it back atomically — so every business rule in `repo.ts` is written once and
 * behaves identically wherever it runs.
 */

export const DB_VERSION = 1

/* ------------------------------------------------------------------ seed */

/** Builds the full 15-minute slot grid for the drive. Deterministic. */
export function generateSlots(): InterviewSlot[] {
  const start = timeToMinutes(SLOT_DAY_START)
  const end = timeToMinutes(SLOT_DAY_END)
  if (start === null || end === null) throw new Error("Invalid slot day bounds")

  const slots: InterviewSlot[] = []
  for (const date of eachDateInRange(DRIVE_START_DATE, DRIVE_END_DATE)) {
    // Stop at `end - duration` so the final slot ends exactly on the boundary
    // and no slot ever runs past the interview day. Slots cannot overlap:
    // each starts where the previous ended.
    for (let cursor = start; cursor + SLOT_DURATION_MINUTES <= end; cursor += SLOT_DURATION_MINUTES) {
      const startTime = minutesToTime(cursor)
      const endTime = minutesToTime(cursor + SLOT_DURATION_MINUTES)
      slots.push({
        // `date + start_time` is the natural key — the unique constraint the
        // spec asks for, encoded directly in the id.
        id: `${date}_${startTime.replace(":", "")}`,
        driveId: DRIVE_ID,
        date,
        startTime,
        endTime,
        status: "available",
        blockedReason: null,
        blockedAt: null,
        blockedBy: null,
      })
    }
  }
  return slots
}

export function emptyDb(): InterviewDriveDb {
  return {
    version: DB_VERSION,
    drive: {
      id: DRIVE_ID,
      name: DRIVE_NAME,
      startDate: DRIVE_START_DATE,
      endDate: DRIVE_END_DATE,
      timezone: IST_TIMEZONE,
      status: "active",
      allowMultipleBookings: false,
    },
    slots: generateSlots(),
    candidates: [],
    bookings: [],
    admins: [],
    sessions: [],
    emailJobs: [],
    adminLogs: [],
    rateLimits: [],
  }
}

/**
 * Keeps the stored drive record in step with the configured campaign window.
 *
 * The config (env, with the 14-18 Sep defaults) is the single source of truth
 * for the dates. Without this, the dates persisted on first boot would shadow
 * any later change and the slot grid would silently disagree with the window
 * the API enforces.
 */
export function applyConfigToDrive(db: InterviewDriveDb): boolean {
  let changed = false
  if (db.drive.startDate !== DRIVE_START_DATE) {
    db.drive.startDate = DRIVE_START_DATE
    changed = true
  }
  if (db.drive.endDate !== DRIVE_END_DATE) {
    db.drive.endDate = DRIVE_END_DATE
    changed = true
  }
  return changed
}

/**
 * Re-seeds the slot grid when the configured drive dates change, without
 * touching slots that already carry state (a booking or an admin block).
 */
export function reconcileSlots(db: InterviewDriveDb): boolean {
  const expected = generateSlots()
  const expectedIds = new Set(expected.map((s) => s.id))
  const existingById = new Map(db.slots.map((s) => [s.id, s]))

  const bookedSlotIds = new Set(db.bookings.map((b) => b.slotId))
  const keep = db.slots.filter(
    (s) => expectedIds.has(s.id) || bookedSlotIds.has(s.id) || s.status === "blocked",
  )
  const added = expected.filter((s) => !existingById.has(s.id))

  if (added.length === 0 && keep.length === db.slots.length) return false

  db.slots = [...keep, ...added].sort((a, b) =>
    a.date === b.date ? a.startTime.localeCompare(b.startTime) : a.date.localeCompare(b.date),
  )
  return true
}

export function parseDb(raw: string): InterviewDriveDb {
  const parsed = JSON.parse(raw) as Partial<InterviewDriveDb>
  const base = emptyDb()
  // Merge defensively so a file written by an older build still loads.
  return {
    ...base,
    ...parsed,
    drive: { ...base.drive, ...(parsed.drive ?? {}) },
    slots: parsed.slots ?? base.slots,
    candidates: parsed.candidates ?? [],
    bookings: parsed.bookings ?? [],
    admins: parsed.admins ?? [],
    sessions: parsed.sessions ?? [],
    emailJobs: parsed.emailJobs ?? [],
    adminLogs: parsed.adminLogs ?? [],
    rateLimits: parsed.rateLimits ?? [],
    version: DB_VERSION,
  }
}

