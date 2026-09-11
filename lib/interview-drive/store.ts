import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

import { applyConfigToDrive, emptyDb, reconcileSlots } from "./store-shared"
import type { InterviewDriveDb } from "./types"

export { generateSlots } from "./store-shared"

/**
 * Storage backend: in-memory state with optional local file persistence.
 * No external database (Postgres, MySQL, MongoDB, etc.) is required.
 * Details are emailed directly upon submission.
 */
export const usingPostgres = (): boolean => false

const DATA_DIR = process.env.INTERVIEW_DRIVE_DATA_DIR
  ? path.resolve(process.env.INTERVIEW_DRIVE_DATA_DIR)
  : path.join(process.cwd(), "data")

const DB_PATH = path.join(DATA_DIR, "interview-drive.json")
export const RESUME_DIR = path.join(DATA_DIR, "resumes")

let memoryDb: InterviewDriveDb = emptyDb()
let loaded = false

function canWriteDisk(): boolean {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    return true
  } catch {
    return false
  }
}

async function loadDb(): Promise<InterviewDriveDb> {
  if (loaded) return memoryDb
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = await fsp.readFile(DB_PATH, "utf8")
      const parsed = JSON.parse(raw) as Partial<InterviewDriveDb>
      memoryDb = {
        ...emptyDb(),
        ...parsed,
        drive: { ...emptyDb().drive, ...(parsed.drive ?? {}) },
        slots: parsed.slots ?? emptyDb().slots,
        candidates: parsed.candidates ?? [],
        bookings: parsed.bookings ?? [],
        admins: parsed.admins ?? [],
        sessions: parsed.sessions ?? [],
        emailJobs: parsed.emailJobs ?? [],
        adminLogs: parsed.adminLogs ?? [],
        rateLimits: parsed.rateLimits ?? [],
      }
    }
  } catch {
    // If disk read fails or is empty, use default emptyDb
  }
  applyConfigToDrive(memoryDb)
  reconcileSlots(memoryDb)
  loaded = true
  return memoryDb
}

/**
 * Read-only snapshot of current campaign state.
 * Never throws database connection or configuration errors.
 */
export async function readDb(): Promise<InterviewDriveDb> {
  await loadDb()
  return memoryDb
}

/**
 * Mutates state in memory and persists to disk when local file storage is available.
 * Never fails on serverless or read-only filesystems.
 */
export async function mutate<T>(fn: (db: InterviewDriveDb) => T | Promise<T>): Promise<T> {
  await loadDb()
  applyConfigToDrive(memoryDb)
  reconcileSlots(memoryDb)
  const result = await fn(memoryDb)

  if (canWriteDisk()) {
    try {
      const payload = JSON.stringify(memoryDb, null, 2)
      await fsp.writeFile(DB_PATH, payload, "utf8")
    } catch {
      // Non-fatal: running in a serverless or read-only environment
    }
  }
  return result
}

/** Describes the active storage backend. */
export function describeStorage(): { driver: "memory" | "filesystem"; detail: string } {
  return { driver: "memory", detail: "in-memory (no database required)" }
}

export function getDataPaths() {
  return { DATA_DIR, DB_PATH, RESUME_DIR }
}
