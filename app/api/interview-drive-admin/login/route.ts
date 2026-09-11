import { getClientIp, jsonError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { SESSION_COOKIE, login, sessionCookieOptions } from "@/lib/interview-drive/auth"
import { adminLoginSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: Request) {
  const ip = getClientIp(request)

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const parsed = adminLoginSchema.safeParse(body)
  if (!parsed.success) return jsonValidationError(parsed.error)

  const result = await login(parsed.data.email, parsed.data.password, {
    ip,
    userAgent: request.headers.get("user-agent"),
  })

  if (!result.ok) {
    // Deliberately generic: never reveal whether the account exists.
    return jsonError("invalid_credentials", "Invalid email or password.", 401)
  }

  const response = jsonOk({
    ok: true,
    admin: { name: result.admin.name, email: result.admin.email },
    csrfToken: result.csrfToken,
  })
  response.cookies.set(SESSION_COOKIE, result.token, sessionCookieOptions(request))
  return response
}
