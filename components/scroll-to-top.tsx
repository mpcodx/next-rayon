"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return

    // Force scroll to top on route change (helps when the previous page was scrolled down).
    // Also temporarily disable smooth scrolling so it doesn't animate from the bottom.
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior

    root.style.scrollBehavior = "auto"
    window.scrollTo({ top: 0, left: 0 })

    const restoreId = window.setTimeout(() => {
      root.style.scrollBehavior = previousScrollBehavior
    }, 0)

    return () => {
      window.clearTimeout(restoreId)
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [pathname])

  return null
}
