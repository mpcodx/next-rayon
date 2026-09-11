import { getClientIp, jsonError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { SESSION_COOKIE, checkRateLimit, clearRateLimit, login, sessionCookieOptions } from "@/lib/interview-drive/auth"
import { adminLoginSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/** Login is rate limited per IP and per account to blunt credential stuffing. */
const IP_LIMIT = { max: 10, windowMs: 15 * 60 * 1000 }
const ACCOUNT_LIMIT = { max: 5, windowMs: 15 * 60 * 1000 }

export async function POST(request: Request) {
  const ip = getClientIp(request)

  const ipLimit = await checkRateLimit(`admin-login-ip:${ip}`, IP_LIMIT.max, IP_LIMIT.windowMs)
  if (!ipLimit.allowed) {
    return jsonError("rate_limited", "Too many login attempts. Please try again later.", 429, {
      retryAfterSeconds: Math.ceil(ipLimit.retryAfterMs / 1000),
    })
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const parsed = adminLoginSchema.safeParse(body)
  if (!parsed.success) return jsonValidationError(parsed.error)

  const accountKey = `admin-login-acct:${parsed.data.email}`
  const accountLimit = await checkRateLimit(accountKey, ACCOUNT_LIMIT.max, ACCOUNT_LIMIT.windowMs)
  if (!accountLimit.allowed) {
    return jsonError("rate_limited", "Too many login attempts for this account. Please try again later.", 429, {
      retryAfterSeconds: Math.ceil(accountLimit.retryAfterMs / 1000),
    })
  }

  const result = await login(parsed.data.email, parsed.data.password, {
    ip,
    userAgent: request.headers.get("user-agent"),
  })

  if (!result.ok) {
    // Deliberately generic: never reveal whether the account exists.
    return jsonError("invalid_credentials", "Invalid email or password.", 401)
  }

  await clearRateLimit(accountKey)

  const response = jsonOk({
    ok: true,
    admin: { name: result.admin.name, email: result.admin.email },
    csrfToken: result.csrfToken,
  })
  response.cookies.set(SESSION_COOKIE, result.token, sessionCookieOptions())
  return response
}
