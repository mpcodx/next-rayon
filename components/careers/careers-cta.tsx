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
          className="relative rounded-3xl overflow-hidden border border-purple-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-gray-950/80 z-0"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-25 blur-3xl animate-pulse-slow"></div>
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full opacity-25 blur-3xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 py-16 px-8 md:py-24 md:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Fresher Hiring Drive Ongoing
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white leading-tight">
              Ready to Build the Future with <span className="gradient-text">Rayon Web?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you're graduating this year or ready for your first big engineering leap, we want to hear from you. Send us your resume today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToOpenings}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-purple-600/30 font-medium"
              >
                View 4 Fresher Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="group px-8 py-6 text-base rounded-full border-gray-700 hover:bg-gray-800 text-white"
              >
                Submit General Application
              </Button>

              <a
                href="mailto:hr@rayonweb.com?subject=Fresher%20Resume%20Submission%20-%20Rayon%20Web%20Solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm text-purple-400 hover:text-purple-300 underline font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Or email hr@rayonweb.com directly</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Modal Dialog for General Application */}
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[620px] bg-gray-950/95 backdrop-blur-xl border border-purple-500/30 text-white shadow-2xl p-6">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Fresher / Early Career Application
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Join Our <span className="gradient-text">Engineering Team</span>
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-xs sm:text-sm">
                  Fill out the form below or send your resume to{" "}
                  <a href="mailto:hr@rayonweb.com" className="text-purple-400 underline font-medium">
                    hr@rayonweb.com
                  </a>
                  . Our team typically responds within 2–3 business days.
                </DialogDescription>
              </DialogHeader>

              <JobApplicationForm
                jobTitle="Other / General Application"
                onClose={() => setIsModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
