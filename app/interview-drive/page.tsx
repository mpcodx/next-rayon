import type { Metadata } from "next"

import BookingFlow from "@/components/interview-drive/booking-flow"
import DriveClosed from "@/components/interview-drive/drive-closed"
import InterviewDriveFaq from "@/components/interview-drive/faq"
import InterviewDriveHero from "@/components/interview-drive/hero"
import {
  DontPanicSection,
  DriveDatesSection,
  FinalCtaSection,
  InterviewDetailsSection,
  TechnologyTracksSection,
  WhoCanApplySection,
} from "@/components/interview-drive/sections"
import { DRIVE_END_DATE, DRIVE_START_DATE } from "@/lib/interview-drive/config"
import { formatIstDateRange } from "@/lib/interview-drive/ist"
import { computeDriveState, listPublicDates } from "@/lib/interview-drive/repo"
import { readDb } from "@/lib/interview-drive/store"

/**
 * Temporary hiring campaign page.
 *
 * Deliberately excluded from search: `noindex, nofollow, noarchive` here, an
 * `X-Robots-Tag` header from middleware, and a robots.txt disallow. It is also
 * absent from PAGE_SEO, which is what generates sitemap.xml — so it never
 * appears there — and it is not linked from the indexable navigation.
 */
export const metadata: Metadata = {
  title: "Fresher Tech Interview Drive 2026 | Rayon Web Solutions",
  description:
    "Book a 15-minute online interview slot with Rayon Web Solutions. For freshers and college students, 14-18 September 2026.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
  },
}

// Availability changes with every booking, so this page is never prerendered.
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function InterviewDrivePage() {
  const db = await readDb()
  const state = computeDriveState(db)
  const dateRangeLabel = formatIstDateRange(DRIVE_START_DATE, DRIVE_END_DATE)

  // The backend enforces the campaign window independently; this is the UI
  // half of the same rule.
  if (!state.isOpen) {
    return <DriveClosed phase={state.phase === "not_started" ? "not_started" : "closed"} message={state.message} />
  }

  const dates = await listPublicDates()
  const totalAvailable = dates.reduce((sum, date) => sum + date.availableSlots, 0)

  return (
    // Inherits the site's dark shell, navbar and footer — the campaign should
    // read as part of rayonweb.com, not a separately styled microsite.
    <div className="relative">
      <InterviewDriveHero dateRangeLabel={dateRangeLabel} availableSlots={totalAvailable} />
      <DriveDatesSection dateRangeLabel={dateRangeLabel} />
      <TechnologyTracksSection />
      <WhoCanApplySection />
      <DontPanicSection />
      <InterviewDetailsSection dateRangeLabel={dateRangeLabel} />
      <BookingFlow initialDates={dates} />
      <InterviewDriveFaq />
      <FinalCtaSection dateRangeLabel={dateRangeLabel} />
    </div>
  )
}
