import type { LucideIcon } from "lucide-react"

import type { BookingStatus } from "@/lib/interview-drive/config"
import { cn } from "@/lib/utils"

/** Types and small presentational pieces shared across the admin screens. */

export type OverviewView = {
  totalApplications: number
  totalBookings: number
  totalSlots: number
  availableSlots: number
  bookedSlots: number
  blockedSlots: number
  todaysInterviews: number
  pendingReview: number
  completedInterviews: number
  selected: number
  rejected: number
  noShow: number
  cancelled: number
  emailsPending: number
  emailsFailed: number
  driveStatus: "open" | "not_started" | "closed"
  byDate: {
    date: string
    label: string
    shortLabel: string
    weekday: string
    totalSlots: number
    bookedSlots: number
    availableSlots: number
    blockedSlots: number
  }[]
  byTechnology: { id: string; name: string; count: number }[]
  byLanguage: { id: string; name: string; count: number }[]
}

export type CandidateRowView = {
  bookingId: string
  bookingReference: string
  name: string
  email: string
  phone: string
  college: string
  graduationYear: number
  educationLevel: string | null
  technology: string
  technologyId: string
  interviewDate: string
  interviewDateLabel: string
  interviewTime: string
  interviewTimeLabel: string
  language: string
  languageId: string
  resume: { id: string; originalName: string; size: number } | null
  status: BookingStatus
  statusLabel: string
  adminNotes: string | null
  createdAt: string
  emailStatus: {
    submission: string
    confirmation: string
    reminder24h: string
    reminder1h: string
    lastError: string | null
  }
}

export type AdminSlotView = {
  id: string
  date: string
  startTime: string
  endTime: string
  label: string
  status: "available" | "booked" | "blocked"
  blockedReason: string | null
  booking: { id: string; reference: string; candidateName: string; status: BookingStatus } | null
}

export const STATUS_STYLES: Record<string, string> = {
  pending: "border-amber-400/40 bg-amber-500/15 text-amber-200",
  scheduled: "border-cyan-400/40 bg-cyan-500/15 text-cyan-200",
  completed: "border-white/20 bg-white/10 text-gray-200",
  selected: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  rejected: "border-rose-400/40 bg-rose-500/15 text-rose-200",
  no_show: "border-amber-400/40 bg-amber-500/15 text-amber-200",
  cancelled: "border-white/10 bg-white/5 text-gray-400",
}

const TONES = {
  slate: "text-white",
  sky: "text-cyan-300",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
}

export function StatBlock({
  label,
  value,
  icon: Icon,
  tone = "slate",
}: {
  label: string
  value: number | undefined
  icon?: LucideIcon
  tone?: keyof typeof TONES
}) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="relative flex items-center gap-1.5">
        {Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5 text-gray-500" strokeWidth={2} /> : null}
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>
      </div>
      <p className={cn("relative mt-1.5 text-2xl font-bold tabular-nums", TONES[tone])}>
        {value === undefined ? <span className="text-gray-600">–</span> : value}
      </p>
    </div>
  )
}
