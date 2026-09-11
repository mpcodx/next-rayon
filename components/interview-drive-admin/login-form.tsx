"use client"

import { AlertCircle, Check, Eye, EyeOff, KeyRound, Loader2, Lock, RotateCcw, ShieldCheck } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"

const DEFAULT_EMAIL = "admin@rayonweb.com"
const DEFAULT_PASSWORD = "admin@123"

const STORAGE_KEY_EMAIL = "rw_admin_saved_email"
const STORAGE_KEY_PASSWORD = "rw_admin_saved_password"
const STORAGE_KEY_AUTOSAVE = "rw_admin_auto_save"

interface AdminLoginFormProps {
  onLoginSuccess?: (admin: { name: string; email: string }) => void
}

/**
 * Admin login form.
 *
 * Supports browser password manager auto-fill & auto-save, optional local browser
 * credential auto-saving, password visibility toggle, and instant client-side
 * transition to the dashboard upon successful authentication.
 */
export default function AdminLoginForm({ onLoginSuccess }: AdminLoginFormProps) {
  const [email, setEmail] = useState(DEFAULT_EMAIL)
  const [password, setPassword] = useState(DEFAULT_PASSWORD)
  const [autoSave, setAutoSave] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [savedNotice, setSavedNotice] = useState(false)

  // Load saved credentials from localStorage if available
  useEffect(() => {
    try {
      const savedAutoSave = localStorage.getItem(STORAGE_KEY_AUTOSAVE)
      if (savedAutoSave !== "false") {
        const storedEmail = localStorage.getItem(STORAGE_KEY_EMAIL)
        const storedPassword = localStorage.getItem(STORAGE_KEY_PASSWORD)
        if (storedEmail) setEmail(storedEmail)
        if (storedPassword) setPassword(storedPassword)
        setAutoSave(true)
      } else {
        setAutoSave(false)
      }
    } catch {
      // localStorage may be disabled or restricted
    }
  }, [])

  const handleFillDefaults = () => {
    setEmail(DEFAULT_EMAIL)
    setPassword(DEFAULT_PASSWORD)
    setError(null)
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 2000)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    // Save or clear remembered credentials based on checkbox
    try {
      if (autoSave) {
        localStorage.setItem(STORAGE_KEY_AUTOSAVE, "true")
        localStorage.setItem(STORAGE_KEY_EMAIL, email)
        localStorage.setItem(STORAGE_KEY_PASSWORD, password)
      } else {
        localStorage.setItem(STORAGE_KEY_AUTOSAVE, "false")
        localStorage.removeItem(STORAGE_KEY_EMAIL)
        localStorage.removeItem(STORAGE_KEY_PASSWORD)
      }
    } catch {
      // Ignore localStorage write failures
    }

    try {
      const response = await fetch("/api/interview-drive-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json().catch(() => ({}))

      if (response.ok && data?.ok) {
        // Attempt browser credential storage if supported
        if (typeof window !== "undefined" && "PasswordCredential" in window && event.currentTarget) {
          try {
            const PasswordCred = (window as unknown as { PasswordCredential: new (form: HTMLFormElement) => unknown }).PasswordCredential
            if (PasswordCred && navigator.credentials?.store) {
              const cred = new PasswordCred(event.currentTarget)
              await navigator.credentials.store(cred as Credential)
            }
          } catch {
            // Non-fatal if browser password manager does not allow manual store call
          }
        }

        // Transition immediately to dashboard
        if (onLoginSuccess && data.admin) {
          onLoginSuccess({ name: data.admin.name, email: data.admin.email })
          return
        }

        // Fallback: full page reload to pick up session cookie
        window.location.reload()
        return
      }

      setError(data?.message ?? "Invalid email or password.")
      setSubmitting(false)
    } catch {
      setError("We could not reach the server. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8">
          <div className="relative flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
            >
              <Lock className="h-5 w-5 text-white" strokeWidth={1.9} />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Interview Drive Admin</h1>
              <p className="text-xs text-gray-400">Rayon Web Solutions — authorized access only</p>
            </div>
          </div>

          <form
            method="POST"
            action="/api/interview-drive-admin/login"
            onSubmit={handleSubmit}
            className="relative mt-8 space-y-5"
          >
            {error ? (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" strokeWidth={2} />
                <p className="text-sm font-medium text-rose-100">{error}</p>
              </div>
            ) : null}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-200">
                  Email address
                </label>
                <button
                  type="button"
                  onClick={handleFillDefaults}
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 focus:outline-none"
                  title="Fill default credentials (admin@rayonweb.com / admin@123)"
                >
                  {savedNotice ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-300">Filled!</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-3 w-3" />
                      <span>Use default credentials</span>
                    </>
                  )}
                </button>
              </div>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="admin@rayonweb.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 block w-full rounded-xl border border-white/15 bg-slate-900/60 px-3.5 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-white/15 bg-slate-900/60 pl-3.5 pr-10 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Auto-save credentials toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900/80 text-cyan-500 focus:ring-cyan-400/20"
                />
                <span className="text-xs text-gray-300">Auto-save email & password in input</span>
              </label>
              <span className="text-[11px] text-gray-500 flex items-center gap-1">
                <KeyRound className="h-3 w-3" /> Auto-fill
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:opacity-60 cursor-pointer"
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
          Rayon Web Solutions — authorized administrator access.
        </p>
      </div>
    </div>
  )
}
