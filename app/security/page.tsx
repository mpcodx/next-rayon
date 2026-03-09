import type { Metadata } from "next"
import SecurityHero from "@/components/security/security-hero"
import SecurityFeatures from "@/components/security/security-features"
import SecurityCertifications from "@/components/security/security-certifications"
import SecurityProcess from "@/components/security/security-process"
import SecurityFAQ from "@/components/security/security-faq"
import SecurityCTA from "@/components/security/security-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/security")

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <SecurityHero />
      <SecurityFeatures />
      <SecurityCertifications />
      <SecurityProcess />
      <SecurityFAQ />
      <SecurityCTA />
    </main>
  )
}
