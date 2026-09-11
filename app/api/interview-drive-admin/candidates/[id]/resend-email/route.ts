import { after } from "next/server"

import { handleRouteError, jsonError, jsonOk } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { resendConfirmationEmail } from "@/lib/interview-drive/admin-service"
import { isEmailConfigured, processEmailQueue } from "@/lib/interview-drive/email"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/** Admin action: "Resend Confirmation Email". */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request, { mutating: true })
  if (!guard.ok) return guard.response

  try {
    if (!isEmailConfigured()) {
      return jsonError("email_not_configured", "Email service is not configured on this server.", 503)
    }

    const { id } = await params
    const result = await resendConfirmationEmail(id, { admin: guard.admin, ip: guard.ip })

    after(() => processEmailQueue().catch(() => undefined))

    return jsonOk({ ok: true, queued: result.queued, to: result.to })
  } catch (error) {
    return handleRouteError(error)
  }
}
