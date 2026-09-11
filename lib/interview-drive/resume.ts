import crypto from "node:crypto"
import fsp from "node:fs/promises"
import path from "node:path"

import { RESUME_ALLOWED_EXTENSIONS, RESUME_ALLOWED_MIME, RESUME_MAX_BYTES } from "./config"
import { BookingError } from "./repo"
import { RESUME_DIR } from "./store"
import type { ResumeRef } from "./types"

/**
 * Resume storage.
 *
 * Files are written OUTSIDE /public so they are never served statically —
 * the only way to read one is the authenticated admin route. The stored
 * filename is a random id plus a whitelisted extension, never anything
 * derived from the upload, so a crafted filename cannot escape the directory.
 */

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
 * Validates and stores an uploaded resume. Returns null when no file was
 * provided — the resume is optional, so an empty upload is not an error.
 */
export async function storeResume(file: File | null): Promise<ResumeRef | null> {
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
  // Re-check the real size: `file.size` is client-reported metadata.
  if (buffer.byteLength > RESUME_MAX_BYTES) {
    throw new BookingError("resume_too_large", "Resume must be 5 MB or smaller.", 400)
  }

  const sniffed = sniffFileType(buffer)
  if (!sniffed) {
    throw new BookingError("resume_bad_type", "That file does not look like a valid PDF or Word document.", 400)
  }
  // .doc and .docx both legitimately appear with either Office extension.
  const extensionMatchesContent =
    (sniffed === "pdf" && extension === ".pdf") ||
    (sniffed !== "pdf" && (extension === ".doc" || extension === ".docx"))
  if (!extensionMatchesContent) {
    throw new BookingError("resume_bad_type", "The file content does not match its extension.", 400)
  }

  const id = `${crypto.randomUUID()}${extension}`
  await fsp.mkdir(RESUME_DIR, { recursive: true })
  await fsp.writeFile(path.join(RESUME_DIR, id), buffer, { mode: 0o600 })

  return {
    id,
    originalName,
    mimeType: file.type || (sniffed === "pdf" ? "application/pdf" : "application/msword"),
    size: buffer.byteLength,
    uploadedAt: new Date().toISOString(),
  }
}

/** Only ever accept the exact filename shape this module generates. */
const STORED_NAME_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(pdf|doc|docx)$/i

/** Resolves a stored resume for the admin download route. Path-traversal safe. */
export async function readResume(id: string): Promise<Buffer | null> {
  if (!STORED_NAME_RE.test(id)) return null
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
  await fsp.unlink(path.join(RESUME_DIR, id)).catch(() => {})
}
