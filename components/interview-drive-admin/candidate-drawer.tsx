"use client"

import { CalendarClock, CheckCircle2, Download, Loader2, Mail, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { BOOKING_STATUSES, BOOKING_STATUS_LABELS, type BookingStatus } from "@/lib/interview-drive/config"
import { formatIstTimestamp } from "@/lib/interview-drive/ist"
import { cn } from "@/lib/utils"

import { STATUS_STYLES, type AdminSlotView } from "./shared"

type Detail = {
  bookingId: string
  bookingReference: string
  name: string
  email: string
  phone: string
  college: string
  graduationYear: number
  educationLevel: string | null
  technology: string
  language: string
  interviewDateLabel: string
  interviewTimeLabel: string
  interviewDate: string
  slotId: string
  status: BookingStatus
  adminNotes: string | null
  resume: { id: string; originalName: string; size: number } | null
  createdAt: string
  updatedAt: string
  rescheduledFrom: { slotId: string; date: string; startTime: string } | null
}

type EmailRow = {
  id: string
  kind: string
  status: string
  attempts: number
  lastError: string | null
  sentAt: string | null
}

/**
 * Candidate detail panel: full record, email delivery history, status change,
 * reschedule and "Resend Confirmation Email".
 */
export default function CandidateDrawer({
  bookingId,
  csrfToken,
  onClose,
  onChanged,
  onNotice,
}: {
  bookingId: string
  csrfToken: string
  onClose: () => void
  onChanged: () => void
  onNotice: (notice: { tone: "ok" | "error"; text: string }) => void
}) {
  const [detail, setDetail] = useState<Detail | null>(null)
  const [emails, setEmails] = useState<EmailRow[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [freeSlots, setFreeSlots] = useState<AdminSlotView[]>([])
  const [rescheduleTo, setRescheduleTo] = useState("")
  const [notes, setNotes] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/interview-drive-admin/candidates/${bookingId}`, { cache: "no-store" })
      if (response.ok) {
        const data = await response.json()
        setDetail(data.candidate as Detail)
        setEmails(data.emails as EmailRow[])
        setNotes((data.candidate as Detail).adminNotes ?? "")
      }
    } finally {
      setLoading(false)
    }
  }, [bookingId])

  useEffect(() => {
    void load()
  }, [load])

  // Close on Escape, and restore focus to the page behind on unmount.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const loadFreeSlots = async () => {
    const response = await fetch("/api/interview-drive-admin/slots?free=1", { cache: "no-store" })
    if (response.ok) {
      const data = await response.json()
      setFreeSlots(data.slots as AdminSlotView[])
    }
  }

  const authedPost = (url: string, body: unknown, method: "POST" | "PATCH" = "POST") =>
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-rw-csrf-token": csrfToken },
      body: JSON.stringify(body),
    })

  const saveStatus = async (status: BookingStatus) => {
    setBusy(true)
    try {
      const response = await authedPost(
        `/api/interview-drive-admin/candidates/${bookingId}`,
        { status, adminNotes: notes },
        "PATCH",
      )
      const data = await response.json().catch(() => ({}))
      if (response.ok && data?.ok) {
        onNotice({ tone: "ok", text: `Updated to ${BOOKING_STATUS_LABELS[status]}.` })
        await load()
        onChanged()
      } else {
        onNotice({ tone: "error", text: data?.message ?? "Could not update this booking." })
      }
    } finally {
      setBusy(false)
    }
  }

  const doReschedule = async () => {
    if (!rescheduleTo) return
    setBusy(true)
    try {
      const response = await authedPost(`/api/interview-drive-admin/candidates/${bookingId}/reschedule`, {
        slotId: rescheduleTo,
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data?.ok) {
        onNotice({ tone: "ok", text: `Rescheduled to ${data.booking.dateLabel}, ${data.booking.timeLabel} IST.` })
        setRescheduleTo("")
        await load()
        onChanged()
      } else {
        onNotice({ tone: "error", text: data?.message ?? "Could not reschedule." })
      }
    } finally {
      setBusy(false)
    }
  }

  const resendEmail = async () => {
    setBusy(true)
    try {
      const response = await authedPost(`/api/interview-drive-admin/candidates/${bookingId}/resend-email`, {})
      const data = await response.json().catch(() => ({}))
      if (response.ok && data?.ok) {
        onNotice({ tone: "ok", text: `Confirmation email queued for ${data.to}.` })
        await load()
      } else {
        onNotice({ tone: "error", text: data?.message ?? "Could not queue the email." })
      }
    } finally {
      setBusy(false)
    }
  }

  const fields: [string, string][] = detail
    ? [
        ["Booking ID", detail.bookingReference],
        ["Name", detail.name],
        ["Email", detail.email],
        ["Phone", detail.phone],
        ["College", detail.college],
        ["Graduation year", String(detail.graduationYear)],
        ["Education level", detail.educationLevel ?? "Not provided"],
        ["Technology", detail.technology],
        ["Language", detail.language],
        ["Interview date", detail.interviewDateLabel],
        ["Interview time", `${detail.interviewTimeLabel} IST`],
        ["Mode", "Online"],
        ["Registered", formatIstTimestamp(detail.createdAt)],
      ]
    : []

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Candidate details"
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-slate-950 shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-6 py-4 backdrop-blur">
          <h2 className="text-base font-bold text-white">
            {loading ? "Loading…" : detail?.name ?? "Candidate"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {loading || !detail ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 aria-hidden="true" className="h-6 w-6 animate-spin text-gray-500" strokeWidth={2} />
          </div>
        ) : (
          <div className="space-y-6 p-6">
            <span
              className={cn(
                "inline-block rounded-full border px-3 py-1 text-xs font-semibold",
                STATUS_STYLES[detail.status],
              )}
            >
              {BOOKING_STATUS_LABELS[detail.status]}
            </span>

            {detail.rescheduledFrom ? (
              <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-100">
                Rescheduled from {detail.rescheduledFrom.date} at {detail.rescheduledFrom.startTime} IST.
              </p>
            ) : null}

            <dl className="overflow-hidden rounded-2xl border border-white/10">
              {fields.map(([label, value], index) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-start justify-between gap-4 px-4 py-2.5 text-sm",
                    index % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.06]",
                  )}
                >
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="text-right font-medium text-gray-100">{value}</dd>
                </div>
              ))}
            </dl>

            {detail.resume ? (
              <a
                href={`/api/interview-drive-admin/resume/${detail.resume.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <Download aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                {detail.resume.originalName}
                <span className="text-xs font-normal text-gray-400">
                  ({Math.round(detail.resume.size / 1024)} KB)
                </span>
              </a>
            ) : (
              <p className="text-sm text-gray-400">No resume uploaded.</p>
            )}

            {/* Verify & approve — the step that confirms the interview */}
            {detail.status === "pending" ? (
              <section className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.08] p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-200">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                  Awaiting your verification
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-amber-100/90">
                  Check the details above. Approving sends the candidate their interview confirmation for{" "}
                  <strong className="text-white">
                    {detail.interviewDateLabel}, {detail.interviewTimeLabel} IST
                  </strong>{" "}
                  and schedules their 24-hour and 1-hour reminders.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void saveStatus("scheduled")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    {busy ? (
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
                    ) : (
                      <CheckCircle2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                    )}
                    Verify &amp; Schedule Interview
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void saveStatus("rejected")}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-5 py-2.5 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-500/20 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </section>
            ) : null}

            {/* Status + notes */}
            <section>
              <h3 className="text-sm font-semibold text-white">Interview status</h3>
              <p className="mt-1 text-xs text-gray-400">
                Moving a candidate to <strong className="text-gray-200">Scheduled</strong> is what sends their
                interview confirmation email.
              </p>
              <label htmlFor="drawer-notes" className="mt-3 block text-xs font-medium text-gray-300">
                Internal notes
              </label>
              <textarea
                id="drawer-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Interview feedback, follow-ups…"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-slate-900/60 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {BOOKING_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={busy}
                    onClick={() => void saveStatus(status)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50",
                      detail.status === status
                        ? STATUS_STYLES[status]
                        : "border-white/20 bg-white/5 text-gray-200 hover:border-cyan-400/40 hover:bg-white/10",
                    )}
                  >
                    {BOOKING_STATUS_LABELS[status]}
                  </button>
                ))}
              </div>
            </section>

            {/* Reschedule */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <CalendarClock aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={2} />
                Reschedule
              </h3>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="reschedule-slot" className="sr-only">
                  New slot
                </label>
                <select
                  id="reschedule-slot"
                  value={rescheduleTo}
                  onFocus={() => {
                    if (freeSlots.length === 0) void loadFreeSlots()
                  }}
                  onChange={(e) => setRescheduleTo(e.target.value)}
                  className="flex-1 rounded-xl border border-white/15 bg-slate-900/60 px-3 py-2 text-sm text-gray-100 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 [&>option]:bg-slate-900 [&>option]:text-gray-100"
                >
                  <option value="">Select a free slot…</option>
                  {freeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.date} · {slot.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={!rescheduleTo || busy}
                  onClick={() => void doReschedule()}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40"
                >
                  Move
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                The candidate receives an updated confirmation, and reminders move to the new time.
              </p>
            </section>

            {/* Email history */}
            <section>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Mail aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={2} />
                  Email delivery
                </h3>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void resendEmail()}
                  className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10 disabled:opacity-50"
                >
                  Resend Confirmation Email
                </button>
              </div>

              <ul className="mt-3 space-y-2">
                {emails.length === 0 ? (
                  <li className="text-xs text-gray-400">No emails queued yet.</li>
                ) : (
                  emails.map((email) => (
                    <li
                      key={email.id}
                      className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs"
                    >
                      <div>
                        <p className="font-medium capitalize text-gray-100">{email.kind.replace(/_/g, " ")}</p>
                        {email.lastError ? <p className="mt-0.5 text-rose-300">{email.lastError}</p> : null}
                        {email.sentAt ? (
                          <p className="mt-0.5 text-gray-400">Sent {formatIstTimestamp(email.sentAt)}</p>
                        ) : null}
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 font-semibold capitalize",
                          email.status === "sent"
                            ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
                            : email.status === "failed"
                              ? "border-rose-400/30 bg-rose-500/15 text-rose-200"
                              : "border-amber-400/30 bg-amber-500/15 text-amber-200",
                        )}
                      >
                        {email.status}
                        {email.attempts > 1 ? ` ×${email.attempts}` : ""}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
