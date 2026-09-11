"use client"

import { useEffect, useState } from "react"
import AdminDashboard from "./dashboard"
import AdminLoginForm from "./login-form"

export type AdminUserSummary = {
  name: string
  email: string
}

interface AdminPortalProps {
  initialAdmin: AdminUserSummary | null
}

/**
 * Admin portal bridge.
 *
 * Seamlessly manages authenticated admin state on the client without requiring
 * full page reloads, while still accepting the server-rendered initial admin state.
 */
export default function AdminPortal({ initialAdmin }: AdminPortalProps) {
  const [admin, setAdmin] = useState<AdminUserSummary | null>(initialAdmin)

  // Probe session on mount if initialAdmin was null (e.g. client navigation or stale cache)
  useEffect(() => {
    if (!admin) {
      void (async () => {
        try {
          const res = await fetch("/api/interview-drive-admin/me", { cache: "no-store" })
          if (res.ok) {
            const data = await res.json()
            if (data?.ok && data?.admin) {
              setAdmin({ name: data.admin.name, email: data.admin.email })
            }
          }
        } catch {
          // Ignore network errors on passive probe
        }
      })()
    }
  }, [admin])

  if (!admin) {
    return (
      <AdminLoginForm
        onLoginSuccess={(loggedInAdmin) => {
          setAdmin(loggedInAdmin)
        }}
      />
    )
  }

  return (
    <AdminDashboard
      admin={admin}
      onLogout={() => {
        setAdmin(null)
      }}
    />
  )
}
