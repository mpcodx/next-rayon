"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    if (window.location.hash) return

    // Force scroll to top on route change (helps when the previous page was scrolled down).
    // Also temporarily disable smooth scrolling so it doesn't animate from the bottom.
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior

    root.style.scrollBehavior = "auto"
    window.scrollTo({ top: 0, left: 0 })
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0 })
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    })

    const restoreId = window.setTimeout(() => {
      root.style.scrollBehavior = previousScrollBehavior
    }, 0)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(restoreId)
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [pathname, search])

  return null
}
