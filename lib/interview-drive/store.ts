import crypto from "node:crypto"
import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

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
 * Durable JSON store for the interview drive.
 *
 * There is no database server. Correctness under concurrent bookings comes
 * from three layers, and all three are required:
 *
 *   1. An in-process async mutex, so overlapping requests inside this Node
 *      process are serialised into a queue rather than interleaving.
 *   2. An on-disk exclusive lock file (O_EXCL), so a second process — a dev
 *      worker, a stray container, the email cron — cannot write concurrently.
 *   3. A fresh read from disk *inside* the lock, so every mutation sees the
 *      latest committed state rather than a stale in-memory snapshot.
 *
 * Writes land via write-temp -> fsync -> rename, which is atomic on POSIX:
 * a crash mid-write leaves the previous good file intact, never a partial one.
 *
 * The uniqueness rules that a relational schema would express as constraints
 * (one booking per slot, one active booking per candidate email) are enforced
 * inside `mutate()` in `repo.ts`, where they are protected by this same lock.
 */

const DATA_DIR = process.env.INTERVIEW_DRIVE_DATA_DIR
  ? path.resolve(process.env.INTERVIEW_DRIVE_DATA_DIR)
  : path.join(process.cwd(), "data")

const DB_PATH = path.join(DATA_DIR, "interview-drive.json")
const LOCK_PATH = path.join(DATA_DIR, "interview-drive.lock")
export const RESUME_DIR = path.join(DATA_DIR, "resumes")

const DB_VERSION = 1
const LOCK_STALE_MS = 15_000
const LOCK_RETRY_MS = 25
const LOCK_TIMEOUT_MS = 10_000

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

function emptyDb(): InterviewDriveDb {
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

/* ------------------------------------------------------------- filesystem */

function ensureDirsSync() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.mkdirSync(RESUME_DIR, { recursive: true })
}

/**
 * Keeps the stored drive record in step with the configured campaign window.
 *
 * The config (env, with the 14-18 Sep defaults) is the single source of truth
 * for the dates. Without this, the dates persisted on first boot would shadow
 * any later change and the slot grid would silently disagree with the window
 * the API enforces.
 */
function applyConfigToDrive(db: InterviewDriveDb): boolean {
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
function reconcileSlots(db: InterviewDriveDb): boolean {
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

function parseDb(raw: string): InterviewDriveDb {
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

async function readDbFromDisk(): Promise<InterviewDriveDb> {
  try {
    const db = parseDb(await fsp.readFile(DB_PATH, "utf8"))
    applyConfigToDrive(db)
    return db
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === "ENOENT") return emptyDb()
    // A corrupt file must not silently wipe real bookings. Preserve it and fail
    // loudly instead: an operator can recover the .corrupt copy by hand.
    if (error instanceof SyntaxError) {
      const backup = `${DB_PATH}.corrupt-${Date.now()}`
      await fsp.rename(DB_PATH, backup).catch(() => {})
      throw new Error(`Interview drive data file was corrupt. Preserved at ${backup}`)
    }
    throw error
  }
}

/** write-temp -> fsync -> rename. Atomic: readers see old or new, never partial. */
async function writeDbToDisk(db: InterviewDriveDb): Promise<void> {
  const tmpPath = `${DB_PATH}.tmp-${process.pid}-${crypto.randomBytes(4).toString("hex")}`
  const payload = JSON.stringify(db, null, 2)
  const handle = await fsp.open(tmpPath, "w")
  try {
    await handle.writeFile(payload, "utf8")
    await handle.sync()
  } finally {
    await handle.close()
  }
  await fsp.rename(tmpPath, DB_PATH)
}

/* ------------------------------------------------------------------ locks */

/** Serialises mutations inside this process; the file lock covers the rest. */
let mutex: Promise<unknown> = Promise.resolve()

async function acquireFileLock(): Promise<() => Promise<void>> {
  const deadline = Date.now() + LOCK_TIMEOUT_MS
  const payload = JSON.stringify({ pid: process.pid, at: Date.now() })

  for (;;) {
    try {
      const handle = await fsp.open(LOCK_PATH, "wx")
      await handle.writeFile(payload, "utf8")
      await handle.close()
      return async () => {
        await fsp.unlink(LOCK_PATH).catch(() => {})
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error

      // Someone holds it. Take over only if the holder clearly died.
      try {
        const stat = await fsp.stat(LOCK_PATH)
        if (Date.now() - stat.mtimeMs > LOCK_STALE_MS) {
          await fsp.unlink(LOCK_PATH).catch(() => {})
          continue
        }
      } catch {
        continue // lock vanished between EEXIST and stat — retry immediately
      }

      if (Date.now() > deadline) {
        throw new Error("Timed out waiting for the interview drive data lock")
      }
      await new Promise((resolve) => setTimeout(resolve, LOCK_RETRY_MS))
    }
  }
}

/* -------------------------------------------------------------- public API */

let seeded = false

async function ensureSeeded(): Promise<void> {
  if (seeded) return
  ensureDirsSync()
  if (!fs.existsSync(DB_PATH)) {
    // First boot. Written under the lock so two cold requests cannot both seed.
    await mutate(() => undefined)
  }
  seeded = true
}

/**
 * Reads a snapshot. Cheap and lock-free — safe because writes are atomic
 * renames, so a reader always observes one complete committed version.
 * Never mutate the returned object; use `mutate()` for changes.
 */
export async function readDb(): Promise<InterviewDriveDb> {
  await ensureSeeded()
  return readDbFromDisk()
}

/**
 * Runs `fn` against the freshest state while holding both locks, then commits
 * atomically. This is the transaction boundary: every invariant check that
 * must not race (slot still free, email not already booked) belongs inside it.
 *
 * Throwing from `fn` aborts the write — the file is left untouched.
 */
export async function mutate<T>(fn: (db: InterviewDriveDb) => T | Promise<T>): Promise<T> {
  ensureDirsSync()

  const run = async (): Promise<T> => {
    const release = await acquireFileLock()
    try {
      const db = await readDbFromDisk()
      applyConfigToDrive(db)
      reconcileSlots(db)
      const result = await fn(db)
      await writeDbToDisk(db)
      return result
    } finally {
      await release()
    }
  }

  // Chain onto the mutex so concurrent callers queue instead of interleaving,
  // and a rejection never poisons the chain for the next caller.
  const queued = mutex.then(run, run)
  mutex = queued.catch(() => undefined)
  return queued
}

export function getDataPaths() {
  return { DATA_DIR, DB_PATH, RESUME_DIR }
}
