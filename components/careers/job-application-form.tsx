"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"

interface JobApplicationFormProps {
  jobTitle: string
  onClose: () => void
}

export default function JobApplicationForm({ jobTitle, onClose }: JobApplicationFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare JSON payload instead of FormData
      const payload = {
        subject: `Job Application for ${jobTitle}`,
        message: `Name: ${formData.name}\nPhone: ${formData.phone}\nResume: ${formData.resumeLink}\n\nCover Letter:\n${formData.coverLetter}`,
        name: formData.name,
        email: formData.email, // optional reply-to
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
        throw new Error(errorData?.message || "Failed to send email")
      }

      setIsSubmitted(true)
      toast({
        title: "Application Submitted",
        description:
          "Your application has been successfully submitted. We'll be in touch soon!",
      })

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          resumeLink: "",
          coverLetter: "",
        })
        setIsSubmitted(false)
        setIsSubmitting(false)
        onClose()
      }, 2000)
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Submission Failed",
        description:
          error?.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-center text-gray-400 mb-4">
          Thank you for applying for the {jobTitle} position. We'll review your application and get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={handleChange}
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          required
          value={formData.email}
          onChange={handleChange}
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resumeLink">Resume Link (Google Drive, Dropbox, etc.)</Label>
        <Input
          id="resumeLink"
          name="resumeLink"
          placeholder="https://drive.google.com/your-resume"
          value={formData.resumeLink}
          onChange={handleChange}
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter / Additional Information</Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
          rows={5}
          value={formData.coverLetter}
          onChange={handleChange}
          className="bg-background/50"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-blue-600">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </form>
  )
}
