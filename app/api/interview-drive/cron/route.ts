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
function hasValidSecret(request: Request): boolean {
  const secret = (process.env.INTERVIEW_CRON_SECRET || "").trim()
  if (!secret) return false

  const header = request.headers.get("authorization") || ""
  const provided = header.startsWith("Bearer ") ? header.slice(7) : new URL(request.url).searchParams.get("key") || ""
  if (!provided) return false

  const a = Buffer.from(secret)
  const b = Buffer.from(provided)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

async function handle(request: Request) {
  try {
    // Either a scheduler holding the shared secret, or an authenticated admin.
    if (!hasValidSecret(request) && !(await getAuthenticatedAdmin())) {
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
