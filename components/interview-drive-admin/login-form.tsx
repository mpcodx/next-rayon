"use client"

import { AlertCircle, Loader2, Lock, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

/**
 * Admin login.
 *
 * The form only ever exchanges credentials for an HttpOnly session cookie —
 * no token is stored in JavaScript-readable storage. Error messages are
 * intentionally generic so they cannot be used to discover valid accounts.
 */
export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/interview-drive-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (response.ok && data?.ok) {
        router.refresh()
        return
      }
      setError(data?.message ?? "Invalid email or password.")
    } catch {
      setError("We could not reach the server. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8">
          <div className="relative flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
              <Lock className="h-5 w-5 text-white" strokeWidth={1.9} />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Interview Drive Admin</h1>
              <p className="text-xs text-gray-400">Rayon Web Solutions — authorized access only</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative mt-8 space-y-5" noValidate>
            {error ? (
              <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" strokeWidth={2} />
                <p className="text-sm font-medium text-rose-100">{error}</p>
              </div>
            ) : null}

            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-white/15 bg-slate-900/60 px-3.5 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-white/15 bg-slate-900/60 px-3.5 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.9} />
          Login attempts are rate limited and logged.
        </p>
      </div>
    </div>
  )
}
