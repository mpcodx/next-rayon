"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2, Mail, MapPin, Phone } from "lucide-react"
import { trainingContactDetails } from "@/lib/training-course-data"

type TrainingFormData = {
  name: string
  email: string
  phone: string
  course: string
  experience: string
  message: string
  date?: Date
  agreeToTerms: boolean
}

const initialFormData: TrainingFormData = {
  name: "",
  email: "",
  phone: "",
  course: "",
  experience: "",
  message: "",
  date: undefined,
  agreeToTerms: false,
}

export default function TrainingForm() {
  const [formData, setFormData] = useState<TrainingFormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof TrainingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date?: Date) => {
    setFormData((prev) => ({ ...prev, date }))
    setDatePickerOpen(false)
  }

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked === true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email.includes("@") || !formData.course || !formData.experience || !formData.agreeToTerms) {
      setError("Please fill in all required fields and agree to the terms.")
      return
    }

    setIsLoading(true)
    setError("")

    const payload = {
      subject: `Training Application: ${formData.course}`,
      message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "N/A"}
Course: ${formData.course}
Experience: ${formData.experience}
Preferred Start Date: ${formData.date ? format(formData.date, "PPP") : "Not selected"}
Message: ${formData.message || "N/A"}
      `,
      name: formData.name,
      email: formData.email,
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData?.message || "Failed to send request.")
      }

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData(initialFormData)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="apply" className="py-24 bg-slate-900/35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply for Training</h2>
            <p className="text-xl text-gray-300/90 max-w-3xl mx-auto">
              Share your goals and we will help you choose the right learning path.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card border border-emerald-400/30 rounded-2xl p-10 text-center"
            >
              <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-gray-300">
                Thank you for applying. Our training team will contact you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 items-start">
              <form onSubmit={handleSubmit} className="lg:col-span-2 glass-card rounded-3xl p-8 border border-white/15">
                {error && <p className="text-red-400 mb-4">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                      className="text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Preferred Course</Label>
                    <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-stack-web-development-bootcamp">Full-Stack Web Development Bootcamp</SelectItem>
                        <SelectItem value="mean-mern-stack-development">MEAN & MERN Stack Development</SelectItem>
                        <SelectItem value="static-web-jamstack-development">Static Web & Jamstack Development</SelectItem>
                        <SelectItem value="react-native-mobile-development">Mobile App Development with React Native</SelectItem>
                        <SelectItem value="devops-engineering-certification">DevOps Engineering Certification</SelectItem>
                        <SelectItem value="ui-ux-design-bootcamp">UI/UX Design Bootcamp</SelectItem>
                        <SelectItem value="ml-ai-fundamentals">Machine Learning & AI Fundamentals</SelectItem>
                        <SelectItem value="llm-development-with-langchain">LLM Development with LangChain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (No experience)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                        <SelectItem value="advanced">Advanced (Experienced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Start Date</Label>
                    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal border-white/20 hover:bg-white/[0.08]">
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Your Goals</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what role you are targeting and what you want to build after training..."
                    className="text-white min-h-[130px]"
                  />
                </div>

                <div className="flex items-start space-x-3 mb-6">
                  <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} className="mt-1" />
                  <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                    I agree to the terms and conditions and privacy policy.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                  disabled={!formData.agreeToTerms || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>

              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-5 border border-white/15">
                  <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Training Support</p>
                  <p className="text-sm text-gray-300">Need help choosing a track? Talk to our counselors.</p>
                </div>
                <div className="glass-card rounded-2xl p-5 border border-white/15">
                  <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Email</p>
                  <p className="text-sm text-gray-300 flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" />{trainingContactDetails.email}</p>
                </div>
                <div className="glass-card rounded-2xl p-5 border border-white/15">
                  <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Phone</p>
                  <p className="text-sm text-gray-300 flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-300" />{trainingContactDetails.phone}</p>
                </div>
                <div className="glass-card rounded-2xl p-5 border border-white/15">
                  <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Location</p>
                  <p className="text-sm text-gray-300 flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" />{trainingContactDetails.location}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
