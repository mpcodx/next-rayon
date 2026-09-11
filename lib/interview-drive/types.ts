import type {
  BookingStatus,
  EducationLevelId,
  EmailKind,
  EmailStatus,
  InterviewLanguageId,
  SlotStatus,
  TechnologyTrackId,
} from "./config"

export type InterviewDrive = {
  id: string
  name: string
  /** IST "YYYY-MM-DD" */
  startDate: string
  /** IST "YYYY-MM-DD" */
  endDate: string
  timezone: string
  status: "active" | "closed"
  /** When true, a candidate may hold more than one active booking. */
  allowMultipleBookings: boolean
}

export type InterviewSlot = {
  id: string
  driveId: string
  /** IST "YYYY-MM-DD" */
  date: string
  /** IST "HH:mm" */
  startTime: string
  /** IST "HH:mm" */
  endTime: string
  status: SlotStatus
  blockedReason?: string | null
  blockedAt?: string | null
  blockedBy?: string | null
}

export type Candidate = {
  id: string
  name: string
  /** Lower-cased. Unique per active booking unless the drive allows multiples. */
  email: string
  phone: string
  college: string
  graduationYear: number
  educationLevel: EducationLevelId | null
  resume: ResumeRef | null
  createdAt: string
  updatedAt: string
}

export type ResumeRef = {
  /** Opaque id; the stored filename on disk. Never derived from user input. */
  id: string
  originalName: string
  mimeType: string
  size: number
  uploadedAt: string
}

export type InterviewBooking = {
  id: string
  driveId: string
  candidateId: string
  slotId: string
  technology: TechnologyTrackId
  language: InterviewLanguageId
  status: BookingStatus
  bookingReference: string
  /** Denormalised IST values so history survives a reschedule audit. */
  interviewDate: string
  interviewStartTime: string
  interviewEndTime: string
  adminNotes?: string | null
  createdAt: string
  updatedAt: string
  cancelledAt?: string | null
  rescheduledFrom?: { slotId: string; date: string; startTime: string } | null
}

export type AdminUser = {
  id: string
  email: string
  name: string
  /** scrypt: "scrypt$N$r$p$salt$hash" — never a plaintext password. */
  passwordHash: string
  role: "admin"
  createdAt: string
  lastLoginAt?: string | null
}

export type AdminSession = {
  /** SHA-256 of the cookie token. The raw token is never persisted. */
  tokenHash: string
  adminId: string
  csrfToken: string
  createdAt: string
  expiresAt: string
  ip?: string | null
  userAgent?: string | null
}

export type EmailJob = {
  id: string
  kind: EmailKind
  bookingId: string | null
  to: string
  subject: string
  status: EmailStatus
  attempts: number
  lastError?: string | null
  /** Epoch ms; the worker ignores jobs scheduled in the future. */
  scheduledAt: number
  createdAt: string
  updatedAt: string
  sentAt?: string | null
}

export type AdminLog = {
  id: string
  adminId: string | null
  adminEmail: string | null
  action: string
  targetType?: string | null
  targetId?: string | null
  details?: Record<string, unknown> | null
  ip?: string | null
  createdAt: string
}

export type RateLimitHit = {
  key: string
  at: number
}

export type InterviewDriveDb = {
  version: number
  drive: InterviewDrive
  slots: InterviewSlot[]
  candidates: Candidate[]
  bookings: InterviewBooking[]
  admins: AdminUser[]
  sessions: AdminSession[]
  emailJobs: EmailJob[]
  adminLogs: AdminLog[]
  rateLimits: RateLimitHit[]
}

/** Shape returned by the PUBLIC slot API — deliberately carries no candidate data. */
export type PublicSlot = {
  id: string
  date: string
  startTime: string
  endTime: string
  label: string
  state: "available" | "booked" | "unavailable" | "past"
}

export type PublicDate = {
  date: string
  label: string
  shortLabel: string
  weekday: string
  totalSlots: number
  availableSlots: number
  isPast: boolean
}
