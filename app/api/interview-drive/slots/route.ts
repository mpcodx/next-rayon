import { handleRouteError, jsonError, jsonOk } from "@/lib/interview-drive/api"
import { isValidDateString } from "@/lib/interview-drive/ist"
import { computeDriveState, listPublicSlots } from "@/lib/interview-drive/repo"
import { readDb } from "@/lib/interview-drive/store"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Available 15-minute slots for one IST date.
 *
 * Computed from the slot grid and the booking index only — no candidate
 * record is read, and the response exposes nothing but times and states.
 */
export async function GET(request: Request) {
  try {
    const date = new URL(request.url).searchParams.get("date")?.trim() ?? ""
    if (!date || !isValidDateString(date)) {
      return jsonError("invalid_date", "Please select a valid interview date.", 400)
    }

    const db = await readDb()
    const state = computeDriveState(db)
    if (!state.isOpen) {
      return jsonError("drive_closed", state.message ?? "This interview drive is closed.", 403)
    }
    if (date < state.startDate || date > state.endDate) {
      return jsonError("date_out_of_range", "Interviews are only available between 14 and 18 September 2026.", 400)
    }

    return jsonOk({ ok: true, date, slots: await listPublicSlots(date) })
  } catch (error) {
    return handleRouteError(error)
  }
}
