import { handleRouteError, jsonOk } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { getOverview } from "@/lib/interview-drive/admin-service"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (!guard.ok) return guard.response

  try {
    return jsonOk({ ok: true, overview: await getOverview() })
  } catch (error) {
    return handleRouteError(error)
  }
}
