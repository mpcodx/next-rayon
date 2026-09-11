import {
  BookOpenCheck,
  CalendarDays,
  Clock3,
  GraduationCap,
  Languages,
  Laptop,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"

import { TECHNOLOGY_TRACKS } from "@/lib/interview-drive/config"
import { cn } from "@/lib/utils"

import Reveal from "./reveal"
import TrackIcon, { TRACK_ACCENTS } from "./track-icon"

/**
 * Static content sections for the interview drive landing page.
 *
 * Plain server components — no client JavaScript beyond the small scroll
 * reveal — styled with the site's existing `glass-card` / `gradient-text`
 * language so the campaign reads as part of rayonweb.com, not a bolt-on.
 */

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  accent?: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        {title}
        {accent ? <span className="gradient-text"> {accent}</span> : null}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-gray-300/90">{description}</p> : null}
    </div>
  )
}

/* --------------------------------------------------------------- dates */

export function DriveDatesSection({ dateRangeLabel }: { dateRangeLabel: string }) {
  const highlights = [
    { icon: CalendarDays, label: "5 interview days", value: dateRangeLabel },
    { icon: Clock3, label: "Every slot", value: "Exactly 15 minutes" },
    { icon: MonitorSmartphone, label: "Interview mode", value: "100% Online" },
    { icon: Languages, label: "Languages", value: "Hindi | English | Punjabi" },
  ]

  return (
    <section aria-labelledby="drive-dates-heading" className="relative py-12 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="drive-dates-heading" className="sr-only">
          Interview drive dates
        </h2>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card rounded-2xl p-5 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <div className="relative">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-100">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- technology */

export function TechnologyTracksSection() {
  return (
    <section id="tracks" aria-labelledby="tracks-heading" className="relative py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Technology"
            title="Choose Your"
            accent="Technology Track"
            description="Pick the area you want to be interviewed in. Choose the one you have actually worked on or studied — depth matters more than breadth."
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGY_TRACKS.map((track, index) => {
            const tone = TRACK_ACCENTS[track.accent] ?? TRACK_ACCENTS.sky
            return (
              <Reveal as="li" key={track.id} delay={index * 60} className="h-full">
                <article className="service-card group flex h-full flex-col">
                  <div className="relative">
                    <TrackIcon icon={track.icon} accent={track.accent} />
                    <h3 className="mt-5 text-lg font-semibold text-white">{track.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300/90">{track.description}</p>
                  </div>
                  <a
                    href={`#booking?track=${track.id}`}
                    data-track-cta={track.id}
                    className={cn(
                      "relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400",
                      tone.link,
                    )}
                  >
                    Apply for this track
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </article>
              </Reveal>
            )
          })}

          <Reveal as="li" delay={300} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-cyan-400/25 bg-cyan-500/[0.04] p-6">
              <Sparkles aria-hidden="true" className="h-6 w-6 text-cyan-300" strokeWidth={1.8} />
              <h3 className="mt-4 text-base font-semibold text-white">Not sure which track?</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300/90">
                Choose the technology closest to your college projects or self-learning. We assess fundamentals and
                potential, not job titles.
              </p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- who can apply */

export function WhoCanApplySection() {
  const audiences = [
    { emoji: "🎓", title: "College Students", note: "Currently pursuing your degree." },
    { emoji: "🚀", title: "Freshers", note: "Ready for your first role." },
    { emoji: "💻", title: "Computer Science / IT Students", note: "CS, IT and allied branches." },
    { emoji: "🧑‍💻", title: "Students with Personal Projects", note: "Built something on your own? Bring it." },
    { emoji: "📚", title: "Students Preparing for Their First Tech Role", note: "Actively learning and practising." },
  ]

  return (
    <section id="eligibility" aria-labelledby="who-heading" className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Eligibility" title="Who Can" accent="Apply?" />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <Reveal as="li" key={audience.title} delay={index * 55} className="h-full">
              <div className="glass-card h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                <div className="relative flex items-start gap-4">
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {audience.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{audience.title}</h3>
                    <p className="mt-1 text-sm text-gray-300/90">{audience.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.07] px-6 py-5 text-center text-base font-medium leading-relaxed text-gray-100">
            You don&apos;t need years of experience. We want to understand your fundamentals, learning ability, projects
            and potential.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- don't panic */

export function DontPanicSection() {
  const checklist = [
    "Revise your fundamentals",
    "Review your college/personal projects",
    "Prepare your introduction",
    "Revise basic programming concepts",
    "Understand the technology you selected",
    "Keep your resume ready",
    "Test your internet and device before the interview",
  ]

  return (
    <section id="prepare" aria-labelledby="panic-heading" className="relative py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Preparation</p>
            <h2 id="panic-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Freshers — <span className="gradient-text">Don&apos;t Panic!</span> <span aria-hidden="true">❤️</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-gray-100">You don&apos;t need to know everything.</p>
            <p className="mt-3 text-base leading-relaxed text-gray-300/90">
              This is a 15-minute conversation, not an exam. We are looking for clear thinking, honest answers and a
              willingness to learn. Say &ldquo;I don&apos;t know&rdquo; when you don&apos;t — it is a perfectly good answer.
            </p>
            <a
              href="#booking"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              I&apos;m Ready — Book My Slot
              <Rocket aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <BookOpenCheck aria-hidden="true" className="h-5 w-5 text-cyan-300" strokeWidth={1.9} />
                  <h3 className="text-base font-semibold text-white">Before your interview</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-200">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-[11px] font-bold text-emerald-300"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ interview details */

export function InterviewDetailsSection({ dateRangeLabel }: { dateRangeLabel: string }) {
  const details = [
    { icon: CalendarDays, emoji: "📅", label: "Dates", value: dateRangeLabel },
    { icon: Laptop, emoji: "💻", label: "Mode", value: "Online" },
    { icon: Clock3, emoji: "⏱️", label: "Duration", value: "15 Minutes" },
    { icon: Languages, emoji: "🗣️", label: "Languages", value: "Hindi | English | Punjabi" },
    { icon: GraduationCap, emoji: "🎯", label: "Eligibility", value: "Freshers & College Students" },
    { icon: Zap, emoji: "⚡", label: "Availability", value: "Limited Slots" },
  ]

  return (
    <section id="details" aria-labelledby="details-heading" className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="At a glance" title="Interview" accent="Details" />
        </Reveal>

        <Reveal delay={100}>
          <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.map(({ icon: Icon, emoji, label, value }) => (
              <div key={label} className="glass-card rounded-2xl p-6">
                <div className="relative">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    <span aria-hidden="true">{emoji}</span>
                    <Icon aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={1.9} />
                    {label}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={160}>
          <div className="mx-auto mt-8 flex max-w-5xl items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/[0.07] px-5 py-4">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" strokeWidth={1.9} />
            <p className="text-sm leading-relaxed text-amber-100/90">
              All interview times are shown and scheduled in <strong className="text-amber-200">IST (Asia/Kolkata)</strong>. Your
              device&apos;s timezone will not change your interview time.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- final CTA */

export function FinalCtaSection({ dateRangeLabel }: { dateRangeLabel: string }) {
  return (
    <section aria-labelledby="final-cta-heading" className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-card relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl"
            />
            <div className="relative">
              <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                <span aria-hidden="true">🚀</span> Ready to Take Your{" "}
                <span className="gradient-text">First Step?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300/90">
                Prepare your resume. Revise your fundamentals. Choose your track. Book your interview.
              </p>
              <a
                href="#booking"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:w-auto"
              >
                <Target aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                Book My Interview Slot
              </a>
              <p className="mt-5 text-sm text-gray-400">Limited slots available from {dateRangeLabel}.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
