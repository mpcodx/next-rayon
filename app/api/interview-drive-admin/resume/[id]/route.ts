import { NO_STORE_HEADERS, handleRouteError, jsonError } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { appendAdminLog } from "@/lib/interview-drive/repo"
import { readResume } from "@/lib/interview-drive/resume"
import { mutate, readDb } from "@/lib/interview-drive/store"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Streams a candidate resume to an authenticated admin.
 *
 * Resumes live outside /public and have no public URL — this route is the only
 * way to read one. Access is logged, and the file is served with an attachment
 * disposition plus a sandboxing CSP so a malicious upload cannot execute in
 * the admin's browser session.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (!guard.ok) return guard.response

  try {
    const { id } = await params

    // Only serve files that are actually referenced by a candidate record,
    // so the route can never be used to enumerate the storage directory.
    const db = await readDb()
    const candidate = db.candidates.find((c) => c.resume?.id === id)
    if (!candidate?.resume) return jsonError("not_found", "Resume not found.", 404)

    const file = await readResume(id)
    if (!file) return jsonError("not_found", "Resume not found.", 404)

    await mutate((fresh) => {
      appendAdminLog(fresh, {
        adminId: guard.admin.id,
        adminEmail: guard.admin.email,
        action: "resume.downloaded",
        targetType: "candidate",
        targetId: candidate.id,
        details: { resumeId: id },
        ip: guard.ip,
      })
    })

    const safeName = candidate.resume.originalName.replace(/["\\]/g, "")
    return new Response(new Uint8Array(file), {
      headers: {
        ...NO_STORE_HEADERS,
        "Content-Type": candidate.resume.mimeType || "application/octet-stream",
        "Content-Length": String(file.byteLength),
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch (error) {
    return handleRouteError(error)
  }
}
