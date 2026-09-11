import { handleRouteError, jsonError, jsonOk, jsonValidationError } from "@/lib/interview-drive/api"
import { requireAdmin } from "@/lib/interview-drive/admin-guard"
import { getCandidateDetail, updateBookingStatus } from "@/lib/interview-drive/admin-service"
import { getEducationLevelName, getLanguageName, getTrackName, type BookingStatus } from "@/lib/interview-drive/config"
import { isEmailConfigured, processEmailQueue } from "@/lib/interview-drive/email"
import { formatIstDate, formatIstTimeRange } from "@/lib/interview-drive/ist"
import { updateStatusSchema } from "@/lib/interview-drive/validation"
import { after } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ id: string }> }

/** Full candidate record, including resume metadata and email delivery history. */
export async function GET(request: Request, { params }: Params) {
  const guard = await requireAdmin(request)
  if (!guard.ok) return guard.response

  try {
    const { id } = await params
    const detail = await getCandidateDetail(id)
    if (!detail) return jsonError("not_found", "That booking no longer exists.", 404)

    const { booking, candidate, slot, emails } = detail
    return jsonOk({
      ok: true,
      candidate: {
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        college: candidate.college,
        graduationYear: candidate.graduationYear,
        educationLevel: candidate.educationLevel ? getEducationLevelName(candidate.educationLevel) : null,
        technology: getTrackName(booking.technology),
        language: getLanguageName(booking.language),
        interviewDateLabel: formatIstDate(booking.interviewDate),
        interviewTimeLabel: formatIstTimeRange(booking.interviewStartTime, booking.interviewEndTime),
        interviewDate: booking.interviewDate,
        slotId: booking.slotId,
        slotStatus: slot?.status ?? null,
        status: booking.status,
        adminNotes: booking.adminNotes ?? null,
        resume: candidate.resume,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        rescheduledFrom: booking.rescheduledFrom ?? null,
      },
      emails: emails.map((job) => ({
        id: job.id,
        kind: job.kind,
        status: job.status,
        attempts: job.attempts,
        lastError: job.lastError ?? null,
        scheduledAt: job.scheduledAt,
        sentAt: job.sentAt ?? null,
      })),
    })
  } catch (error) {
    return handleRouteError(error)
  }
}

/** Updates interview status (and optionally admin notes). */
export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdmin(request, { mutating: true })
  if (!guard.ok) return guard.response

  try {
    const { id } = await params
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
    const parsed = updateStatusSchema.safeParse(body)
    if (!parsed.success) return jsonValidationError(parsed.error)

    const booking = await updateBookingStatus(
      id,
      parsed.data.status as BookingStatus,
      parsed.data.adminNotes ?? undefined,
      { admin: guard.admin, ip: guard.ip },
    )

    if (isEmailConfigured()) {
      after(() => processEmailQueue().catch(() => undefined))
    }

    return jsonOk({ ok: true, booking: { id: booking.id, status: booking.status } })
  } catch (error) {
    return handleRouteError(error)
  }
}
