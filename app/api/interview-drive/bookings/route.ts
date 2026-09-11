import { getClientIp, handleRouteError, jsonError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { checkRateLimit } from "@/lib/interview-drive/auth"
import { getLanguageName, getTrackName } from "@/lib/interview-drive/config"
import { isEmailConfigured, sendBookingEmailsDirect } from "@/lib/interview-drive/email"
import { formatIstDate, formatIstTimeRange } from "@/lib/interview-drive/ist"
import { createBooking } from "@/lib/interview-drive/repo"
import { storeResume } from "@/lib/interview-drive/resume"
import { createBookingSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Guards against automated submission floods.
 */
const RATE_LIMIT = {
  max: Number(process.env.INTERVIEW_BOOKING_RATE_LIMIT) || 40,
  windowMs: 60 * 60 * 1000,
}

/**
 * Creates an interview booking.
 * Details and uploaded resume are sent directly via email.
 * No external database is required.
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

    // Validate fields server-side
    const parsed = createBookingSchema.safeParse(fields)
    if (!parsed.success) return jsonValidationError(parsed.error)

    // Store resume in memory and prepare buffer for email attachment
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

    // Dispatch details in email directly (Admin notification with resume + candidate confirmation)
    if (isEmailConfigured()) {
      try {
        await sendBookingEmailsDirect({
          booking,
          candidate,
          resumeAttachment: resume?.buffer
            ? {
                filename: resume.originalName,
                content: resume.buffer,
                contentType: resume.mimeType,
              }
            : null,
        })
      } catch (error) {
        console.error("[interview-drive] post-booking direct email dispatch failed:", error)
      }
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
