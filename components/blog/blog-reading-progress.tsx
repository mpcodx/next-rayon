"use client"

import { useEffect, useState } from "react"

export default function BlogReadingProgress() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollY / docHeight) * 100))
        setCompletion(percentage)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 transition-[width] duration-75"
        style={{ width: `${completion}%` }}
      />
    </div>
  )
}
