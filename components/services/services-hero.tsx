"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BookConsultationModal from "../contact/BookConsultationModal"
import Link from "next/link"

export default function ServicesHero() {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-500/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/16 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center glass-card rounded-3xl p-8 sm:p-10 md:p-12"
        >
          <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200">
            End-to-End Digital Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-300/95 mb-4">
            Build, launch, and scale with a team that combines product thinking, engineering depth, and reliable
            delivery.
          </p>
          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-10">
            From web and app development to cloud, AI/ML, QA automation, and design systems, we provide practical
            solutions focused on measurable business outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-full"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-white/25 text-white hover:bg-white/10"
            >
              <Link href="/projects">See Our Work</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {[
              "Fast kickoff",
              "Transparent delivery",
              "Scalable architecture",
              "Post-launch support",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <BookConsultationModal showModal={showModal} onClose={handleCloseModal} />
    </section>
  )
}
