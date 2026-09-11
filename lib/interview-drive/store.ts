import fs from "node:fs"
import fsp from "node:fs/promises"
import path from "node:path"

import { applyConfigToDrive, emptyDb, parseDb, reconcileSlots } from "./store-shared"
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
let lastLoadedMtime = -1
let mutationQueue: Promise<unknown> = Promise.resolve()

function canWriteDisk(): boolean {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    return true
  } catch {
    return false
  }
}

async function loadDb(): Promise<InterviewDriveDb> {
  try {
    if (fs.existsSync(DB_PATH)) {
      const stat = await fsp.stat(DB_PATH)
      if (stat.mtimeMs !== lastLoadedMtime) {
        const raw = await fsp.readFile(DB_PATH, "utf8")
        memoryDb = parseDb(raw)
        applyConfigToDrive(memoryDb)
        reconcileSlots(memoryDb)
        lastLoadedMtime = stat.mtimeMs
      }
    } else {
      if (lastLoadedMtime === -1) {
        applyConfigToDrive(memoryDb)
        reconcileSlots(memoryDb)
      }
    }
  } catch {
    // If disk read fails or is empty, use default emptyDb
  }
  return memoryDb
}

/**
 * Read-only snapshot of current campaign state.
 * Always reflects the latest data on disk across all workers/processes.
 */
export async function readDb(): Promise<InterviewDriveDb> {
  await loadDb()
  return memoryDb
}

/**
 * Mutates state in memory and persists to disk when local file storage is available.
 * Reloads latest disk state first, serializes mutations, and writes atomically.
 */
export async function mutate<T>(fn: (db: InterviewDriveDb) => T | Promise<T>): Promise<T> {
  const run = async () => {
    lastLoadedMtime = -1
    await loadDb()
    applyConfigToDrive(memoryDb)
    reconcileSlots(memoryDb)
    const result = await fn(memoryDb)

    if (canWriteDisk()) {
      try {
        const payload = JSON.stringify(memoryDb, null, 2)
        const tmpPath = `${DB_PATH}.tmp.${process.pid}.${Date.now()}`
        await fsp.writeFile(tmpPath, payload, "utf8")
        await fsp.rename(tmpPath, DB_PATH)
        try {
          const stat = await fsp.stat(DB_PATH)
          lastLoadedMtime = stat.mtimeMs
        } catch {
          // Non-fatal
        }
      } catch {
        // Non-fatal: running in a serverless or read-only environment
      }
    }
    return result
  }

  const next = mutationQueue.then(run, run)
  mutationQueue = next
  return next as Promise<T>
}

/** Describes the active storage backend. */
export function describeStorage(): { driver: "memory" | "filesystem"; detail: string } {
  return { driver: "memory", detail: "in-memory (no database required)" }
}

export function getDataPaths() {
  return { DATA_DIR, DB_PATH, RESUME_DIR }
}
