import {
  DRIVE_END_DATE,
  DRIVE_START_DATE,
  EDUCATION_LEVELS,
  INTERVIEW_LANGUAGES,
  IST_TIMEZONE,
  SLOT_DURATION_MINUTES,
  TECHNOLOGY_TRACKS,
} from "@/lib/interview-drive/config"
import { formatIstDateRange } from "@/lib/interview-drive/ist"
import { computeDriveState, listPublicDates } from "@/lib/interview-drive/repo"
import { readDb } from "@/lib/interview-drive/store"
import { handleRouteError, jsonOk } from "@/lib/interview-drive/api"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Public bootstrap payload: campaign state plus live per-date availability.
 * Carries no candidate data of any kind.
 */
export async function GET() {
  try {
    const db = await readDb()
    const state = computeDriveState(db)
    const dates = await listPublicDates()

    return jsonOk({
      ok: true,
      drive: {
        name: db.drive.name,
        startDate: DRIVE_START_DATE,
        endDate: DRIVE_END_DATE,
        dateRangeLabel: formatIstDateRange(DRIVE_START_DATE, DRIVE_END_DATE),
        timezone: IST_TIMEZONE,
        slotDurationMinutes: SLOT_DURATION_MINUTES,
        isOpen: state.isOpen,
        phase: state.phase,
        message: state.message,
      },
      dates: state.isOpen ? dates : [],
      technologies: TECHNOLOGY_TRACKS.map((t) => ({ id: t.id, name: t.name, description: t.description })),
      languages: INTERVIEW_LANGUAGES,
      educationLevels: EDUCATION_LEVELS,
    })
  } catch (error) {
    return handleRouteError(error)
  }
}
