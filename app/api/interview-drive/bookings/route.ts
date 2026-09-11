import { after } from "next/server"

import { getClientIp, handleRouteError, jsonError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { checkRateLimit } from "@/lib/interview-drive/auth"
import { getLanguageName, getTrackName } from "@/lib/interview-drive/config"
import { isEmailConfigured, processEmailQueue, queueBookingEmails } from "@/lib/interview-drive/email"
import { formatIstDate, formatIstTimeRange } from "@/lib/interview-drive/ist"
import { createBooking } from "@/lib/interview-drive/repo"
import { storeResume } from "@/lib/interview-drive/resume"
import { mutate } from "@/lib/interview-drive/store"
import { createBookingSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Guards against automated submission floods.
 *
 * Deliberately generous: a college campus NATs its whole network behind one
 * public IP, so dozens of genuine candidates can share an address. The real
 * protection against mass booking is the one-active-booking-per-email rule,
 * not this limiter — this only blunts scripted abuse.
 */
const RATE_LIMIT = {
  max: Number(process.env.INTERVIEW_BOOKING_RATE_LIMIT) || 40,
  windowMs: 60 * 60 * 1000,
}

/**
 * Creates an interview booking.
 *
 * Order matters and is fixed by the spec:
 *   validate -> transactionally reserve the slot -> commit -> queue emails
 *   -> respond. Emails are queued inside the same commit and dispatched after
 *   the response, so a slow or broken mail provider can never fail, delay or
 *   roll back a confirmed booking.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const limit = await checkRateLimit(`booking:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs)
    if (!limit.allowed) {
      return jsonError(
        "rate_limited",
        "Too many booking attempts. Please try again later.",
        429,
        { retryAfterSeconds: Math.ceil(limit.retryAfterMs / 1000) },
      )
    }

    const contentType = request.headers.get("content-type") || ""
    let fields: Record<string, unknown>
    let resumeFile: File | null = null

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData()
      fields = Object.fromEntries(
        [...form.entries()].filter(([, value]) => typeof value === "string"),
      ) as Record<string, unknown>
      const upload = form.get("resume")
      resumeFile = upload instanceof File ? upload : null
    } else if (contentType.includes("application/json")) {
      fields = (await request.json().catch(() => ({}))) as Record<string, unknown>
    } else {
      return jsonError("unsupported_media_type", "Unsupported request format.", 415)
    }

    // Never trust the client: re-validate every field server-side.
    const parsed = createBookingSchema.safeParse(fields)
    if (!parsed.success) return jsonValidationError(parsed.error)

    // Store the resume before the transaction so file I/O never holds the lock.
    const resume = await storeResume(resumeFile)

    const { booking, candidate } = await createBooking({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      college: parsed.data.college,
      graduationYear: parsed.data.graduationYear,
      educationLevel: (parsed.data.educationLevel ?? null) as never,
      technology: parsed.data.technology as never,
      language: parsed.data.language as never,
      date: parsed.data.date,
      slotId: parsed.data.slotId,
      resume,
    })

    // The booking is committed. Only now are emails queued.
    await mutate((db) => {
      const freshBooking = db.bookings.find((b) => b.id === booking.id)
      const freshCandidate = db.candidates.find((c) => c.id === candidate.id)
      if (freshBooking && freshCandidate) queueBookingEmails(db, freshBooking, freshCandidate)
    })

    // Dispatch after the response so the candidate never waits on SMTP.
    if (isEmailConfigured()) {
      after(async () => {
        try {
          await processEmailQueue()
        } catch (error) {
          console.error("[interview-drive] post-booking email dispatch failed:", error)
        }
      })
    }

    return jsonOk(
      {
        ok: true,
        booking: {
          bookingReference: booking.bookingReference,
          candidateName: candidate.name,
          technology: booking.technology,
          technologyName: getTrackName(booking.technology),
          language: booking.language,
          languageName: getLanguageName(booking.language),
          date: booking.interviewDate,
          dateLabel: formatIstDate(booking.interviewDate),
          startTime: booking.interviewStartTime,
          endTime: booking.interviewEndTime,
          timeLabel: formatIstTimeRange(booking.interviewStartTime, booking.interviewEndTime),
          mode: "Online",
          timezone: "IST",
          emailQueued: isEmailConfigured(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    return handleRouteError(error)
  }
}
