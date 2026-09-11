import { jsonOk } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/** Session probe used by the dashboard to bootstrap and to fetch the CSRF token. */
export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (!guard.ok) return guard.response

  return jsonOk({
    ok: true,
    admin: { name: guard.admin.name, email: guard.admin.email, role: guard.admin.role },
    csrfToken: guard.session.csrfToken,
  })
}
