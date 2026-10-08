"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import JobApplicationForm from "@/components/careers/job-application-form"

export default function CareersCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToOpenings = () => {
    document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-cyan-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-gray-950/90 z-0"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 py-16 px-8 md:py-24 md:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Actively Hiring Freshers • Open Now
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
              Ready to Build the Future with <span className="gradient-text">Rayon Web?</span>
            </h2>

            <p className="text-base sm:text-lg font-bold text-cyan-300 max-w-2xl mx-auto mb-4">
              Frontend Developer (Fresher) role is open now for 2024, 2025 &amp; 2026 Batch.
            </p>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you are graduating this year or preparing for your next engineering leap, submit your application directly online or share your resume with our recruitment team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-cyan-600/30 font-semibold"
              >
                Apply Online Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={scrollToOpenings}
                variant="outline"
                className="group px-8 py-6 text-base rounded-full border-gray-700 hover:bg-gray-800 text-white flex items-center gap-2"
              >
                <span>View Job Requirements</span>
              </Button>

              <a
                href="mailto:hr@rayonweb.com?subject=Job%20Application%3A%20Frontend%20Developer%20(Fresher)%20-%20Rayon%20Web%20Solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Or email hr@rayonweb.com directly</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Modal Dialog for Application */}
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[620px] bg-gray-950/95 backdrop-blur-xl border border-cyan-500/30 text-white shadow-2xl p-6">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Fresher / Early Career Application
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Join Our <span className="gradient-text">Engineering Team</span>
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-xs sm:text-sm">
                  Complete the application form below. Our technical recruitment team will review your profile and contact you within 48 hours.
                </DialogDescription>
              </DialogHeader>

              <JobApplicationForm
                jobTitle="Frontend Developer (Fresher)"
                onClose={() => setIsModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
