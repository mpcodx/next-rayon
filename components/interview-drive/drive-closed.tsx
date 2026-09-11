import { ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

/**
 * Shown once the campaign window has passed (or before it opens).
 *
 * The server decides which state to render — this component is never the
 * thing that closes the drive. The booking APIs reject requests independently,
 * so disabling the UI is presentation, not enforcement.
 */
export default function DriveClosed({
  phase = "closed",
  message,
}: {
  phase?: "closed" | "not_started"
  message?: string | null
}) {
  const isClosed = phase === "closed"

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="glass-card mx-auto w-full max-w-lg rounded-3xl p-8 text-center sm:p-12">
        <span
          aria-hidden="true"
          className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5"
        >
          <Lock className="h-8 w-8 text-cyan-300" strokeWidth={1.7} />
        </span>

        <h1 className="relative mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          <span aria-hidden="true">🔒</span>{" "}
          {isClosed ? "Interview Drive Closed" : "Interview Drive Opening Soon"}
        </h1>

        <p className="relative mt-4 text-base leading-relaxed text-gray-300/90">
          {isClosed
            ? "Thank you for your interest in Rayon Web Solutions. This interview drive has now closed."
            : message || "Bookings for this interview drive have not opened yet. Please check back soon."}
        </p>

        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500 hover-neon-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            Back to Rayon Web
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/careers"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-gray-100 backdrop-blur transition-all hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            View Open Roles
          </Link>
        </div>
      </div>
    </div>
  )
}
