"use client"

import { useState } from "react"
import { Check, Copy, Share2 } from "lucide-react"

interface BlogShareButtonsProps {
  url: string
  title: string
}

export default function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
      <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 mr-2">
        <Share2 className="h-3.5 w-3.5 text-cyan-400" />
        Share:
      </span>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:border-cyan-400/40 transition-colors"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400">Link copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:border-cyan-400/40 transition-colors"
      >
        <span>X / Twitter</span>
      </a>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:border-cyan-400/40 transition-colors"
      >
        <span>LinkedIn</span>
      </a>
    </div>
  )
}
