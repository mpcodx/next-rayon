"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, MapPin, ExternalLink, QrCode, Smartphone, CheckCircle2, ShieldCheck } from "lucide-react"

export const GOOGLE_BUSINESS_PROFILE_URL =
  "https://local.google.com/place?placeid=ChIJ9ebiu1vvDzkRJuFZfoCgzko&utm_medium=noren&utm_source=gbp&utm_campaign=2026"

interface CheckUsOutOnGoogleProps {
  className?: string
  compact?: boolean
}

export default function CheckUsOutOnGoogle({ className = "", compact = false }: CheckUsOutOnGoogleProps) {
  if (compact) {
    return (
      <div className={`glass-card rounded-2xl border border-white/15 p-6 relative overflow-hidden ${className}`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative h-32 w-32 shrink-0 rounded-2xl overflow-hidden bg-white p-2 shadow-lg">
            <Image
              src="/google-qr-code.png"
              alt="Scan to check out Rayon Web Solutions on Google"
              fill
              sizes="128px"
              className="object-contain p-1"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 font-medium mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              Verified Google Business Profile
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Check us out on Google</h3>
            <p className="text-sm text-gray-300 mb-4">
              Scan the QR code with your phone or visit our Google page to view reviews, photos, and directions.
            </p>
            <Link
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>View Google Profile</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`py-12 relative overflow-hidden ${className}`} id="google-reviews">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl border border-white/15 p-8 sm:p-12 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 h-96 w-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-96 w-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-blue-300">
                <span className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <span>Verified Google Business Profile</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Check us out on <span className="gradient-text">Google</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                Scan our official Google QR code with your smartphone or click below to discover our verified client reviews, corporate headquarters in Mohali, and product engineering portfolio.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>5.0 Star Client Rating</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Verified Mohali Headquarters</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <Smartphone className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>Instant Mobile Scan</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <ShieldCheck className="h-4 w-4 text-teal-400 shrink-0" />
                  <span>Authentic Verified Reviews</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={GOOGLE_BUSINESS_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Open on Google Maps</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>

                <a
                  href="/google-qr-code.png"
                  download="Rayon-Web-Solutions-Google-QR.png"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gray-200 hover:text-white hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all"
                >
                  <QrCode className="h-4 w-4 text-cyan-300" />
                  <span>Download QR Code</span>
                </a>
              </div>
            </div>

            {/* Right Card Column (The Official Hexagon QR Badge) */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group max-w-sm w-full"
              >
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />

                <div className="relative rounded-2xl overflow-hidden glass-card border border-white/20 p-4 sm:p-6 shadow-2xl flex flex-col items-center">
                  <div className="relative w-full max-w-[280px] aspect-[900/993]">
                    <Image
                      src="/google-check-us-out-card.png"
                      alt="Check us out on Google - Rayon Web Solutions official QR Code"
                      fill
                      priority
                      sizes="(max-width: 640px) 240px, 280px"
                      className="object-contain"
                    />
                  </div>

                  <p className="mt-3 text-xs text-gray-400 text-center flex items-center gap-1.5">
                    <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Point phone camera at QR code to open</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
