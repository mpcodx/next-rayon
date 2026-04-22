"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

const Scene3D = dynamic(() => import("@/components/home/hero-3d"), {
  ssr: false,
  loading: () => null,
})

const BookConsultationModal = dynamic(() => import("../contact/BookConsultationModal"), {
  ssr: false,
  loading: () => null,
})

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
    cancelIdleCallback?: (handle: number) => void
  }

export default function Hero() {
  const isMobile = useMobile()
  const [showScene, setShowScene] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setShowScene(false)
      return
    }

    const idleWindow = window as IdleWindow
    const load = () => setShowScene(true)
    const handle = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(load, { timeout: 2200 })
      : window.setTimeout(load, 1400)

    return () => {
      if (idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle)
      }
    }
  }, [isMobile])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(6,182,212,0.28),transparent_32%),radial-gradient(circle_at_32%_70%,rgba(59,130,246,0.18),transparent_36%)]" />
        {showScene ? <Scene3D /> : null}
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/35 via-slate-950/70 to-slate-950/95" />
      <div className="absolute top-10 left-8 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl z-[1]" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/18 blur-3xl z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-5">
              <Sparkles className="h-4 w-4 mr-2" />
              Software Engineering Partner for Growth Teams
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Professional Digital Products,
              <span className="gradient-text block mt-2">Built to Scale and Perform</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300/90 mb-7">
              Rayon Web Solutions delivers web platforms, mobile apps, AI features, and cloud infrastructure with
              production-grade quality, clear communication, and measurable business impact.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8 text-sm">
              <div className="flex items-center text-gray-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2" />
                End-to-end delivery ownership
              </div>
              <div className="flex items-center text-gray-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2" />
                Senior engineering guidance
              </div>
              <div className="flex items-center text-gray-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2" />
                Security and performance focus
              </div>
              <div className="flex items-center text-gray-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2" />
                Transparent sprint execution
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleOpenModal}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-7"
              >
                Book a Consultation
              </Button>

              <Link href="/services">
                <Button
                  variant="outline"
                  className="group rounded-full border-white/20 hover:bg-white/[0.08] px-7"
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/15">
            <h2 className="text-2xl font-semibold mb-5">Why Teams Choose Rayon</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl bg-slate-900/75 border border-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-cyan-300">80+</p>
                <p className="text-xs text-gray-400 mt-1">Projects Delivered</p>
              </div>
              <div className="rounded-2xl bg-slate-900/75 border border-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-cyan-300">6+</p>
                <p className="text-xs text-gray-400 mt-1">Core Service Domains</p>
              </div>
              <div className="rounded-2xl bg-slate-900/75 border border-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-cyan-300">24/7</p>
                <p className="text-xs text-gray-400 mt-1">Support Coverage</p>
              </div>
              <div className="rounded-2xl bg-slate-900/75 border border-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-cyan-300">Agile</p>
                <p className="text-xs text-gray-400 mt-1">Sprint Delivery</p>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 flex items-start">
              <ShieldCheck className="h-5 w-5 mt-0.5 mr-3 text-cyan-300" />
              <p className="text-sm text-gray-200">
                Architecture, security, and deployment standards are built into every project from day one.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2 animate-bounce">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </div>

      {showModal ? <BookConsultationModal showModal={showModal} onClose={handleCloseModal} /> : null}
    </section>
  )
}
