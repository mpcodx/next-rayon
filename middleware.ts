import { NextResponse, type NextRequest } from "next/server"

/**
 * Keeps the interview drive campaign out of search results.
 *
 * The pages also carry `<meta name="robots">`, but a header additionally
 * covers non-HTML responses (API payloads, resume downloads) that a meta tag
 * cannot reach. This is purely an indexing control — it is NOT access control.
 * The admin dashboard's protection is the session check in its route handlers
 * and page, never this header or robots.txt.
 */
const NOINDEX_PREFIXES = ["/interview-drive", "/interview-drive-admin"]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  if (NOINDEX_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
  }

  return response
}

export const config = {
  matcher: ["/interview-drive/:path*", "/interview-drive", "/interview-drive-admin/:path*", "/interview-drive-admin"],
}
