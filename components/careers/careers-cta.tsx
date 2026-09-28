"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Clock, Copy, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function CareersCTA() {
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hr@rayonweb.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const handleGeneralSubmitClick = () => {
    setIsModalOpen(true)
    toast({
      title: "Openings Currently Closed",
      description: "Right now openings are closed. Stay in touch, we will be back soon!",
      variant: "destructive",
    })
  }

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
          className="relative rounded-3xl overflow-hidden border border-rose-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-gray-950/90 z-0"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 py-16 px-8 md:py-24 md:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Applications Closed • Stay in Touch
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
              Ready to Build the Future with <span className="gradient-text">Rayon Web?</span>
            </h2>

            <p className="text-base sm:text-lg font-bold text-rose-300 max-w-2xl mx-auto mb-4">
              &ldquo;Right now openings are closed. Stay in touch, we will be back soon!&rdquo;
            </p>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you're graduating this year or preparing for your next engineering leap, share your resume to stay in touch for our upcoming hiring drive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToOpenings}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-purple-600/30 font-medium"
              >
                View 4 Career Tracks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={handleGeneralSubmitClick}
                variant="outline"
                className="group px-8 py-6 text-base rounded-full border-gray-700 hover:bg-gray-800 text-white flex items-center gap-2"
              >
                <span>Submit General Application</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Closed
                </span>
              </Button>

              <a
                href="mailto:hr@rayonweb.com?subject=Future%20Resume%20Submission%20-%20Rayon%20Web%20Solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm text-purple-400 hover:text-purple-300 underline font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Or email hr@rayonweb.com directly</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Modal Dialog for Closed Notice */}
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[540px] bg-gray-950/95 backdrop-blur-xl border border-rose-500/30 text-white shadow-2xl p-6 sm:p-8">
              <DialogHeader className="text-center sm:text-center items-center">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-3 shadow-lg shadow-rose-500/10">
                  <Clock className="h-7 w-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  Applications Closed
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-white text-center">
                  General Application
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-xs sm:text-sm text-center">
                  Early Career Application Status
                </DialogDescription>
              </DialogHeader>

              {/* Prominent Tagline Highlight */}
              <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-950/50 via-purple-950/40 to-gray-900 border border-rose-500/30 text-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
                <p className="text-[11px] uppercase tracking-widest font-bold text-rose-400 mb-1.5">Official Update</p>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  &ldquo;Right now openings are closed. Stay in touch, we will be back soon!&rdquo;
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-gray-300 text-center leading-relaxed">
                <p>
                  Thank you for reaching out to <span className="text-white font-semibold">Rayon Web Solutions</span>. Our active recruitment drive is currently closed.
                </p>
                <p className="text-gray-400 text-xs">
                  Stay in touch with us! Drop your resume directly at{" "}
                  <a href="mailto:hr@rayonweb.com" className="text-purple-400 underline font-medium hover:text-purple-300">
                    hr@rayonweb.com
                  </a>{" "}
                  so we can notify you as soon as upcoming roles go live.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-4 border-t border-gray-800">
                <Button
                  type="button"
                  onClick={handleCopyEmail}
                  variant="outline"
                  className="w-full sm:w-1/2 border-gray-700 hover:bg-gray-800 text-gray-200 text-xs sm:text-sm"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400 mr-1.5" />
                      <span className="text-emerald-400">Copied hr@rayonweb.com</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1.5" />
                      <span>Copy HR Email</span>
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm"
                >
                  Got It, Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
