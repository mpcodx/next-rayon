"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [service, setService] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    return (
      form.name.trim() !== "" &&
      form.email.includes("@") &&
      form.subject.trim() !== "" &&
      service.trim() !== "" &&
      form.message.trim() !== ""
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      setError("Please fill in all fields correctly.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Send JSON instead of FormData
      const payload = {
        subject: `${form.subject} [Service: ${service}]`,
        message: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
        name: form.name,
        email: form.email, // optional reply-to
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
      setForm({ name: "", email: "", subject: "", message: "" })
      setService("")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-8"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/40"
          >
            <CheckCircle className="h-8 w-8 text-green-500" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-center">Message Sent Successfully!</h3>
          <p className="text-gray-400 text-center mb-2">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          {service === "Freelance" && (
            <p className="text-purple-300 text-center mb-6 text-sm">
              You can also send freelance queries to{" "}
              <a href="mailto:info@rayonweb.com" className="font-semibold underline">
                info@rayonweb.com
              </a>
            </p>
          )}
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-gray-400 text-sm mb-6">Fill out the form below and we'll get back to you within 24 hours</p>
          </motion.div>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 text-sm mb-4"
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 transition-colors"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="How can we help you?"
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 transition-colors"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                Service You're Interested In
              </label>
              <Select onValueChange={setService} value={service}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-purple-500 transition-colors">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">💻 Web Development</SelectItem>
                  <SelectItem value="App Development">📱 App Development</SelectItem>
                  <SelectItem value="DevOps & Cloud">☁️ DevOps & Cloud</SelectItem>
                  <SelectItem value="UI/UX Design">🎨 UI/UX Design</SelectItem>
                  <SelectItem value="LMS & Integration">📚 LMS & Integration</SelectItem>
                  <SelectItem value="QA & Automation">🧪 QA & Automation</SelectItem>
                  <SelectItem value="AI & Machine Learning">🤖 AI & Machine Learning</SelectItem>
                  <SelectItem value="Freelance">🚀 Freelance</SelectItem>
                  <SelectItem value="Other">📋 Other</SelectItem>
                </SelectContent>
              </Select>
              {service === "Freelance" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 text-sm text-purple-300 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20"
                >
                  Great. We provide freelance services as well. Please describe your requirements below or email{" "}
                  <a href="mailto:info@rayonweb.com" className="underline font-medium">
                    info@rayonweb.com
                  </a>
                  .
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={service === "Freelance" ? "Tell us about your freelance needs, skills required, project scope, timeline, and budget..." : "Tell us about your project or inquiry..."}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 transition-colors min-h-[150px]"
              />
            </motion.div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 font-semibold transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </>
      )}
    </motion.div>
  )
}
