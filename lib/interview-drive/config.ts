/**
 * Rayon Web Solutions — Fresher Tech Interview Drive 2026
 *
 * Single source of truth for the campaign. Every value the backend enforces
 * lives here so the API, the landing page and the admin dashboard can never
 * drift apart. All dates/times are IST (Asia/Kolkata) wall-clock values.
 */

export const IST_TIMEZONE = "Asia/Kolkata"

/** India has never observed DST, so a fixed offset is exact (and Intl-free). */
export const IST_OFFSET_MINUTES = 330

export const DRIVE_ID = "rw-fresher-drive-2026"
export const DRIVE_NAME = "Fresher Tech Interview Drive 2026"

/** Interview days. Inclusive. Backend rejects any slot outside this range. */
export const DRIVE_START_DATE = process.env.INTERVIEW_DRIVE_START_DATE || "2026-09-14"
export const DRIVE_END_DATE = process.env.INTERVIEW_DRIVE_END_DATE || "2026-09-18"

/** Slot grid: 10:00–18:00 IST, no break, 15 minutes each => 32 slots/day. */
export const SLOT_DAY_START = "10:00"
export const SLOT_DAY_END = "18:00"
export const SLOT_DURATION_MINUTES = 15

/**
 * Bookings open immediately and close at the end of the final interview day.
 * `null` start means "already open". The backend enforces both edges.
 */
export const BOOKING_OPENS_AT: string | null = process.env.INTERVIEW_DRIVE_OPENS_AT || null

export const TECHNOLOGY_TRACKS = [
  {
    id: "python-django",
    name: "Python / Django",
    description: "Build scalable web applications, APIs and backend systems.",
    icon: "server",
    accent: "emerald",
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    description: "Explore Artificial Intelligence, Machine Learning and modern AI technologies.",
    icon: "brain",
    accent: "violet",
  },
  {
    id: "frontend-vue",
    name: "Frontend / Vue.js",
    description: "Build modern, responsive and interactive web interfaces.",
    icon: "code",
    accent: "sky",
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "Build modern mobile applications and digital experiences.",
    icon: "smartphone",
    accent: "amber",
  },
  {
    id: "devops-cloud",
    name: "DevOps / Cloud",
    description: "Learn deployment, cloud infrastructure, automation and CI/CD.",
    icon: "cloud",
    accent: "rose",
  },
] as const

export type TechnologyTrackId = (typeof TECHNOLOGY_TRACKS)[number]["id"]
export const TECHNOLOGY_TRACK_IDS = TECHNOLOGY_TRACKS.map((t) => t.id) as TechnologyTrackId[]

export const INTERVIEW_LANGUAGES = [
  { id: "hindi", name: "Hindi" },
  { id: "english", name: "English" },
  { id: "punjabi", name: "Punjabi" },
] as const

export type InterviewLanguageId = (typeof INTERVIEW_LANGUAGES)[number]["id"]
export const INTERVIEW_LANGUAGE_IDS = INTERVIEW_LANGUAGES.map((l) => l.id) as InterviewLanguageId[]

export const EDUCATION_LEVELS = [
  { id: "college-student", name: "College Student" },
  { id: "final-year-student", name: "Final Year Student" },
  { id: "recent-graduate", name: "Recent Graduate" },
  { id: "fresher", name: "Fresher" },
] as const

export type EducationLevelId = (typeof EDUCATION_LEVELS)[number]["id"]
export const EDUCATION_LEVEL_IDS = EDUCATION_LEVELS.map((e) => e.id) as EducationLevelId[]

export const BOOKING_STATUSES = [
  "pending",
  "scheduled",
  "completed",
  "selected",
  "rejected",
  "no_show",
  "cancelled",
] as const

export type BookingStatus = (typeof BOOKING_STATUSES)[number]

/**
 * Statuses that still occupy a slot. A cancelled booking frees its slot.
 *
 * `pending` holds the slot too: a candidate awaiting review must not lose
 * their time to someone else while an admin is verifying their details.
 */
export const ACTIVE_BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "scheduled",
  "completed",
  "selected",
  "rejected",
  "no_show",
]

/**
 * Statuses that should still receive reminder emails.
 *
 * Only a confirmed (admin-approved) interview is reminded — a candidate still
 * under review has not been told a time is final, so must not be reminded.
 */
export const REMINDABLE_BOOKING_STATUSES: BookingStatus[] = ["scheduled"]

/** The status every new booking starts in, awaiting admin verification. */
export const INITIAL_BOOKING_STATUS: BookingStatus = "pending"

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending Review",
  scheduled: "Scheduled",
  completed: "Completed",
  selected: "Selected",
  rejected: "Rejected",
  no_show: "No Show",
  cancelled: "Cancelled",
}

export const SLOT_STATUSES = ["available", "blocked"] as const
export type SlotStatus = (typeof SLOT_STATUSES)[number]

export const EMAIL_STATUSES = ["pending", "sent", "failed", "retrying"] as const
export type EmailStatus = (typeof EMAIL_STATUSES)[number]

export const EMAIL_KINDS = [
  /** Sent on submission: "we have your details, they are under review". */
  "submission_received",
  /** Sent when an admin approves: "your interview is scheduled". */
  "confirmation",
  "admin_notification",
  "reminder_24h",
  "reminder_1h",
] as const
export type EmailKind = (typeof EMAIL_KINDS)[number]

export const MAX_EMAIL_ATTEMPTS = 5

/** Resume upload limits — enforced on both the client and the server. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024
export const RESUME_ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
export const RESUME_ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"]

export const GRADUATION_YEAR_MIN = 2018
export const GRADUATION_YEAR_MAX = 2032

export function getTrack(id: string) {
  return TECHNOLOGY_TRACKS.find((t) => t.id === id)
}

export function getTrackName(id: string) {
  return getTrack(id)?.name ?? id
}

export function getLanguageName(id: string) {
  return INTERVIEW_LANGUAGES.find((l) => l.id === id)?.name ?? id
}

export function getEducationLevelName(id: string) {
  return EDUCATION_LEVELS.find((e) => e.id === id)?.name ?? id
}
