import crypto from "node:crypto"
import fsp from "node:fs/promises"
import path from "node:path"

import { RESUME_ALLOWED_EXTENSIONS, RESUME_ALLOWED_MIME, RESUME_MAX_BYTES } from "./config"
import { BookingError } from "./repo"
import { RESUME_DIR } from "./store"
import type { ResumeRef } from "./types"

export type ResumeRefWithBuffer = ResumeRef & {
  buffer?: Buffer
}

/** In-memory resume storage so resumes can be read without disk or database. */
const inMemoryResumes = new Map<string, { buffer: Buffer; mimeType: string; originalName: string }>()

/** Magic-byte signatures, so the check does not rely on a spoofable MIME header. */
function sniffFileType(buffer: Buffer): "pdf" | "doc" | "docx" | null {
  if (buffer.length < 8) return null
  // "%PDF-"
  if (buffer.subarray(0, 5).toString("latin1") === "%PDF-") return "pdf"
  // ZIP container (docx)
  if (buffer[0] === 0x50 && buffer[1] === 0x4b && (buffer[2] === 0x03 || buffer[2] === 0x05 || buffer[2] === 0x07)) {
    return "docx"
  }
  // OLE2 compound file (legacy .doc)
  if (buffer.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))) return "doc"
  return null
}

export function sanitizeOriginalName(name: string): string {
  const base = path
    .basename(name)
    .replace(/[^A-Za-z0-9._ -]+/g, "_")
    .trim()
  return (base || "resume").slice(0, 120)
}

/**
 * Validates and stores an uploaded resume. Returns null when no file was provided.
 * Preserves the file buffer so it can be emailed directly as an attachment.
 */
export async function storeResume(file: File | null): Promise<ResumeRefWithBuffer | null> {
  if (!file || typeof file === "string") return null
  if (file.size === 0) return null

  if (file.size > RESUME_MAX_BYTES) {
    throw new BookingError("resume_too_large", "Resume must be 5 MB or smaller.", 400)
  }

  const originalName = sanitizeOriginalName(file.name || "resume")
  const extension = path.extname(originalName).toLowerCase()
  if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
    throw new BookingError("resume_bad_type", "Resume must be a PDF, DOC or DOCX file.", 400)
  }
  if (file.type && !RESUME_ALLOWED_MIME.includes(file.type)) {
    throw new BookingError("resume_bad_type", "Resume must be a PDF, DOC or DOCX file.", 400)
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  if (buffer.byteLength > RESUME_MAX_BYTES) {
    throw new BookingError("resume_too_large", "Resume must be 5 MB or smaller.", 400)
  }

  const sniffed = sniffFileType(buffer)
  if (!sniffed) {
    throw new BookingError("resume_bad_type", "That file does not look like a valid PDF or Word document.", 400)
  }
  const extensionMatchesContent =
    (sniffed === "pdf" && extension === ".pdf") ||
    (sniffed !== "pdf" && (extension === ".doc" || extension === ".docx"))
  if (!extensionMatchesContent) {
    throw new BookingError("resume_bad_type", "The file content does not match its extension.", 400)
  }

  const id = `${crypto.randomUUID()}${extension}`
  const mimeType = file.type || (sniffed === "pdf" ? "application/pdf" : "application/msword")

  // Cache in memory
  inMemoryResumes.set(id, { buffer, mimeType, originalName })

  // Try saving to disk if writable (non-fatal on read-only environments)
  try {
    await fsp.mkdir(RESUME_DIR, { recursive: true })
    await fsp.writeFile(path.join(RESUME_DIR, id), buffer, { mode: 0o600 })
  } catch {
    // Read-only filesystem / serverless; memory and email attachment are sufficient
  }

  return {
    id,
    originalName,
    mimeType,
    size: buffer.byteLength,
    uploadedAt: new Date().toISOString(),
    buffer,
  }
}

const STORED_NAME_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(pdf|doc|docx)$/i

/** Resolves a resume buffer. Checks in-memory cache first, then disk. */
export async function readResume(id: string): Promise<Buffer | null> {
  if (!STORED_NAME_RE.test(id)) return null

  const inMem = inMemoryResumes.get(id)
  if (inMem) return inMem.buffer

  const target = path.resolve(RESUME_DIR, id)
  if (path.dirname(target) !== path.resolve(RESUME_DIR)) return null
  try {
    return await fsp.readFile(target)
  } catch {
    return null
  }
}

export async function deleteResume(id: string): Promise<void> {
  if (!STORED_NAME_RE.test(id)) return
  inMemoryResumes.delete(id)
  try {
    await fsp.unlink(path.join(RESUME_DIR, id))
  } catch {
    // Ignore error
  }
}
