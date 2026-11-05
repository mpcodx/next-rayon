import { Lightbulb, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalloutType = "tip" | "info" | "warning" | "takeaway"

interface BlogCalloutProps {
  type: CalloutType
  title?: string
  text: string
}

const config = {
  tip: {
    icon: Lightbulb,
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/30",
    text: "text-emerald-300",
    defaultTitle: "Pro Tip / Best Practice",
  },
  info: {
    icon: Info,
    border: "border-sky-500/30",
    bg: "bg-sky-950/30",
    text: "text-sky-300",
    defaultTitle: "Architecture Note",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/30",
    bg: "bg-amber-950/30",
    text: "text-amber-300",
    defaultTitle: "Common Pitfall to Avoid",
  },
  takeaway: {
    icon: CheckCircle,
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/30",
    text: "text-cyan-300",
    defaultTitle: "Actionable Benchmark",
  },
}

export default function BlogCallout({ type, title, text }: BlogCalloutProps) {
  const item = config[type] || config.info
  const Icon = item.icon

  return (
    <aside
      className={cn(
        "my-6 rounded-xl border p-5 backdrop-blur-sm",
        item.border,
        item.bg,
      )}
    >
      <div className={cn("flex items-center gap-2 font-semibold text-sm mb-2", item.text)}>
        <Icon className="h-4 w-4 shrink-0" />
        <span>{title || item.defaultTitle}</span>
      </div>
      <p className="text-gray-200 text-sm leading-relaxed">{text}</p>
    </aside>
  )
}
