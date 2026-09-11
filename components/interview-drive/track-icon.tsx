import { Brain, Cloud, Code2, Server, Smartphone } from "lucide-react"

import { cn } from "@/lib/utils"

/** Per-track icon + accent colours, shared by the cards and the booking form. */
const ICONS = { server: Server, brain: Brain, code: Code2, smartphone: Smartphone, cloud: Cloud } as const

export const TRACK_ACCENTS: Record<string, { tile: string; link: string; dot: string }> = {
  emerald: {
    tile: "bg-emerald-500/12 text-emerald-300 border-emerald-400/25",
    link: "text-emerald-300 hover:text-emerald-200",
    dot: "bg-emerald-400",
  },
  violet: {
    tile: "bg-violet-500/12 text-violet-300 border-violet-400/25",
    link: "text-violet-300 hover:text-violet-200",
    dot: "bg-violet-400",
  },
  sky: {
    tile: "bg-cyan-500/12 text-cyan-300 border-cyan-400/25",
    link: "text-cyan-300 hover:text-cyan-200",
    dot: "bg-cyan-400",
  },
  amber: {
    tile: "bg-amber-500/12 text-amber-300 border-amber-400/25",
    link: "text-amber-300 hover:text-amber-200",
    dot: "bg-amber-400",
  },
  rose: {
    tile: "bg-rose-500/12 text-rose-300 border-rose-400/25",
    link: "text-rose-300 hover:text-rose-200",
    dot: "bg-rose-400",
  },
}

export default function TrackIcon({
  icon,
  accent,
  className,
}: {
  icon: string
  accent: string
  className?: string
}) {
  const Icon = ICONS[icon as keyof typeof ICONS] ?? Code2
  const tone = TRACK_ACCENTS[accent] ?? TRACK_ACCENTS.sky
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl border", tone.tile, className)}
    >
      <Icon className="h-6 w-6" strokeWidth={1.8} />
    </span>
  )
}
