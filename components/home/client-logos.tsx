"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

const clients = [
  { name: "AWS", logo: "/aws-cloud.svg?height=80&width=160" },
  { name: "Client 2", logo: "/download.png?height=80&width=160" },
  { name: "Lenovo", logo: "/lenovo-service-centre.jpg?height=80&width=160" },
  { name: "Client 4", logo: "/rKXaODLl_400x400.jpg?height=80&width=160" },
  { name: "Client 5", logo: "/touchicon-180.png?height=80&width=160" },
  { name: "Client 6", logo: "/unnamed.png?height=80&width=160" },
]

export default function ClientLogos() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isMobile) {
      container.classList.add("animate-scroll-slow")
    } else {
      container.classList.add("animate-scroll")
    }

    return () => {
      container.classList.remove("animate-scroll", "animate-scroll-slow")
    }
  }, [isMobile])

  return (
    <section className="py-20 bg-slate-950/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-4">
            Trusted Partnerships
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Trusted by <span className="gradient-text">Leading Companies</span>
          </h2>
          <p className="text-xl text-gray-300/85 max-w-3xl mx-auto">
            Teams across industries trust Rayon Web Solutions for stable delivery and long-term engineering support.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex space-x-12 py-8 logo-scroll-container"
            style={{
              willChange: "transform",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-20 w-40 glass-card rounded-xl border border-white/15 p-4"
                style={{ willChange: "opacity, transform" }}
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}

            {clients.map((client, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-20 w-40 glass-card rounded-xl border border-white/15 p-4"
                style={{ willChange: "opacity, transform" }}
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#030712] to-transparent z-10" />
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#030712] to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
