import { handleRouteError, jsonOk } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { listCandidates, type CandidateFilters } from "@/lib/interview-drive/admin-service"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const SORT_FIELDS = ["interview_date", "interview_time", "registration_date", "name"] as const

/** Filtered, sorted, paginated candidate list. Admin-only by construction. */
export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (!guard.ok) return guard.response

  try {
    const params = new URL(request.url).searchParams
    const sortBy = params.get("sortBy")
    const filters: CandidateFilters = {
      date: params.get("date") || undefined,
      technology: params.get("technology") || undefined,
      status: params.get("status") || undefined,
      language: params.get("language") || undefined,
      college: params.get("college") || undefined,
      search: params.get("search") || undefined,
      sortBy: SORT_FIELDS.includes(sortBy as never) ? (sortBy as CandidateFilters["sortBy"]) : "interview_date",
      sortDir: params.get("sortDir") === "desc" ? "desc" : "asc",
      page: Number(params.get("page")) || 1,
      pageSize: Number(params.get("pageSize")) || 50,
    }

    return jsonOk({ ok: true, ...(await listCandidates(filters)) })
  } catch (error) {
    return handleRouteError(error)
  }
}
