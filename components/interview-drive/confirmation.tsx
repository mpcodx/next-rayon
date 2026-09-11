"use client"

import { CalendarPlus, ClipboardCheck, Copy, Home, ShieldCheck } from "lucide-react"
import { useState } from "react"

import { toIcsUtcStamp } from "@/lib/interview-drive/ist"

export type ConfirmedBooking = {
  bookingReference: string
  candidateName: string
  technologyName: string
  languageName: string
  date: string
  dateLabel: string
  startTime: string
  endTime: string
  timeLabel: string
  mode: string
  emailQueued: boolean
}

/**
 * Post-submission screen.
 *
 * A booking starts as "pending review", so this screen acknowledges receipt
 * and is careful NOT to promise a confirmed interview — the candidate is told
 * the slot is held and that confirmation follows once an admin verifies them.
 *
 * All times come from the server response in IST and are rendered verbatim;
 * the browser's timezone is never used to re-derive them.
 */
export default function BookingConfirmation({ booking }: { booking: ConfirmedBooking }) {
  const [copied, setCopied] = useState(false)

  const details: [string, string][] = [
    ["Technology", booking.technologyName],
    ["Requested Date", booking.dateLabel],
    ["Requested Time", `${booking.timeLabel} IST`],
    ["Mode", booking.mode],
    ["Language", booking.languageName],
    ["Status", "Under review"],
  ]

  const title = `Rayon Web Interview – ${booking.technologyName}`
  const description = `Online interview with Rayon Web Solutions. Booking ID: ${booking.bookingReference}. Keep your resume, device and internet connection ready.`
  const start = toIcsUtcStamp(booking.date, booking.startTime)
  const end = toIcsUtcStamp(booking.date, booking.endTime)

  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${start}/${end}` +
    `&details=${encodeURIComponent(description)}` +
    "&location=Online"

  /** Builds an .ics file in the browser — no server round-trip needed. */
  const downloadIcs = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Rayon Web Solutions//Interview Drive//EN",
      "BEGIN:VEVENT",
      `UID:${booking.bookingReference}@rayonweb.com`,
      `DTSTAMP:${start}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      "LOCATION:Online",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")

    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = `rayon-web-interview-${booking.bookingReference}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(booking.bookingReference)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      // Announced to screen readers as soon as the booking succeeds.
      role="status"
      aria-live="polite"
      className="glass-card mx-auto max-w-2xl rounded-3xl p-6 sm:p-10 !border-cyan-400/30"
    >
      <div className="relative text-center">
        <span
          aria-hidden="true"
          className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/15"
        >
          <ClipboardCheck className="h-9 w-9 text-cyan-300" strokeWidth={1.8} />
        </span>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <span aria-hidden="true">✅</span> Details Submitted!
        </h2>
        <p className="mt-3 text-lg font-semibold text-cyan-200">
          Thank you, {booking.candidateName.split(" ")[0]}!
        </p>
        <p className="mt-1 text-sm text-gray-300/90">
          Your details are under review and this slot is held for you.
        </p>
      </div>

      <h3 className="relative mt-8 text-sm font-semibold uppercase tracking-wide text-gray-400">Your Requested Slot</h3>
      <dl className="relative mt-3 overflow-hidden rounded-2xl border border-white/10">
        {details.map(([label, value], index) => (
          <div
            key={label}
            className={`flex items-center justify-between gap-4 px-4 py-3 ${
              index % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.06]"
            }`}
          >
            <dt className="text-sm text-gray-400">{label}</dt>
            <dd className="text-right text-sm font-semibold text-gray-100">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Reference ID</p>
        <div className="mt-1.5 flex items-center justify-center gap-2">
          <p className="font-mono text-xl font-bold tracking-wider text-white">{booking.bookingReference}</p>
          <button
            type="button"
            onClick={copyReference}
            className="rounded-md p-1.5 text-cyan-300 transition-colors hover:bg-cyan-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            aria-label="Copy booking ID"
          >
            <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
          </button>
        </div>
        <p aria-live="polite" className="mt-1 h-4 text-xs text-emerald-300">
          {copied ? "Copied to clipboard" : ""}
        </p>
      </div>

      <div className="relative mt-5 flex items-start gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.08] px-5 py-4">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" strokeWidth={1.9} />
        <div className="text-sm leading-relaxed text-gray-200">
          <p className="font-semibold text-cyan-100">What happens next</p>
          <p className="mt-1">
            Our team will review your profile. Once you are shortlisted, you will receive a{" "}
            <strong className="text-white">separate confirmation email</strong> with your final interview date and
            time. Keep your device, internet connection and resume ready.
          </p>
        </div>
      </div>

      {booking.emailQueued ? (
        <p className="relative mt-3 text-center text-sm text-gray-300/90">
          <span aria-hidden="true">📩</span> A confirmation of these details has been sent to your email.
        </p>
      ) : null}

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={downloadIcs}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          <CalendarPlus aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          Add to Calendar
        </button>
        <a
          href="/"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-gray-100 backdrop-blur transition-all hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          <Home aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          Back to Rayon Web
        </a>
      </div>

      <p className="relative mt-4 text-center text-xs text-gray-400">
        Prefer Google Calendar?{" "}
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Add the event there instead
        </a>
        .
      </p>
    </div>
  )
}
