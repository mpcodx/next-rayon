import { handleRouteError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { listAdminSlots, listReschedulableSlots, setSlotBlocked } from "@/lib/interview-drive/admin-service"
import { blockSlotSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/** Slot board. `?free=1` returns only slots a candidate can be moved into. */
export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (!guard.ok) return guard.response

  try {
    const params = new URL(request.url).searchParams
    const slots = params.get("free") === "1"
      ? await listReschedulableSlots()
      : await listAdminSlots(params.get("date") || undefined)

    return jsonOk({ ok: true, slots })
  } catch (error) {
    return handleRouteError(error)
  }
}

/** Blocks or unblocks a slot. A blocked slot reads as "Unavailable" publicly. */
export async function POST(request: Request) {
  const guard = await requireAdmin(request, { mutating: true })
  if (!guard.ok) return guard.response

  try {
    const parsed = blockSlotSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) return jsonValidationError(parsed.error)

    const slot = await setSlotBlocked(parsed.data.slotId, parsed.data.blocked, parsed.data.reason, {
      admin: guard.admin,
      ip: guard.ip,
    })

    return jsonOk({ ok: true, slot: { id: slot.id, status: slot.status } })
  } catch (error) {
    return handleRouteError(error)
  }
}
