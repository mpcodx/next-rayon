import { after } from "next/server"

import { handleRouteError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { rescheduleBooking } from "@/lib/interview-drive/admin-service"
import { isEmailConfigured, processEmailQueue } from "@/lib/interview-drive/email"
import { formatIstDate, formatIstTimeRange } from "@/lib/interview-drive/ist"
import { rescheduleSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Moves a candidate to a different slot. The target slot is re-checked inside
 * the transaction, and reminders are re-queued against the NEW time.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request, { mutating: true })
  if (!guard.ok) return guard.response

  try {
    const { id } = await params
    const parsed = rescheduleSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) return jsonValidationError(parsed.error)

    const booking = await rescheduleBooking(id, parsed.data.slotId, { admin: guard.admin, ip: guard.ip })

    if (isEmailConfigured()) {
      after(() => processEmailQueue().catch(() => undefined))
    }

    return jsonOk({
      ok: true,
      booking: {
        id: booking.id,
        dateLabel: formatIstDate(booking.interviewDate),
        timeLabel: formatIstTimeRange(booking.interviewStartTime, booking.interviewEndTime),
      },
    })
  } catch (error) {
    return handleRouteError(error)
  }
}
