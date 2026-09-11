import { NextResponse } from "next/server"
import type { ZodError } from "zod"

import { BookingError } from "./repo"
import { formatZodErrors } from "./validation"

/** Shared helpers for the interview drive API routes. */

/**
 * Booking data must never be cached by a CDN or the browser — availability
 * changes second to second, and admin responses carry candidate data.
 */
export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  // Belt and braces alongside the page-level robots meta tag.
  "X-Robots-Tag": "noindex, nofollow, noarchive",
}

export function jsonOk<T extends object>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...NO_STORE_HEADERS, ...(init?.headers ?? {}) },
  })
}

export function jsonError(
  code: string,
  message: string,
  status = 400,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json(
    { ok: false, code, message, ...(extra ?? {}) },
    { status, headers: NO_STORE_HEADERS },
  )
}

export function jsonValidationError(error: ZodError) {
  return NextResponse.json(
    {
      ok: false,
      code: "validation_error",
      message: "Please correct the highlighted fields.",
      fieldErrors: formatZodErrors(error),
    },
    { status: 422, headers: NO_STORE_HEADERS },
  )
}

/** Maps a thrown error onto a safe response. Never leaks internals. */
export function handleRouteError(error: unknown) {
  if (error instanceof BookingError) {
    return jsonError(error.code, error.message, error.status, error.details ? { details: error.details } : undefined)
  }
  console.error("[interview-drive] unhandled route error:", error)
  return jsonError("server_error", "Something went wrong. Please try again.", 500)
}

/** Best-effort client IP, used only for rate limiting and audit logs. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}
