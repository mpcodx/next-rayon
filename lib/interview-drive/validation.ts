import { z } from "zod"

import {
  BOOKING_STATUSES,
  EDUCATION_LEVEL_IDS,
  GRADUATION_YEAR_MAX,
  GRADUATION_YEAR_MIN,
  INTERVIEW_LANGUAGE_IDS,
  TECHNOLOGY_TRACK_IDS,
} from "./config"
import { DATE_RE, isValidDateString } from "./ist"

/**
 * Server-side schemas. The browser runs its own checks for fast feedback, but
 * these are the authority — every field is re-validated here regardless of
 * what the client claims.
 */

const trimmed = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `${label} is required.`, invalid_type_error: `${label} is required.` })
    .transform((value) => value.trim())
    .refine((value) => value.length >= min, { message: `${label} is required.` })
    .refine((value) => value.length <= max, { message: `${label} must be ${max} characters or fewer.` })

export const nameSchema = trimmed(2, 100, "Full name").refine(
  (value) => /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(value),
  { message: "Please enter a valid name." },
)

export const emailSchema = z
  .string({ required_error: "Email address is required." })
  .transform((value) => value.trim().toLowerCase())
  .refine((value) => value.length > 0, { message: "Email address is required." })
  .refine((value) => value.length <= 254, { message: "Email address is too long." })
  .refine((value) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value), {
    message: "Please enter a valid email address.",
  })

/**
 * Accepts Indian mobile numbers with or without +91/0 prefixes, plus generous
 * international fallback, while rejecting obvious junk.
 */
export const phoneSchema = z
  .string({ required_error: "Phone number is required." })
  .transform((value) => value.replace(/[\s()-]/g, "").trim())
  .refine((value) => value.length > 0, { message: "Phone number is required." })
  .refine((value) => /^(\+?\d{1,3})?\d{6,14}$/.test(value), { message: "Please enter a valid phone number." })
  .refine((value) => {
    const digits = value.replace(/\D/g, "")
    const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits
    // A 10-digit Indian mobile always starts 6-9.
    return local.length !== 10 || /^[6-9]/.test(local)
  }, { message: "Please enter a valid mobile number." })

export const collegeSchema = trimmed(2, 150, "College / University")

export const graduationYearSchema = z
  .coerce
  .number({ required_error: "Graduation year is required.", invalid_type_error: "Please select a valid graduation year." })
  .int("Please select a valid graduation year.")
  .min(GRADUATION_YEAR_MIN, `Graduation year must be ${GRADUATION_YEAR_MIN} or later.`)
  .max(GRADUATION_YEAR_MAX, `Graduation year must be ${GRADUATION_YEAR_MAX} or earlier.`)

export const technologySchema = z.enum(TECHNOLOGY_TRACK_IDS as [string, ...string[]], {
  errorMap: () => ({ message: "Please choose a technology track." }),
})

export const languageSchema = z.enum(INTERVIEW_LANGUAGE_IDS as [string, ...string[]], {
  errorMap: () => ({ message: "Please choose an interview language." }),
})

export const educationLevelSchema = z
  .enum(EDUCATION_LEVEL_IDS as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose a valid education level." }),
  })
  .nullable()
  .optional()

export const dateSchema = z
  .string({ required_error: "Please select an interview date." })
  .regex(DATE_RE, "Please select a valid interview date.")
  .refine(isValidDateString, { message: "Please select a valid interview date." })

export const slotIdSchema = z
  .string({ required_error: "Please select an interview slot." })
  .regex(/^\d{4}-\d{2}-\d{2}_\d{4}$/, "Please select a valid interview slot.")

export const createBookingSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  college: collegeSchema,
  graduationYear: graduationYearSchema,
  educationLevel: educationLevelSchema,
  technology: technologySchema,
  language: languageSchema,
  date: dateSchema,
  slotId: slotIdSchema,
  consent: z
    .union([z.boolean(), z.literal("true"), z.literal("on"), z.literal("false")])
    .transform((value) => value === true || value === "true" || value === "on")
    .refine((value) => value, { message: "Please confirm your details before booking." }),
})

export type CreateBookingPayload = z.infer<typeof createBookingSchema>

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Password is required.")
    .max(200, "Password is too long."),
})

export const updateStatusSchema = z.object({
  status: z.enum(BOOKING_STATUSES as unknown as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose a valid status." }),
  }),
  adminNotes: z.string().max(2000, "Notes must be 2000 characters or fewer.").nullish(),
})

export const rescheduleSchema = z.object({
  slotId: slotIdSchema,
})

export const blockSlotSchema = z.object({
  slotId: slotIdSchema,
  blocked: z.boolean(),
  reason: z.string().max(200, "Reason must be 200 characters or fewer.").nullish(),
})

/** Flattens a ZodError into `{ field: message }` for form rendering. */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form"
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return fieldErrors
}
