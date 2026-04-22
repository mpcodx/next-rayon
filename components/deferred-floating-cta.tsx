"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const FloatingCTA = dynamic(() => import("@/components/floating-cta"), {
  ssr: false,
  loading: () => null,
})

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
    cancelIdleCallback?: (handle: number) => void
  }

export default function DeferredFloatingCTA() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const idleWindow = window as IdleWindow
    const load = () => setIsReady(true)
    const handle = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(load, { timeout: 4500 })
      : window.setTimeout(load, 3500)

    return () => {
      if (idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle)
      }
    }
  }, [])

  return isReady ? <FloatingCTA /> : null
}
