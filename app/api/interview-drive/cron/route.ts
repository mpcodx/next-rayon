import crypto from "node:crypto"

import { handleRouteError, jsonError, jsonOk } from "@/lib/interview-drive/api"
import { getAuthenticatedAdmin } from "@/lib/interview-drive/auth"
import { isEmailConfigured, processEmailQueue } from "@/lib/interview-drive/email"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Manual email worker tick: sends due confirmations, retries failures with
 * backoff, and dispatches 24-hour / 1-hour reminders.
 *
 * This endpoint is OPTIONAL. The server runs the same worker on a timer of its
 * own (see `lib/interview-drive/scheduler.ts`), so reminders send without any
 * external scheduler. Use this only to force a drain immediately — a logged-in
 * admin can call it, and setting INTERVIEW_CRON_SECRET additionally allows an
 * external cron to.
 */
/**
 * Vercel injects `Authorization: Bearer $CRON_SECRET` into scheduled
 * invocations when that variable is set, so the standard Vercel name is
 * accepted alongside our own.
 */
function hasValidSecret(request: Request): boolean {
  const secret = (process.env.CRON_SECRET || process.env.INTERVIEW_CRON_SECRET || "").trim()
  if (!secret) return false

  const header = request.headers.get("authorization") || ""
  const provided = header.startsWith("Bearer ") ? header.slice(7) : new URL(request.url).searchParams.get("key") || ""
  if (!provided) return false

  const a = Buffer.from(secret)
  const b = Buffer.from(provided)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

/**
 * Fallback when no secret is configured: trust Vercel's own cron header.
 *
 * That header is spoofable, which is acceptable here and nowhere else — this
 * endpoint only flushes emails that were already queued by legitimate
 * bookings, and its response is a count. It exposes no candidate data and
 * creates no bookings. Setting CRON_SECRET closes even this.
 */
function isVercelCron(request: Request): boolean {
  const secretConfigured = Boolean(process.env.CRON_SECRET || process.env.INTERVIEW_CRON_SECRET)
  return !secretConfigured && Boolean(process.env.VERCEL) && request.headers.get("x-vercel-cron") === "1"
}

async function handle(request: Request) {
  try {
    // Either a scheduler holding the shared secret, or an authenticated admin.
    if (!hasValidSecret(request) && !isVercelCron(request) && !(await getAuthenticatedAdmin())) {
      return jsonError("unauthenticated", "Authentication required.", 401)
    }

    if (!isEmailConfigured()) {
      return jsonError("email_not_configured", "Email service is not configured on this server.", 503)
    }

    return jsonOk({ ok: true, result: await processEmailQueue() })
  } catch (error) {
    return handleRouteError(error)
  }
}

export const GET = handle
export const POST = handle
