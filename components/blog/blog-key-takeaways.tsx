import { Sparkles, CheckCircle2 } from "lucide-react"

interface BlogKeyTakeawaysProps {
  takeaways: string[]
}

export default function BlogKeyTakeaways({ takeaways }: BlogKeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <section
      aria-label="Executive Key Takeaways"
      className="key-takeaways my-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-950/80 p-6 sm:p-7 shadow-lg shadow-cyan-950/20 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2.5 text-cyan-300 font-semibold text-lg mb-4">
        <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <span>Key Takeaways & Executive Summary (TL;DR)</span>
      </div>

      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-200 leading-relaxed text-sm sm:text-base">
            <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
