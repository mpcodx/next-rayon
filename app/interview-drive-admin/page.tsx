import type { Metadata } from "next"

import AdminDashboard from "@/components/interview-drive-admin/dashboard"
import AdminLoginForm from "@/components/interview-drive-admin/login-form"
import { getAuthenticatedAdmin } from "@/lib/interview-drive/auth"

/**
 * Interview drive admin dashboard.
 *
 * Access control happens here on the server AND again on every API route this
 * page calls — an unauthenticated visitor is shown the login form and never
 * receives candidate data in the HTML payload. robots.txt and the noindex
 * directives below are search hygiene only; they are not what protects this
 * page.
 */
export const metadata: Metadata = {
  title: "Interview Drive Admin",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
  },
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function InterviewDriveAdminPage() {
  const authenticated = await getAuthenticatedAdmin()

  if (!authenticated) {
    return <AdminLoginForm />
  }

  return <AdminDashboard admin={{ name: authenticated.admin.name, email: authenticated.admin.email }} />
}
