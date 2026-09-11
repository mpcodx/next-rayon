import { CSRF_HEADER, getAuthenticatedAdmin, verifyCsrf, type AuthenticatedAdmin } from "./auth"
import { getClientIp, jsonError } from "./api"

/**
 * The single authorization gate for every admin endpoint.
 *
 * Routes call this first and return `guard.response` when it is present. An
 * unauthenticated caller always receives 401 with no hint about whether the
 * resource exists — candidate data is never reachable without a valid session.
 */

export type Guard =
  | { ok: true; admin: AuthenticatedAdmin["admin"]; session: AuthenticatedAdmin["session"]; ip: string }
  | { ok: false; response: ReturnType<typeof jsonError> }

export async function requireAdmin(
  request: Request,
  options: { mutating?: boolean } = {},
): Promise<Guard> {
  const authenticated = await getAuthenticatedAdmin()
  if (!authenticated) {
    return { ok: false, response: jsonError("unauthenticated", "Authentication required.", 401) }
  }

  // State-changing requests must also present the session-bound CSRF token,
  // which a cross-site form post cannot read or forge.
  if (options.mutating && !verifyCsrf(authenticated.session, request.headers.get(CSRF_HEADER))) {
    return { ok: false, response: jsonError("csrf_failed", "Invalid or missing CSRF token.", 403) }
  }

  return {
    ok: true,
    admin: authenticated.admin,
    session: authenticated.session,
    ip: getClientIp(request),
  }
}
