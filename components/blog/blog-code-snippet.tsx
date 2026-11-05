"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

interface BlogCodeSnippetProps {
  language: string
  filename?: string
  code: string
}

export default function BlogCodeSnippet({ language, filename, code }: BlogCodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="my-6 rounded-xl border border-white/15 bg-slate-950 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-gray-300">{filename || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed bg-black/40">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
