import {
  getEducationLevelName,
  getLanguageName,
  getTrackName,
} from "./config"
import { formatIstDate, formatIstTimeRange } from "./ist"
import type { Candidate, InterviewBooking } from "./types"

/**
 * Rayon Web branded emails.
 *
 * Every template renders the interview time as an explicit IST string, so the
 * recipient's mail client or device timezone can never shift what they read.
 * Each email ships as HTML plus a plain-text alternative.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.rayonweb.com").replace(/\/$/, "")

const BRAND = {
  ink: "#0f172a",
  body: "#475569",
  muted: "#64748b",
  line: "#e2e8f0",
  surface: "#f8fafc",
  accent: "#0ea5e9",
  accentDark: "#0369a1",
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export type BookingEmailContext = {
  booking: InterviewBooking
  candidate: Candidate
}

/** The canonical IST strings every template shares. */
function bookingFacts({ booking }: BookingEmailContext) {
  return {
    dateLabel: formatIstDate(booking.interviewDate),
    timeLabel: `${formatIstTimeRange(booking.interviewStartTime, booking.interviewEndTime)} IST`,
    technology: getTrackName(booking.technology),
    language: getLanguageName(booking.language),
    reference: booking.bookingReference,
  }
}

function shell(heading: string, preheader: string, inner: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(heading)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.surface};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.surface};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${BRAND.line};border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <tr><td style="background:linear-gradient(135deg,${BRAND.accentDark},${BRAND.accent});padding:28px 32px;">
    <div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">Rayon Web Solutions</div>
    <div style="color:rgba(255,255,255,0.85);font-size:12px;margin-top:4px;letter-spacing:0.08em;text-transform:uppercase;">Web &bull; AI &bull; Cloud &bull; Software Development</div>
  </td></tr>
  <tr><td style="padding:32px;">${inner}</td></tr>
  <tr><td style="padding:20px 32px;background:${BRAND.surface};border-top:1px solid ${BRAND.line};">
    <div style="color:${BRAND.muted};font-size:12px;line-height:1.6;">
      Rayon Web Solutions &bull; <a href="${SITE_URL}" style="color:${BRAND.accentDark};text-decoration:none;">www.rayonweb.com</a><br>
      All interview times are shown in IST (Asia/Kolkata).
    </div>
  </td></tr>
</table>
</td></tr></table>
</body></html>`
}

function detailRows(rows: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.line};border-radius:12px;overflow:hidden;margin:20px 0;">
${rows
  .map(
    ([label, value], index) => `<tr style="background:${index % 2 === 0 ? "#ffffff" : BRAND.surface};">
  <td style="padding:12px 16px;font-size:13px;color:${BRAND.muted};width:42%;border-bottom:1px solid ${BRAND.line};">${escapeHtml(label)}</td>
  <td style="padding:12px 16px;font-size:14px;color:${BRAND.ink};font-weight:600;border-bottom:1px solid ${BRAND.line};">${escapeHtml(value)}</td>
</tr>`,
  )
  .join("")}
</table>`
}

const checklist = [
  "Keep your resume ready.",
  "Revise your technology fundamentals.",
  "Keep your project details ready.",
  "Check your internet connection.",
  "Join/prepare before your scheduled time.",
  "Use a laptop/desktop if possible.",
]

function bulletList(items: string[]): string {
  return `<ul style="margin:12px 0 0;padding-left:20px;color:${BRAND.body};font-size:14px;line-height:1.9;">
${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
</ul>`
}

/* ------------------------------------------------- candidate confirmation */

/**
 * Sent when an admin verifies the candidate and moves them to Scheduled.
 * This — not the submission email — is the message that fixes a time.
 */
export function buildConfirmationEmail(context: BookingEmailContext) {
  const { candidate } = context
  const facts = bookingFacts(context)

  const inner = `
<h1 style="margin:0 0 8px;font-size:22px;color:${BRAND.ink};letter-spacing:-0.02em;">Interview Slot Confirmed</h1>
<p style="margin:0 0 16px;font-size:15px;color:${BRAND.body};line-height:1.7;">Hello <strong style="color:${BRAND.ink};">${escapeHtml(candidate.name)}</strong>,</p>
<p style="margin:0 0 16px;font-size:15px;color:${BRAND.body};line-height:1.7;">Your profile has been reviewed and shortlisted for the Rayon Web Solutions Fresher Interview Drive.</p>
<p style="margin:0;padding:14px 16px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;font-size:15px;color:#065f46;font-weight:600;">&#127881; Your interview slot is now confirmed!</p>
<h2 style="margin:28px 0 0;font-size:16px;color:${BRAND.ink};">Interview Details</h2>
${detailRows([
    ["Booking ID", facts.reference],
    ["Technology", facts.technology],
    ["Date", facts.dateLabel],
    ["Time", facts.timeLabel],
    ["Mode", "Online"],
    ["Interview Language", facts.language],
  ])}
<p style="margin:0 0 20px;font-size:15px;color:${BRAND.body};line-height:1.7;">Please make sure you are available at the scheduled time.</p>
<h2 style="margin:0 0 0;font-size:16px;color:${BRAND.ink};">Before Your Interview</h2>
${bulletList(checklist)}
<p style="margin:20px 0 0;padding:12px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;font-size:14px;color:#92400e;font-weight:600;">Please do not miss your scheduled slot.</p>
<p style="margin:20px 0 0;font-size:14px;color:${BRAND.body};line-height:1.7;">If you have any issue regarding your booking, contact the Rayon Web Solutions team.</p>
<p style="margin:20px 0 0;font-size:14px;color:${BRAND.body};line-height:1.7;">Regards,<br><strong style="color:${BRAND.ink};">Rayon Web Solutions</strong></p>`

  const text = `Hello ${candidate.name},

Your profile has been reviewed and shortlisted for the Rayon Web Solutions
Fresher Interview Drive.

Your interview slot is now confirmed!

INTERVIEW DETAILS
Booking ID: ${facts.reference}
Technology: ${facts.technology}
Date: ${facts.dateLabel}
Time: ${facts.timeLabel}
Mode: Online
Interview Language: ${facts.language}

Please make sure you are available at the scheduled time.

BEFORE YOUR INTERVIEW
${checklist.map((item) => `- ${item}`).join("\n")}

Please do not miss your scheduled slot.

If you have any issue regarding your booking, contact the Rayon Web Solutions team.

Regards,
Rayon Web Solutions
${SITE_URL}`

  return {
    subject: "✅ Interview Slot Confirmed – Rayon Web Solutions",
    html: shell("Interview Slot Confirmed", `Your slot: ${facts.dateLabel}, ${facts.timeLabel}`, inner),
    text,
  }
}

/* ------------------------------------------------ submission received */

/**
 * Sent the moment a candidate submits. This is deliberately NOT a
 * confirmation: the slot is reserved but the interview is not final until an
 * admin has verified the details, so the wording promises review, not a time.
 */
export function buildSubmissionReceivedEmail(context: BookingEmailContext) {
  const { candidate } = context
  const facts = bookingFacts(context)

  const inner = `
<h1 style="margin:0 0 8px;font-size:22px;color:${BRAND.ink};letter-spacing:-0.02em;">We&rsquo;ve received your details</h1>
<p style="margin:0 0 16px;font-size:15px;color:${BRAND.body};line-height:1.7;">Hello <strong style="color:${BRAND.ink};">${escapeHtml(candidate.name)}</strong>,</p>
<p style="margin:0 0 16px;font-size:15px;color:${BRAND.body};line-height:1.7;">Thank you for registering for the Rayon Web Solutions Fresher Interview Drive.</p>
<p style="margin:0;padding:14px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;font-size:15px;color:#1e40af;font-weight:600;">&#128221; Your details have been submitted and are currently under review.</p>
<h2 style="margin:28px 0 0;font-size:16px;color:${BRAND.ink};">Your requested slot</h2>
${detailRows([
    ["Reference ID", facts.reference],
    ["Technology", facts.technology],
    ["Requested Date", facts.dateLabel],
    ["Requested Time", facts.timeLabel],
    ["Mode", "Online"],
    ["Interview Language", facts.language],
    ["Status", "Under review"],
  ])}
<p style="margin:0 0 8px;font-size:15px;color:${BRAND.body};line-height:1.7;">
  Our team will review your profile. <strong style="color:${BRAND.ink};">Once your profile is shortlisted, you will receive a separate confirmation email</strong> with your final interview date and time.
</p>
<p style="margin:0 0 20px;font-size:14px;color:${BRAND.muted};line-height:1.7;">This slot is held for you while your details are being reviewed. Please do not submit again.</p>
<h2 style="margin:0;font-size:16px;color:${BRAND.ink};">Meanwhile, start preparing</h2>
${bulletList(checklist)}
<p style="margin:20px 0 0;font-size:14px;color:${BRAND.body};line-height:1.7;">Regards,<br><strong style="color:${BRAND.ink};">Rayon Web Solutions</strong></p>`

  const text = `Hello ${candidate.name},

Thank you for registering for the Rayon Web Solutions Fresher Interview Drive.

Your details have been submitted and are currently under review.

YOUR REQUESTED SLOT
Reference ID: ${facts.reference}
Technology: ${facts.technology}
Requested Date: ${facts.dateLabel}
Requested Time: ${facts.timeLabel}
Mode: Online
Interview Language: ${facts.language}
Status: Under review

Our team will review your profile. Once your profile is shortlisted, you will
receive a separate confirmation email with your final interview date and time.

This slot is held for you while your details are being reviewed. Please do not
submit again.

MEANWHILE, START PREPARING
${checklist.map((item) => `- ${item}`).join("\n")}

Regards,
Rayon Web Solutions
${SITE_URL}`

  return {
    subject: "\u{1F4DD} Details Received \u2013 Rayon Web Solutions Interview Drive",
    html: shell("We have received your details", `Reference ${facts.reference} - under review`, inner),
    text,
  }
}

/* ------------------------------------------------------ admin notification */

export function buildAdminNotificationEmail(context: BookingEmailContext) {
  const { booking, candidate } = context
  const facts = bookingFacts(context)

  const inner = `
<h1 style="margin:0 0 16px;font-size:20px;color:${BRAND.ink};letter-spacing:-0.02em;">New Interview Booking</h1>
${detailRows([
    ["Booking ID", facts.reference],
    ["Candidate Name", candidate.name],
    ["Email", candidate.email],
    ["Phone", candidate.phone],
    ["College", candidate.college],
    ["Graduation Year", String(candidate.graduationYear)],
    ["Education Level", candidate.educationLevel ? getEducationLevelName(candidate.educationLevel) : "Not provided"],
    ["Technology", facts.technology],
    ["Interview Language", facts.language],
    ["Date", facts.dateLabel],
    ["Time", facts.timeLabel],
    ["Mode", "Online"],
    ["Resume", candidate.resume ? candidate.resume.originalName : "Not uploaded"],
  ])}
<p style="margin:0;font-size:14px;color:${BRAND.body};line-height:1.7;">
  ${candidate.resume
      ? "The resume is available from the interview drive admin dashboard."
      : "This candidate did not upload a resume."}
</p>
<p style="margin:8px 0 0;font-size:13px;color:${BRAND.muted};">Booking created at ${escapeHtml(booking.createdAt)}.</p>`

  const text = `New interview booking

Booking ID: ${facts.reference}
Name: ${candidate.name}
Email: ${candidate.email}
Phone: ${candidate.phone}
College: ${candidate.college}
Graduation Year: ${candidate.graduationYear}
Education Level: ${candidate.educationLevel ? getEducationLevelName(candidate.educationLevel) : "Not provided"}
Technology: ${facts.technology}
Interview Language: ${facts.language}
Date: ${facts.dateLabel}
Time: ${facts.timeLabel}
Mode: Online
Resume: ${candidate.resume ? candidate.resume.originalName : "Not uploaded"}

Resumes are available from the interview drive admin dashboard.`

  return {
    subject: `New Interview Booking – ${candidate.name} – ${facts.dateLabel} ${facts.timeLabel}`,
    html: shell("New Interview Booking", `${candidate.name} booked ${facts.dateLabel}`, inner),
    text,
  }
}

/* ----------------------------------------------------------- reminders */

export function buildReminderEmail(context: BookingEmailContext, window: "24h" | "1h") {
  const { candidate } = context
  const facts = bookingFacts(context)
  const isDayBefore = window === "24h"

  const heading = isDayBefore ? "Your interview is tomorrow" : "Your interview starts in 1 hour"
  const lead = isDayBefore
    ? "This is a friendly reminder about your Rayon Web Solutions interview tomorrow."
    : "Your Rayon Web Solutions interview starts in about an hour."

  const instructions = isDayBefore
    ? [
        "Keep your resume ready.",
        "Revise your technology fundamentals and project details.",
        "Test your internet connection, camera and microphone.",
        "Use a laptop/desktop if possible.",
      ]
    : [
        "Find a quiet, well-lit place with a stable internet connection.",
        "Keep your resume and project details open.",
        "Test your camera and microphone now.",
        "Be ready a few minutes before your scheduled time.",
      ]

  const inner = `
<h1 style="margin:0 0 8px;font-size:22px;color:${BRAND.ink};letter-spacing:-0.02em;">${escapeHtml(heading)}</h1>
<p style="margin:0 0 16px;font-size:15px;color:${BRAND.body};line-height:1.7;">Hello <strong style="color:${BRAND.ink};">${escapeHtml(candidate.name)}</strong>,</p>
<p style="margin:0 0 16px;font-size:15px;color:${BRAND.body};line-height:1.7;">${escapeHtml(lead)}</p>
${detailRows([
    ["Booking ID", facts.reference],
    ["Technology", facts.technology],
    ["Date", facts.dateLabel],
    ["Time", facts.timeLabel],
    ["Mode", "Online"],
    ["Interview Language", facts.language],
  ])}
<h2 style="margin:0;font-size:16px;color:${BRAND.ink};">Please get ready</h2>
${bulletList(instructions)}
<p style="margin:20px 0 0;font-size:14px;color:${BRAND.body};line-height:1.7;">Regards,<br><strong style="color:${BRAND.ink};">Rayon Web Solutions</strong></p>`

  const text = `Hello ${candidate.name},

${lead}

Booking ID: ${facts.reference}
Technology: ${facts.technology}
Date: ${facts.dateLabel}
Time: ${facts.timeLabel}
Mode: Online
Interview Language: ${facts.language}

PLEASE GET READY
${instructions.map((item) => `- ${item}`).join("\n")}

Regards,
Rayon Web Solutions
${SITE_URL}`

  return {
    subject: isDayBefore
      ? "⏰ Interview Reminder – Your Rayon Web Interview is Tomorrow"
      : "⏰ Your Rayon Web Interview Starts in 1 Hour",
    html: shell(heading, `${facts.dateLabel}, ${facts.timeLabel}`, inner),
    text,
  }
}
