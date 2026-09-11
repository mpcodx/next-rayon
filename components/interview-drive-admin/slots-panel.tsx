"use client"

import { Ban, CircleCheck, Loader2, Lock, Unlock } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import type { AdminSlotView } from "./shared"

/**
 * Slot management: view, block and unblock 15-minute slots.
 *
 * A blocked slot immediately reads as "Unavailable" to candidates. The server
 * refuses to block a slot that already holds a booking — cancel or reschedule
 * that candidate first — so a block can never orphan an interview.
 */
export default function SlotsPanel({
  csrfToken,
  dates,
  onChanged,
}: {
  csrfToken: string
  dates: { date: string; shortLabel: string }[]
  onChanged: () => void
}) {
  const [activeDate, setActiveDate] = useState<string>(dates[0]?.date ?? "")
  const [slots, setSlots] = useState<AdminSlotView[]>([])
  const [loading, setLoading] = useState(false)
  const [busySlot, setBusySlot] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!activeDate && dates.length > 0) setActiveDate(dates[0].date)
  }, [dates, activeDate])

  const load = useCallback(async (date: string) => {
    if (!date) return
    setLoading(true)
    try {
      const response = await fetch(`/api/interview-drive-admin/slots?date=${encodeURIComponent(date)}`, {
        cache: "no-store",
      })
      if (response.ok) {
        const data = await response.json()
        setSlots(data.slots as AdminSlotView[])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load(activeDate)
  }, [activeDate, load])

  const toggleBlock = async (slot: AdminSlotView) => {
    setBusySlot(slot.id)
    setError(null)
    try {
      const response = await fetch("/api/interview-drive-admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-rw-csrf-token": csrfToken },
        body: JSON.stringify({
          slotId: slot.id,
          blocked: slot.status !== "blocked",
          reason: slot.status !== "blocked" ? "Blocked by admin" : null,
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data?.ok) {
        setError(data?.message ?? "Could not update that slot.")
        return
      }
      await load(activeDate)
      onChanged()
    } finally {
      setBusySlot(null)
    }
  }

  const counts = {
    available: slots.filter((s) => s.status === "available").length,
    booked: slots.filter((s) => s.status === "booked").length,
    blocked: slots.filter((s) => s.status === "blocked").length,
  }

  return (
    <section aria-labelledby="slots-heading" className="mt-5">
      <h2 id="slots-heading" className="sr-only">
        Slot management
      </h2>

      <div className="flex flex-wrap gap-2">
        {dates.map((date) => (
          <button
            key={date.date}
            type="button"
            onClick={() => setActiveDate(date.date)}
            aria-pressed={activeDate === date.date}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
              activeDate === date.date
                ? "border-cyan-400/70 bg-cyan-500/15 text-cyan-200"
                : "border-white/20 bg-white/5 text-gray-200 hover:border-cyan-400/40 hover:bg-white/10",
            )}
          >
            {date.shortLabel}
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100">
          {error}
        </p>
      ) : null}

      <p className="mt-4 text-xs text-gray-400">
        <span className="font-semibold text-emerald-300">{counts.available} available</span> ·{" "}
        <span className="font-semibold text-cyan-300">{counts.booked} booked</span> ·{" "}
        <span className="font-semibold text-gray-300">{counts.blocked} blocked</span>
      </p>

      {loading ? (
        <div className="mt-4 flex justify-center py-16">
          <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-gray-500" strokeWidth={2} />
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {slots.map((slot) => (
            <li
              key={slot.id}
              className={cn(
                "rounded-2xl border p-3",
                slot.status === "booked"
                  ? "border-cyan-400/30 bg-cyan-500/10"
                  : slot.status === "blocked"
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-emerald-400/25 bg-emerald-500/[0.07]",
              )}
            >
              <p className="text-sm font-bold text-white">{slot.label.split(" – ")[0]}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium capitalize text-gray-300">
                {slot.status === "booked" ? (
                  <CircleCheck aria-hidden="true" className="h-3 w-3 text-cyan-300" strokeWidth={2} />
                ) : slot.status === "blocked" ? (
                  <Ban aria-hidden="true" className="h-3 w-3 text-gray-400" strokeWidth={2} />
                ) : null}
                {slot.status}
              </p>

              {slot.booking ? (
                <p className="mt-1.5 truncate text-[11px] text-gray-300" title={slot.booking.candidateName}>
                  {slot.booking.candidateName}
                  <span className="block font-mono text-[10px] text-gray-500">{slot.booking.reference}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => void toggleBlock(slot)}
                  disabled={busySlot === slot.id}
                  className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-[11px] font-semibold text-gray-200 transition-colors hover:border-cyan-400/40 hover:bg-white/10 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  {busySlot === slot.id ? (
                    <Loader2 aria-hidden="true" className="h-3 w-3 animate-spin" strokeWidth={2} />
                  ) : slot.status === "blocked" ? (
                    <>
                      <Unlock aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
                      Unblock
                    </>
                  ) : (
                    <>
                      <Lock aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
                      Block
                    </>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
