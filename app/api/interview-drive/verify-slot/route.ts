import { handleRouteError, jsonError, jsonOk } from "@/lib/interview-drive/api"
import { computeDriveState, listPublicSlots } from "@/lib/interview-drive/repo"
import { readDb } from "@/lib/interview-drive/store"
import { dateSchema, slotIdSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Re-checks a slot immediately before the candidate submits, so the form can
 * warn about a slot that was taken while they were filling it in. This is a
 * UX affordance only — `POST /bookings` re-validates everything regardless.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const date = dateSchema.safeParse(body?.date)
    const slotId = slotIdSchema.safeParse(body?.slotId)
    if (!date.success || !slotId.success) {
      return jsonError("invalid_selection", "Please select a valid date and time slot.", 400)
    }

    const db = await readDb()
    const state = computeDriveState(db)
    if (!state.isOpen) {
      return jsonError("drive_closed", state.message ?? "This interview drive is closed.", 403)
    }

    const slots = await listPublicSlots(date.data)
    const slot = slots.find((s) => s.id === slotId.data)

    if (!slot) {
      return jsonOk({ ok: true, available: false, reason: "slot_not_found", slots })
    }
    if (slot.state !== "available") {
      return jsonOk({ ok: true, available: false, reason: `slot_${slot.state}`, slots })
    }
    return jsonOk({ ok: true, available: true, slot })
  } catch (error) {
    return handleRouteError(error)
  }
}
