/**
 * IST (Asia/Kolkata) time helpers.
 *
 * Every interview date/time is stored and compared as an IST *wall-clock*
 * value — a "YYYY-MM-DD" date plus an "HH:mm" 24h time. Nothing in the
 * booking path ever reads the server's local timezone or trusts a timestamp
 * produced by the browser, so a candidate in London and a candidate in Delhi
 * both see (and book) the exact same IST slot.
 */

import { IST_OFFSET_MINUTES, SLOT_DURATION_MINUTES } from "./config"

const MS_PER_MINUTE = 60_000
const IST_OFFSET_MS = IST_OFFSET_MINUTES * MS_PER_MINUTE

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
export const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/

/** "HH:mm" -> minutes since midnight. Returns null when malformed. */
export function timeToMinutes(time: string): number | null {
  const match = TIME_RE.exec(time)
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

/** minutes since midnight -> "HH:mm" (24h, zero padded). */
export function minutesToTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(normalized / 60)
  const m = normalized % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

/** Adds minutes to an "HH:mm" value. */
export function addMinutes(time: string, minutes: number): string {
  const base = timeToMinutes(time)
  if (base === null) throw new Error(`Invalid time: ${time}`)
  return minutesToTime(base + minutes)
}

/** The IST end time of a standard 15-minute slot. */
export function slotEndTime(startTime: string): string {
  return addMinutes(startTime, SLOT_DURATION_MINUTES)
}

/** Validates a "YYYY-MM-DD" string, including real calendar days. */
export function isValidDateString(date: string): boolean {
  if (!DATE_RE.test(date)) return false
  const [y, m, d] = date.split("-").map(Number)
  if (m < 1 || m > 12 || d < 1 || d > 31) return false
  const probe = new Date(Date.UTC(y, m - 1, d))
  return probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d
}

/**
 * Converts an IST wall-clock date/time into an absolute epoch (ms).
 * This is the only place the IST offset is applied.
 */
export function istToEpoch(date: string, time = "00:00"): number {
  const [y, m, d] = date.split("-").map(Number)
  const minutes = timeToMinutes(time)
  if (minutes === null) throw new Error(`Invalid time: ${time}`)
  return Date.UTC(y, m - 1, d, 0, minutes) - IST_OFFSET_MS
}

/** The current instant expressed as IST wall-clock parts. */
export function nowInIst(now: number = Date.now()) {
  const shifted = new Date(now + IST_OFFSET_MS)
  const date = `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}-${String(
    shifted.getUTCDate(),
  ).padStart(2, "0")}`
  const time = `${String(shifted.getUTCHours()).padStart(2, "0")}:${String(shifted.getUTCMinutes()).padStart(2, "0")}`
  return { date, time, epoch: now }
}

/** Today's date in IST as "YYYY-MM-DD". */
export function istToday(now: number = Date.now()): string {
  return nowInIst(now).date
}

/** Inclusive list of "YYYY-MM-DD" dates between two IST dates. */
export function eachDateInRange(startDate: string, endDate: string): string[] {
  const dates: string[] = []
  const end = istToEpoch(endDate)
  for (let cursor = istToEpoch(startDate); cursor <= end; cursor += 24 * 60 * MS_PER_MINUTE) {
    dates.push(nowInIst(cursor).date)
  }
  return dates
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

type DateParts = { year: number; monthIndex: number; day: number; weekdayIndex: number }

function dateParts(date: string): DateParts {
  const [y, m, d] = date.split("-").map(Number)
  const probe = new Date(Date.UTC(y, m - 1, d))
  return { year: y, monthIndex: m - 1, day: d, weekdayIndex: probe.getUTCDay() }
}

/** "2026-09-15" -> "15 September 2026" */
export function formatIstDate(date: string): string {
  const { year, monthIndex, day } = dateParts(date)
  return `${day} ${MONTH_NAMES[monthIndex]} ${year}`
}

/** "2026-09-15" -> "15 Sep" */
export function formatIstDateShort(date: string): string {
  const { monthIndex, day } = dateParts(date)
  return `${day} ${MONTH_NAMES[monthIndex].slice(0, 3)}`
}

/** "2026-09-15" -> "Tuesday" */
export function formatIstWeekday(date: string): string {
  return WEEKDAY_NAMES[dateParts(date).weekdayIndex]
}

/** "2026-09-15" -> "Tue" */
export function formatIstWeekdayShort(date: string): string {
  return formatIstWeekday(date).slice(0, 3)
}

/** "14:30" -> "2:30 PM" */
export function formatIstTime(time: string): string {
  const minutes = timeToMinutes(time)
  if (minutes === null) return time
  const h24 = Math.floor(minutes / 60)
  const m = minutes % 60
  const period = h24 >= 12 ? "PM" : "AM"
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${String(m).padStart(2, "0")} ${period}`
}

/** "10:00" -> "10:00 AM – 10:15 AM" */
export function formatIstTimeRange(startTime: string, endTime = slotEndTime(startTime)): string {
  return `${formatIstTime(startTime)} – ${formatIstTime(endTime)}`
}

/** Human range used in headings: "14 – 18 September 2026". */
export function formatIstDateRange(startDate: string, endDate: string): string {
  const start = dateParts(startDate)
  const end = dateParts(endDate)
  if (start.year === end.year && start.monthIndex === end.monthIndex) {
    return `${start.day} – ${end.day} ${MONTH_NAMES[end.monthIndex]} ${end.year}`
  }
  return `${formatIstDate(startDate)} – ${formatIstDate(endDate)}`
}

/** Compact UTC stamp rendered as IST, for admin tables: "15 Sep 2026, 4:05 PM". */
export function formatIstTimestamp(isoOrEpoch: string | number): string {
  const epoch = typeof isoOrEpoch === "number" ? isoOrEpoch : Date.parse(isoOrEpoch)
  if (Number.isNaN(epoch)) return "—"
  const { date, time } = nowInIst(epoch)
  const { monthIndex, day, year } = dateParts(date)
  return `${day} ${MONTH_NAMES[monthIndex].slice(0, 3)} ${year}, ${formatIstTime(time)}`
}

/** ICS-style UTC stamp ("20260915T060000Z") for the Add to Calendar link. */
export function toIcsUtcStamp(date: string, time: string): string {
  const stamp = new Date(istToEpoch(date, time)).toISOString()
  return `${stamp.slice(0, 4)}${stamp.slice(5, 7)}${stamp.slice(8, 10)}T${stamp.slice(11, 13)}${stamp.slice(
    14, 16,
  )}${stamp.slice(17, 19)}Z`
}
