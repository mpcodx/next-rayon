"use client"

import { AlertTriangle, CalendarDays, Check, Lock, RefreshCw, Zap } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import BookingForm, { type BookingFormValues } from "./booking-form"
import BookingConfirmation, { type ConfirmedBooking } from "./confirmation"
import Reveal from "./reveal"
import { SectionHeading } from "./sections"

export type PublicDateView = {
  date: string
  label: string
  shortLabel: string
  weekday: string
  totalSlots: number
  availableSlots: number
  isPast: boolean
}

export type PublicSlotView = {
  id: string
  date: string
  dateLabel: string
  startTime: string
  endTime: string
  label: string
  state: "available" | "booked" | "unavailable" | "past"
}

type ApiSlot = Omit<PublicSlotView, "dateLabel">

const EMPTY_FORM: BookingFormValues = {
  name: "",
  email: "",
  phone: "",
  college: "",
  graduationYear: "",
  educationLevel: "",
  technology: "",
  language: "",
}

/**
 * The interactive booking flow: date -> 15-minute slot -> details -> confirmed.
 *
 * Availability is always re-fetched from the server rather than cached
 * optimistically, and a lost race (someone else took the slot between page
 * load and submit) is handled explicitly: the candidate is told, the grid
 * refreshes, and they pick again.
 */
export default function BookingFlow({ initialDates }: { initialDates: PublicDateView[] }) {
  const [dates, setDates] = useState<PublicDateView[]>(initialDates)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [slots, setSlots] = useState<ApiSlot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<ApiSlot | null>(null)

  const [values, setValues] = useState<BookingFormValues>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [slotAlert, setSlotAlert] = useState<string | null>(null)
  const [duplicate, setDuplicate] = useState<Record<string, unknown> | null>(null)
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null)

  const formRef = useRef<HTMLDivElement>(null)
  const slotsRef = useRef<HTMLDivElement>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)

  const selectedDateLabel = dates.find((d) => d.date === selectedDate)?.label ?? ""

  /* ------------------------------------------------------------ fetching */

  const refreshDates = useCallback(async () => {
    try {
      const response = await fetch("/api/interview-drive/config", { cache: "no-store" })
      const data = await response.json()
      if (data?.ok && Array.isArray(data.dates)) setDates(data.dates)
    } catch {
      // Non-critical: the counters simply stay as they were.
    }
  }, [])

  const loadSlots = useCallback(async (date: string, options: { silent?: boolean } = {}) => {
    if (!options.silent) setSlotsLoading(true)
    try {
      const response = await fetch(`/api/interview-drive/slots?date=${encodeURIComponent(date)}`, {
        cache: "no-store",
      })
      const data = await response.json()
      if (data?.ok && Array.isArray(data.slots)) {
        setSlots(data.slots as ApiSlot[])
      } else {
        setSlots([])
        setSlotAlert(data?.message ?? "Could not load slots. Please try again.")
      }
    } catch {
      setSlots([])
      setSlotAlert("Could not load slots. Please check your connection and try again.")
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  const handleSelectDate = useCallback(
    (date: string) => {
      setSelectedDate(date)
      setSelectedSlot(null)
      setSlotAlert(null)
      void loadSlots(date)
      requestAnimationFrame(() => slotsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
    },
    [loadSlots],
  )

  /**
   * "Apply for this track →" on a technology card jumps here and preselects
   * the track. Delegated from the document so the static, server-rendered
   * cards stay free of client JavaScript.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("[data-track-cta]")
      if (!target) return
      event.preventDefault()
      const track = target.getAttribute("data-track-cta")
      if (track) setValues((prev) => ({ ...prev, technology: track }))
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  /* ----------------------------------------------------------- submitting */

  const handleSubmit = async ({ values: formValues, resume }: { values: BookingFormValues; resume: File | null }) => {
    if (!selectedSlot || !selectedDate) return

    setSubmitting(true)
    setServerErrors({})
    setFormError(null)
    setDuplicate(null)

    try {
      // Re-check availability first so a candidate who sat on the form for a
      // while gets a clear message instead of a failed submit.
      const verify = await fetch("/api/interview-drive/verify-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, slotId: selectedSlot.id }),
      })
      const verified = await verify.json()
      if (verified?.ok && verified.available === false) {
        setSelectedSlot(null)
        setSlotAlert("🔴 This slot has just been booked. Please select the next available 15-minute slot.")
        if (Array.isArray(verified.slots)) setSlots(verified.slots as ApiSlot[])
        else await loadSlots(selectedDate, { silent: true })
        void refreshDates()
        slotsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }

      const body = new FormData()
      body.set("name", formValues.name)
      body.set("email", formValues.email)
      body.set("phone", formValues.phone)
      body.set("college", formValues.college)
      body.set("graduationYear", formValues.graduationYear)
      if (formValues.educationLevel) body.set("educationLevel", formValues.educationLevel)
      body.set("technology", formValues.technology)
      body.set("language", formValues.language)
      body.set("date", selectedDate)
      body.set("slotId", selectedSlot.id)
      body.set("consent", "true")
      if (resume) body.set("resume", resume)

      const response = await fetch("/api/interview-drive/bookings", { method: "POST", body })
      const data = await response.json()

      if (response.ok && data?.ok) {
        setConfirmed(data.booking as ConfirmedBooking)
        void refreshDates()
        requestAnimationFrame(() =>
          confirmationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        )
        return
      }

      // The slot went while they were filling the form — the race the whole
      // backend transaction exists to make safe. Recover gracefully.
      if (data?.code === "slot_taken" || data?.code === "slot_unavailable" || data?.code === "slot_past") {
        setSelectedSlot(null)
        setSlotAlert("🔴 This slot has just been booked. Please select the next available 15-minute slot.")
        await loadSlots(selectedDate, { silent: true })
        void refreshDates()
        slotsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }

      if (data?.code === "duplicate_booking") {
        setDuplicate((data.details ?? {}) as Record<string, unknown>)
        setFormError(data.message ?? "You already have an interview slot booked for this drive.")
        return
      }

      if (data?.fieldErrors) {
        setServerErrors(data.fieldErrors as Record<string, string>)
        setFormError("Please correct the highlighted fields.")
        return
      }

      setFormError(data?.message ?? "Something went wrong. Please try again.")
    } catch {
      setFormError("We could not reach the server. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  /* ------------------------------------------------------------ rendering */

  if (confirmed) {
    return (
      <section id="booking" aria-labelledby="confirmed-heading" className="relative scroll-mt-24 py-16 sm:py-20">
        <h2 id="confirmed-heading" className="sr-only">
          Booking confirmed
        </h2>
        <div ref={confirmationRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BookingConfirmation booking={confirmed} />
        </div>
      </section>
    )
  }

  const availableCount = slots.filter((slot) => slot.state === "available").length

  return (
    <section id="booking" aria-labelledby="booking-heading" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Booking"
            title="Choose Your Interview" accent="Date"
            description="Pick a date, then choose any available 15-minute slot. All times are shown in IST."
          />
        </Reveal>

        {/* Urgency notice */}
        <Reveal delay={80}>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/[0.08] px-5 py-4">
            <Zap aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" strokeWidth={1.9} />
            <p className="text-sm leading-relaxed text-amber-100/90">
              <strong className="font-semibold text-amber-200">Limited Slots.</strong> Each interview slot is 15 minutes. Once a slot
              is booked, it will no longer be available to other candidates.
            </p>
          </div>
        </Reveal>

        {/* Step 1 — date */}
        <Reveal delay={120}>
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={1.9} />
              Step 1 — Select a date
            </h3>
            <div role="group" aria-label="Interview date" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {dates.map((date) => {
                const soldOut = date.availableSlots === 0
                const disabled = soldOut || date.isPast
                const active = selectedDate === date.date
                return (
                  <button
                    key={date.date}
                    type="button"
                    onClick={() => handleSelectDate(date.date)}
                    disabled={disabled}
                    aria-pressed={active}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all duration-200",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
                      active
                        ? "border-cyan-400/70 bg-cyan-500/15 ring-1 ring-cyan-400/50"
                        : "border-white/10 bg-white/[0.04] hover:border-cyan-400/40 hover:bg-white/[0.08]",
                      disabled &&
                        "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50 hover:border-white/5 hover:bg-white/[0.02]",
                    )}
                  >
                    <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
                      {date.shortLabel}
                    </span>
                    <span className="mt-1 block text-base font-bold text-white">
                      {date.label.replace(/ \d{4}$/, "")}
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 block text-xs font-medium",
                        disabled ? "text-gray-500" : "text-emerald-300",
                      )}
                    >
                      {date.isPast ? "Closed" : soldOut ? "Fully booked" : `${date.availableSlots} slots left`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Step 2 — slot */}
        <div ref={slotsRef} className="mt-10 scroll-mt-24">
          {slotAlert ? (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4"
            >
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" strokeWidth={1.9} />
              <p className="text-sm font-medium leading-relaxed text-rose-100">{slotAlert}</p>
            </div>
          ) : null}

          {selectedDate ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  Step 2 — Select a 15-minute slot
                  <span className="ml-2 font-normal text-gray-400">{selectedDateLabel}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    void loadSlots(selectedDate)
                    void refreshDates()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <RefreshCw aria-hidden="true" className={cn("h-3.5 w-3.5", slotsLoading && "animate-spin")} strokeWidth={2} />
                  Refresh
                </button>
              </div>

              <p aria-live="polite" className="mt-2 text-xs text-gray-400">
                {slotsLoading
                  ? "Loading available slots…"
                  : `${availableCount} of ${slots.length} slots available on ${selectedDateLabel}.`}
              </p>

              {slotsLoading ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="h-[74px] animate-pulse rounded-2xl bg-white/[0.06]" />
                  ))}
                </div>
              ) : slots.length === 0 ? (
                <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-8 text-center text-sm text-gray-300">
                  No slots to show for this date.
                </p>
              ) : (
                <div role="group" aria-label="Interview time slot" className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {slots.map((slot) => {
                    const isAvailable = slot.state === "available"
                    const active = selectedSlot?.id === slot.id
                    const stateLabel =
                      slot.state === "available"
                        ? "Available"
                        : slot.state === "booked"
                          ? "Booked"
                          : slot.state === "past"
                            ? "Passed"
                            : "Unavailable"

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!isAvailable}
                        aria-pressed={active}
                        aria-label={`${slot.label} IST — ${stateLabel}`}
                        onClick={() => {
                          setSelectedSlot(slot)
                          setSlotAlert(null)
                          requestAnimationFrame(() =>
                            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                          )
                        }}
                        className={cn(
                          "rounded-2xl border p-3.5 text-left transition-all duration-200",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
                          active
                            ? "border-cyan-400/70 bg-cyan-500/15 ring-1 ring-cyan-400/50"
                            : isAvailable
                              ? "border-emerald-400/25 bg-emerald-500/[0.07] hover:border-emerald-400/60 hover:bg-emerald-500/15"
                              : "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50",
                        )}
                      >
                        <span
                          className={cn(
                            "block text-sm font-bold",
                            isAvailable || active ? "text-white" : "text-gray-500",
                          )}
                        >
                          {slot.label.split(" – ")[0]}
                        </span>
                        <span
                          className={cn(
                            "mt-1 flex items-center gap-1 text-xs font-medium",
                            active
                              ? "text-cyan-300"
                              : isAvailable
                                ? "text-emerald-300"
                                : "text-gray-500",
                          )}
                        >
                          {active ? (
                            <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} />
                          ) : !isAvailable ? (
                            <Lock aria-hidden="true" className="h-3 w-3" strokeWidth={2.2} />
                          ) : null}
                          {active ? "Selected" : stateLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-10 text-center text-sm text-gray-400">
              Select an interview date above to see available 15-minute slots.
            </p>
          )}
        </div>

        {/* Step 3 — details */}
        <div ref={formRef} className="mt-12 scroll-mt-24">
          {selectedSlot && selectedDate ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <h3 className="relative text-xl font-bold tracking-tight text-white sm:text-2xl">
                Secure Your Interview Slot
              </h3>
              <p className="relative mt-1.5 text-sm text-gray-400">
                Step 3 — tell us about yourself. Fields marked * are required.
              </p>

              {duplicate ? (
                <div className="relative mt-5 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5">
                  <p className="text-sm font-semibold text-amber-200">
                    You already have an interview slot booked for this drive.
                  </p>
                  <dl className="mt-3 space-y-1 text-sm text-amber-100/90">
                    <div className="flex gap-2">
                      <dt className="font-medium">Booking ID:</dt>
                      <dd className="font-mono font-bold">{String(duplicate.bookingReference ?? "")}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-medium">Date:</dt>
                      <dd>{String(duplicate.dateLabel ?? "")}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-medium">Time:</dt>
                      <dd>{String(duplicate.timeLabel ?? "")} IST</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-medium">Technology:</dt>
                      <dd>{String(duplicate.technology ?? "")}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}

              <div className="relative mt-6">
                <BookingForm
                  values={values}
                  onChange={(patch) => setValues((prev) => ({ ...prev, ...patch }))}
                  slot={{ ...selectedSlot, dateLabel: selectedDateLabel }}
                  submitting={submitting}
                  serverErrors={serverErrors}
                  formError={formError}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-10 text-center text-sm text-gray-400">
              {selectedDate
                ? "Choose an available time slot to continue."
                : "Your booking form appears once you pick a date and time."}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
