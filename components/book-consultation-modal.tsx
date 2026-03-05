"use client"

import React, { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Calendar, Clock, User, Briefcase, CheckCircle } from "lucide-react"

interface BookConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

export default function BookConsultationModal({ isOpen, onClose, initialService = "" }: BookConsultationModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: initialService,
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const services = [
    { value: "Web Development", label: "Web Development" },
    { value: "App Development", label: "App Development" },
    { value: "DevOps & Cloud", label: "DevOps & Cloud" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "LMS & Integration", label: "LMS & Integration" },
    { value: "QA & Automation", label: "QA & Automation" },
    { value: "AI & Machine Learning", label: "AI & Machine Learning" },
    { value: "Freelance", label: "Freelance" },
  ]

  const resetModalState = useCallback(() => {
    setStep(1)
    setError("")
    setIsLoading(false)
    setIsSubmitted(false)
    setForm({ name: "", email: "", phone: "", company: "", service: initialService || "", message: "" })
  }, [initialService])

  const handleClose = useCallback(() => {
    resetModalState()
    onClose()
  }, [onClose, resetModalState])

  useEffect(() => {
    if (!isOpen) return

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onEscape)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onEscape)
    }
  }, [isOpen, handleClose])

  useEffect(() => {
    setForm((prev) => ({ ...prev, service: initialService || "" }))
  }, [initialService])

  const validateStep = () => {
    if (step === 1) {
      return form.name.trim() !== "" && form.email.includes("@")
    }
    if (step === 2) {
      return form.service.trim() !== ""
    }
    if (step === 3) {
      return form.message.trim() !== ""
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setError("")
      setStep(step + 1)
    } else {
      setError("Please fill in all required fields")
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) {
      setError("Please fill in all fields correctly.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const payload = {
        subject: `Consultation Request - ${form.service}`,
        message: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\nCompany: ${form.company || "Not provided"}\nService: ${form.service}\n\nMessage:\n${form.message}`,
        name: form.name,
        email: form.email,
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData?.message || "Something went wrong.")
      }

      setIsSubmitted(true)
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                type="button"
                aria-label="Close consultation modal"
                className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>

              {isSubmitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full py-20 px-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-6 border border-green-500/40"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">Consultation Request Sent!</h3>
                  <p className="text-gray-400 text-center">
                    Thank you! We've received your request and will contact you soon at <span className="text-purple-400 font-semibold">{form.email}</span>
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="border-b border-gray-700 px-6 py-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Book a Consultation</h2>
                    <p className="text-gray-400 text-sm">Let's discuss your project and find the perfect solution</p>
                    <p className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200">
                      Need freelance support? Send your query to info@rayonweb.com
                    </p>

                    {/* Progress Indicator */}
                    <div className="flex gap-2 mt-4">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={false}
                          animate={{
                            backgroundColor: step >= i ? "rgb(139, 92, 246)" : "rgb(55, 65, 81)",
                          }}
                          className="flex-1 h-1 rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <form onSubmit={handleSubmit} className="p-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Contact Info */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                            <User className="w-5 h-5 text-purple-500" />
                            Your Information
                          </h3>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                            <Input
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="John Doe"
                              className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <Input
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="john@example.com"
                              className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                            <Input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="+1 (555) 000-0000"
                              className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                            <Input
                              value={form.company}
                              onChange={(e) => setForm({ ...form, company: e.target.value })}
                              placeholder="Your Company"
                              className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Service Selection */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                            <Briefcase className="w-5 h-5 text-purple-500" />
                            What Service Interests You?
                          </h3>

                          <div className="grid grid-cols-2 gap-3">
                            {services.map((svc) => (
                              <motion.button
                                key={svc.value}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setForm({ ...form, service: svc.value })}
                                className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                                  form.service === svc.value
                                    ? "border-purple-500 bg-purple-500/10 text-white"
                                    : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                                }`}
                              >
                                {svc.label}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Message */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                            <Calendar className="w-5 h-5 text-purple-500" />
                            Tell Us More About Your Project
                          </h3>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
                            <Textarea
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              placeholder="Describe your project, timeline, budget, and any specific requirements..."
                              className="bg-gray-800 border-gray-600 text-white placeholder-gray-500 min-h-[150px]"
                            />
                          </div>

                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <p className="text-sm text-blue-300 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              We'll respond to your inquiry within 24 hours
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Footer Buttons */}
                    <div className="flex gap-3 mt-8">
                      {step > 1 && (
                        <Button
                          type="button"
                          onClick={handleBack}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                        >
                          Back
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!validateStep()}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isLoading || !validateStep()}
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white disabled:opacity-50"
                        >
                          {isLoading ? "Sending..." : "Submit Request"}
                        </Button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
