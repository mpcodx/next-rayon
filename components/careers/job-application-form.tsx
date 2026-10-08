"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, ExternalLink, Send, Sparkles, CheckCircle2, Loader2 } from "lucide-react"

interface JobApplicationFormProps {
  jobTitle: string
  onClose: () => void
}

const AVAILABLE_ROLES = [
  "Frontend Developer (Fresher)",
  "Python AI & ML Engineer (Fresher)",
  "DevOps Engineer (Fresher)",
  "Cybersecurity Specialist (Fresher)",
  "Other / General Application",
]

export default function JobApplicationForm({ jobTitle: initialJobTitle, onClose }: JobApplicationFormProps) {
  const { toast } = useToast()
  const [selectedRole, setSelectedRole] = useState(initialJobTitle || AVAILABLE_ROLES[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    graduationYear: "2025",
    resumeLink: "",
    portfolioLink: "",
    coverLetter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      const messageBody = [
        `Job Application for: ${selectedRole}`,
        ``,
        `--- Candidate Details ---`,
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `College / University: ${formData.college || "Not specified"}`,
        `Graduation Year: ${formData.graduationYear || "Not specified"}`,
        ``,
        `--- Links ---`,
        `Resume Link: ${formData.resumeLink || "Not provided"}`,
        `Portfolio / GitHub: ${formData.portfolioLink || "Not provided"}`,
        ``,
        `--- Cover Letter / Candidate Note ---`,
        formData.coverLetter || "No additional note provided.",
      ].join("\n")

      const payload = {
        subject: `Job Application: ${selectedRole} - ${formData.name}`,
        message: messageBody,
        name: formData.name,
        email: formData.email,
        replyTo: formData.email,
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData?.message || "Failed to send email")
      }

      setIsSubmitted(true)
      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Our recruitment team has received your application and will review it shortly.",
      })

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          college: "",
          graduationYear: "2025",
          resumeLink: "",
          portfolioLink: "",
          coverLetter: "",
        })
        setIsSubmitted(false)
        setIsSubmitting(false)
        onClose()
      }, 3000)
    } catch (error: any) {
      console.error(error)
      setSubmissionError(
        error?.message || "Unable to send online right now. You can also email hr@rayonweb.com directly with your resume."
      )
      toast({
        title: "Application Notice",
        description:
          "Please email your resume directly to hr@rayonweb.com if online submission does not reach.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const directEmailSubject = encodeURIComponent(`Job Application: ${selectedRole} - ${formData.name || "[Your Name]"}`)
  const directEmailBody = encodeURIComponent(
    `Hello Rayon HR Team,\n\nI would like to apply for the ${selectedRole} position.\n\nMy details:\n- Name: ${formData.name || ""}\n- Phone: ${formData.phone || ""}\n- College/Degree: ${formData.college || ""}\n- Graduation Year: ${formData.graduationYear || ""}\n- Resume Link: ${formData.resumeLink || ""}\n- Portfolio/GitHub: ${formData.portfolioLink || ""}\n\nPlease find my resume attached.\n\nBest regards,\n${formData.name || ""}`
  )

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white">Application Received! 🎉</h3>
        <p className="text-gray-300 max-w-md mb-4 text-sm leading-relaxed">
          Thank you for applying for the <span className="text-cyan-400 font-semibold">{selectedRole}</span> position. Our hiring team will review your profile and reach out via email or WhatsApp.
        </p>
        <p className="text-xs text-gray-400">
          Have additional questions? Email us anytime at{" "}
          <a href="mailto:hr@rayonweb.com" className="text-cyan-400 underline hover:text-cyan-300">
            hr@rayonweb.com
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2 max-h-[80vh] overflow-y-auto pr-1">
      {/* Active Application Notice Banner */}
      <div className="rounded-xl p-3.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm flex items-start gap-2.5">
        <Sparkles className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white">Actively Reviewing Applications: {selectedRole}</p>
          <p className="mt-0.5 text-xs text-cyan-200/90 font-medium">
            2024, 2025 &amp; 2026 Batch freshers welcome. Fill in your details below.
          </p>
        </div>
      </div>

      {/* Target Position Selection */}
      <div className="space-y-1.5">
        <Label htmlFor="roleSelect" className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Target Role
        </Label>
        <select
          id="roleSelect"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full h-10 px-3 rounded-md bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {AVAILABLE_ROLES.map((role) => (
            <option key={role} value={role} className="bg-gray-900 text-white">
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold text-gray-300">
            Full Name <span className="text-purple-400">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. Rahul Sharma"
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-gray-300">
            Email Address <span className="text-purple-400">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="rahul@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Phone and Graduation Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold text-gray-300">
            Phone / WhatsApp <span className="text-purple-400">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            required
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="graduationYear" className="text-xs font-semibold text-gray-300">
            Graduation Year <span className="text-purple-400">*</span>
          </Label>
          <select
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="2026">2026 (Final Year / Pursuing)</option>
            <option value="2025">2025 (Graduating / Passed)</option>
            <option value="2024">2024 (Graduate)</option>
            <option value="2023">2023 or Earlier</option>
          </select>
        </div>
      </div>

      {/* College / University */}
      <div className="space-y-1.5">
        <Label htmlFor="college" className="text-xs font-semibold text-gray-300">
          College / Degree
        </Label>
        <Input
          id="college"
          name="college"
          placeholder="e.g. B.Tech Computer Science, Chandigarh University"
          value={formData.college}
          onChange={handleChange}
          className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
        />
      </div>

      {/* Resume Link & GitHub / Portfolio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="resumeLink" className="text-xs font-semibold text-gray-300">
            Resume Link <span className="text-purple-400">*</span>
          </Label>
          <Input
            id="resumeLink"
            name="resumeLink"
            placeholder="Google Drive / Dropbox / Link"
            required
            value={formData.resumeLink}
            onChange={handleChange}
            className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
          />
          <span className="text-[11px] text-gray-400">Ensure the link has public view access.</span>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="portfolioLink" className="text-xs font-semibold text-gray-300">
            GitHub / Portfolio / LinkedIn
          </Label>
          <Input
            id="portfolioLink"
            name="portfolioLink"
            placeholder="https://github.com/username"
            value={formData.portfolioLink}
            onChange={handleChange}
            className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
          />
          <span className="text-[11px] text-gray-400">Showcase your projects or code samples.</span>
        </div>
      </div>

      {/* Cover Letter / Note */}
      <div className="space-y-1.5">
        <Label htmlFor="coverLetter" className="text-xs font-semibold text-gray-300">
          Why You'd Be a Great Fit / Key Projects
        </Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Tell us briefly about your favorite project, skills, and why you are excited to work with Rayon Web Solutions..."
          rows={3}
          value={formData.coverLetter}
          onChange={handleChange}
          className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 resize-none text-sm"
        />
      </div>

      {/* Direct Email Alternative Notice */}
      <div className="rounded-lg bg-purple-950/40 border border-purple-800/40 p-3 flex items-start gap-2.5 text-xs text-gray-300">
        <Mail className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="leading-snug">
          Prefer emailing your resume directly? Send an email to{" "}
          <a
            href={`mailto:hr@rayonweb.com?subject=${directEmailSubject}&body=${directEmailBody}`}
            className="text-purple-400 font-semibold underline hover:text-purple-300 inline-flex items-center gap-1"
          >
            hr@rayonweb.com
            <ExternalLink className="h-3 w-3 inline" />
          </a>{" "}
          with your resume attached.
        </div>
      </div>

      {/* Error or Fallback Message if Submission Fails */}
      {submissionError && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/70 via-gray-900 to-amber-950/70 border border-amber-500/40 text-center shadow-lg">
          <p className="text-xs font-semibold text-amber-300 mb-1">{submissionError}</p>
          <p className="text-xs text-gray-300">
            Please attach your resume and send an email directly to{" "}
            <a href={`mailto:hr@rayonweb.com?subject=${directEmailSubject}&body=${directEmailBody}`} className="text-cyan-400 underline font-semibold hover:text-cyan-300">
              hr@rayonweb.com
            </a>.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-cyan-600/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
