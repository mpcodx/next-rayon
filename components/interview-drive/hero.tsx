import { ArrowRight, CalendarCheck, Clock3, Sparkles } from "lucide-react"

import Reveal from "./reveal"

/**
 * Landing hero.
 *
 * Server-rendered so the headline, dates and primary CTA are in the initial
 * HTML. Uses the site's existing visual language — blurred accent orbs over
 * the global dark gradient, `gradient-text` headline, glass surfaces.
 */
export default function InterviewDriveHero({
  dateRangeLabel,
  availableSlots,
}: {
  dateRangeLabel: string
  availableSlots: number
}) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.22),transparent_45%)]" />
        <div className="absolute top-10 left-8 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-4 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-cyan-200">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Online Interviews • Limited Slots
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-heading"
              className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
            >
              <span aria-hidden="true">🚀</span> Fresher Tech
              <span className="gradient-text block mt-2">Interview Drive 2026</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-300/90">
              Your first step towards a career in technology starts here.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-5 py-2.5 text-sm font-semibold text-gray-100">
                <CalendarCheck aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={1.9} />
                {dateRangeLabel}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-5 py-2.5 text-sm font-semibold text-gray-100">
                <Clock3 aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={1.9} />
                15-minute slots
              </span>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                Book Your Interview Slot
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  strokeWidth={2.2}
                />
              </a>
              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-gray-100 backdrop-blur transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-300" strokeWidth={1.9} />
                Explore Opportunities
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 text-sm font-medium text-amber-300/90">
              <span aria-hidden="true">⚡</span> Limited interview slots available — book early.
              {availableSlots > 0 ? (
                <span className="ml-1 text-gray-400">
                  {availableSlots} slot{availableSlots === 1 ? "" : "s"} open right now.
                </span>
              ) : null}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
