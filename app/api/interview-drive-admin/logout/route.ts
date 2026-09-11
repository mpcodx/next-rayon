import { jsonOk } from "@/lib/interview-drive/api"
import { SESSION_COOKIE, logout } from "@/lib/interview-drive/auth"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST() {
  await logout()
  const response = jsonOk({ ok: true })
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 })
  return response
}
