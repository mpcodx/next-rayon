import Link from "next/link"
import { Award, ExternalLink, UserCheck } from "lucide-react"
import { BlogAuthor } from "@/lib/blog-data"

interface BlogAuthorCardProps {
  author: BlogAuthor
}

export default function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  if (!author) return null

  return (
    <div className="glass-card rounded-2xl border border-white/15 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
          <UserCheck className="h-4 w-4 text-cyan-400" />
          Expert Contributor
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
          <Award className="h-3 w-3" />
          Verified Author
        </span>
      </div>

      <p className="text-base font-semibold text-white">{author.name}</p>
      <p className="text-xs text-cyan-300 font-medium mt-0.5">{author.role}</p>

      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-3">{author.bio}</p>

      {author.knowsAbout && author.knowsAbout.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-[11px] font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Areas of Expertise
          </p>
          <div className="flex flex-wrap gap-1.5">
            {author.knowsAbout.map((topic) => (
              <span
                key={topic}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {author.sameAs && author.sameAs.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <ul className="space-y-1">
            {author.sameAs.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <span>Professional Profile</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
