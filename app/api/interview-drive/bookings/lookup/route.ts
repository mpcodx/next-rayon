import { getClientIp, handleRouteError, jsonError, jsonOk } from "@/lib/interview-drive/api"
import { checkRateLimit } from "@/lib/interview-drive/auth"
import { getLanguageName, getTrackName } from "@/lib/interview-drive/config"
import { formatIstDate, formatIstTimeRange } from "@/lib/interview-drive/ist"
import { getBookingByReference } from "@/lib/interview-drive/repo"
import { emailSchema } from "@/lib/interview-drive/validation"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Looks up a booking for the candidate who owns it.
 *
 * Requires BOTH the booking reference and the matching email, so a guessed or
 * shared reference alone reveals nothing. The response deliberately omits
 * phone, college, resume and every internal field — a candidate only gets
 * back the details of their own interview.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const limit = await checkRateLimit(`lookup:${ip}`, 15, 15 * 60 * 1000)
    if (!limit.allowed) {
      return jsonError("rate_limited", "Too many lookups. Please try again later.", 429)
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
    const reference = typeof body.reference === "string" ? body.reference.trim().toUpperCase() : ""
    const email = emailSchema.safeParse(body.email)

    if (!reference || !email.success) {
      return jsonError("invalid_lookup", "Please provide your booking ID and email address.", 400)
    }

    const found = await getBookingByReference(reference)
    // One generic message for "no such booking" and "wrong email" alike, so
    // the endpoint cannot be used to test whether a reference exists.
    if (!found || !found.candidate || found.candidate.email !== email.data) {
      return jsonError("booking_not_found", "We could not find a booking with those details.", 404)
    }

    const { booking, candidate } = found
    return jsonOk({
      ok: true,
      booking: {
        bookingReference: booking.bookingReference,
        candidateName: candidate.name,
        technologyName: getTrackName(booking.technology),
        languageName: getLanguageName(booking.language),
        date: booking.interviewDate,
        dateLabel: formatIstDate(booking.interviewDate),
        startTime: booking.interviewStartTime,
        endTime: booking.interviewEndTime,
        timeLabel: formatIstTimeRange(booking.interviewStartTime, booking.interviewEndTime),
        status: booking.status,
        mode: "Online",
        timezone: "IST",
      },
    })
  } catch (error) {
    return handleRouteError(error)
  }
}
