"use client"

import { AlertCircle, FileUp, Loader2, Rocket, X } from "lucide-react"
import { useId, useRef, useState, type FormEvent } from "react"

import {
  EDUCATION_LEVELS,
  GRADUATION_YEAR_MAX,
  GRADUATION_YEAR_MIN,
  INTERVIEW_LANGUAGES,
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_MAX_BYTES,
  TECHNOLOGY_TRACKS,
  getTrackName,
} from "@/lib/interview-drive/config"
import { cn } from "@/lib/utils"

import type { PublicSlotView } from "./booking-flow"

export type BookingFormValues = {
  name: string
  email: string
  phone: string
  college: string
  graduationYear: string
  educationLevel: string
  technology: string
  language: string
}

const GRADUATION_YEARS = Array.from(
  { length: GRADUATION_YEAR_MAX - GRADUATION_YEAR_MIN + 1 },
  (_, i) => GRADUATION_YEAR_MIN + i,
)

/**
 * Client-side validation. Mirrors `lib/interview-drive/validation.ts` purely
 * for fast feedback — the server re-validates every field and is the only
 * authority on what is accepted.
 */
function validate(values: BookingFormValues, consent: boolean): Record<string, string> {
  const errors: Record<string, string> = {}
  const name = values.name.trim()

  if (name.length < 2) errors.name = "Please enter your full name."
  else if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name)) errors.name = "Please enter a valid name."

  if (!values.email.trim()) errors.email = "Email address is required."
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) {
    errors.email = "Please enter a valid email address."
  }

  const phone = values.phone.replace(/[\s()-]/g, "")
  if (!phone) errors.phone = "Phone number is required."
  else if (!/^(\+?\d{1,3})?\d{6,14}$/.test(phone)) errors.phone = "Please enter a valid phone number."
  else {
    const digits = phone.replace(/\D/g, "")
    const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits
    if (local.length === 10 && !/^[6-9]/.test(local)) errors.phone = "Please enter a valid mobile number."
  }

  if (values.college.trim().length < 2) errors.college = "College / University is required."
  if (!values.graduationYear) errors.graduationYear = "Graduation year is required."
  if (!values.technology) errors.technology = "Please choose a technology track."
  if (!values.language) errors.language = "Please choose an interview language."
  if (!consent) errors.consent = "Please confirm your details before booking."

  return errors
}

/* ------------------------------------------------------------ field shell */

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200">
        {label}
        {required ? (
          <span className="ml-0.5 text-rose-400" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-gray-500">(optional)</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error ? <p className="mt-1.5 text-xs text-gray-400">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-300">
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      ) : null}
    </div>
  )
}

const inputClass = (hasError?: boolean) =>
  cn(
    "block w-full rounded-xl border bg-slate-900/60 px-3.5 py-2.5 text-sm text-gray-100 outline-none transition-colors",
    "placeholder:text-gray-500",
    "focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20",
    // Native option lists render on the OS surface, so force readable colours.
    "[&>option]:bg-slate-900 [&>option]:text-gray-100",
    hasError ? "border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/20" : "border-white/15",
  )

/* ------------------------------------------------------------------ form */

export default function BookingForm({
  values,
  onChange,
  slot,
  submitting,
  serverErrors,
  formError,
  onSubmit,
}: {
  values: BookingFormValues
  onChange: (patch: Partial<BookingFormValues>) => void
  slot: PublicSlotView
  submitting: boolean
  serverErrors: Record<string, string>
  formError: string | null
  onSubmit: (payload: { values: BookingFormValues; resume: File | null }) => void
}) {
  const uid = useId()
  const [consent, setConsent] = useState(false)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const [resume, setResume] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const errors: Record<string, string> = { ...clientErrors, ...serverErrors }
  if (resumeError) errors.resume = resumeError
  const fieldId = (name: string) => `${uid}-${name}`

  const handleResume = (file: File | null) => {
    setResumeError(null)
    if (!file) {
      setResume(null)
      return
    }
    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
    if (!RESUME_ALLOWED_EXTENSIONS.includes(extension)) {
      setResumeError("Resume must be a PDF, DOC or DOCX file.")
      setResume(null)
      return
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResumeError("Resume must be 5 MB or smaller.")
      setResume(null)
      return
    }
    setResume(file)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const found = validate(values, consent)
    setClientErrors(found)
    if (Object.keys(found).length > 0 || resumeError) {
      // Move focus to the first problem so keyboard and screen reader users
      // are taken straight to it rather than hunting for the error.
      const firstKey = Object.keys(found)[0]
      document.getElementById(fieldId(firstKey))?.focus()
      return
    }
    onSubmit({ values, resume })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Selected booking summary */}
      <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Your selection</p>
        <div className="mt-3 space-y-1.5">
          <p className="text-base font-bold text-white">
            {values.technology ? getTrackName(values.technology) : "Choose a technology track below"}
          </p>
          <p className="text-sm font-semibold text-gray-100">{slot.dateLabel}</p>
          <p className="text-sm font-semibold text-gray-100">{slot.label} IST</p>
          <p className="text-sm text-gray-400">Online Interview</p>
        </div>
      </div>

      {formError ? (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3.5">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" strokeWidth={1.9} />
          <p className="text-sm font-medium leading-relaxed text-rose-100">{formError}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Full Name" required error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => onChange({ name: e.target.value })}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
            className={inputClass(Boolean(errors.name))}
            placeholder="Manpreet Kaur"
          />
        </Field>

        <Field id={fieldId("email")} label="Email Address" required error={errors.email} hint="Your confirmation is sent here.">
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
            className={inputClass(Boolean(errors.email))}
            placeholder="you@example.com"
          />
        </Field>

        <Field id={fieldId("phone")} label="Phone Number" required error={errors.phone}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
            className={inputClass(Boolean(errors.phone))}
            placeholder="+91 98765 43210"
          />
        </Field>

        <Field id={fieldId("college")} label="College / University" required error={errors.college}>
          <input
            id={fieldId("college")}
            name="college"
            type="text"
            autoComplete="organization"
            value={values.college}
            onChange={(e) => onChange({ college: e.target.value })}
            aria-invalid={Boolean(errors.college)}
            aria-describedby={errors.college ? `${fieldId("college")}-error` : undefined}
            className={inputClass(Boolean(errors.college))}
            placeholder="Punjab Engineering College"
          />
        </Field>

        <Field id={fieldId("graduationYear")} label="Graduation Year" required error={errors.graduationYear}>
          <select
            id={fieldId("graduationYear")}
            name="graduationYear"
            value={values.graduationYear}
            onChange={(e) => onChange({ graduationYear: e.target.value })}
            aria-invalid={Boolean(errors.graduationYear)}
            aria-describedby={errors.graduationYear ? `${fieldId("graduationYear")}-error` : undefined}
            className={inputClass(Boolean(errors.graduationYear))}
          >
            <option value="">Select year</option>
            {GRADUATION_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId("educationLevel")} label="Current Education Level" error={errors.educationLevel}>
          <select
            id={fieldId("educationLevel")}
            name="educationLevel"
            value={values.educationLevel}
            onChange={(e) => onChange({ educationLevel: e.target.value })}
            className={inputClass(Boolean(errors.educationLevel))}
          >
            <option value="">Select level</option>
            {EDUCATION_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId("technology")} label="Technology Track" required error={errors.technology}>
          <select
            id={fieldId("technology")}
            name="technology"
            value={values.technology}
            onChange={(e) => onChange({ technology: e.target.value })}
            aria-invalid={Boolean(errors.technology)}
            aria-describedby={errors.technology ? `${fieldId("technology")}-error` : undefined}
            className={inputClass(Boolean(errors.technology))}
          >
            <option value="">Select technology</option>
            {TECHNOLOGY_TRACKS.map((track) => (
              <option key={track.id} value={track.id}>
                {track.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId("language")} label="Preferred Interview Language" required error={errors.language}>
          <select
            id={fieldId("language")}
            name="language"
            value={values.language}
            onChange={(e) => onChange({ language: e.target.value })}
            aria-invalid={Boolean(errors.language)}
            aria-describedby={errors.language ? `${fieldId("language")}-error` : undefined}
            className={inputClass(Boolean(errors.language))}
          >
            <option value="">Select language</option>
            {INTERVIEW_LANGUAGES.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Resume upload */}
      <Field
        id={fieldId("resume")}
        label="Resume"
        error={errors.resume}
        hint="PDF, DOC or DOCX • up to 5 MB. You can also bring it to the interview."
      >
        {resume ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-slate-900/60 px-3.5 py-2.5">
            <span className="truncate text-sm text-gray-200">{resume.name}</span>
            <button
              type="button"
              onClick={() => {
                setResume(null)
                if (fileInputRef.current) fileInputRef.current.value = ""
              }}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              aria-label={`Remove ${resume.name}`}
            >
              <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <label
            htmlFor={fieldId("resume")}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-white/20 bg-slate-900/40 px-3.5 py-3 text-sm text-gray-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/[0.06] focus-within:border-cyan-400/60"
          >
            <FileUp aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={1.9} />
            Choose a file
          </label>
        )}
        <input
          ref={fileInputRef}
          id={fieldId("resume")}
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => handleResume(e.target.files?.[0] ?? null)}
          aria-invalid={Boolean(errors.resume)}
          aria-describedby={errors.resume ? `${fieldId("resume")}-error` : undefined}
          className={resume ? "hidden" : "sr-only"}
        />
      </Field>

      {/* Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]">
          <input
            id={fieldId("consent")}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked)
              if (e.target.checked) setClientErrors((prev) => ({ ...prev, consent: "" }))
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-slate-900 text-cyan-500 accent-cyan-500 focus:ring-2 focus:ring-cyan-400/30"
          />
          <span className="text-sm leading-relaxed text-gray-200">
            I confirm that the information provided is correct and I am available for the selected interview slot.
          </span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-300">
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:from-cyan-500 disabled:hover:to-blue-600"
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" strokeWidth={2} />
            Confirming your slot…
          </>
        ) : (
          <>
            <Rocket aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
            Confirm Interview Slot
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Your details are used only for this interview drive and are never shared publicly.
      </p>
    </form>
  )
}
