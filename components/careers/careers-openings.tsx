"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import JobApplicationForm from "@/components/careers/job-application-form"

const jobOpenings = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote Only",
    type: "Full-time",
    // salary: "$90,000 - $120,000",
    description:
      "We're looking for a Frontend Developer with strong React, Next.js, and modern UI engineering skills to build fast, polished web experiences.",
    href: "/careers/frontend-developer",
  },
  {
    title: "Backend AI/ML Developer",
    department: "Engineering",
    location: "Remote Only",
    type: "Full-time",
    // salary: "$85,000 - $110,000",
    description:
      "Join our backend AI/ML team to build scalable APIs, data workflows, model integrations, and production-ready intelligent features using Python.",
    href: "/careers/backend-ai-ml-developer",
  },
  {
    title: "DevOps Engineer",
    department: "Operations",
    location: "Remote Only",
    type: "Full-time",
    // salary: "$95,000 - $125,000",
    description: "Help us build and maintain cloud infrastructure, CI/CD pipelines, deployment automation, and monitoring systems.",
    href: "/careers/devops-engineer",
  },
]

export default function CareersOpenings() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  const handleOpenApplication = (index: number) => {
    setSelectedJob(index)
  }

  const handleCloseApplication = () => {
    setSelectedJob(null)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Open <span className="gradient-text">Positions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are currently hiring remote talent across frontend, backend AI/ML, and DevOps roles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOpenings.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass-card rounded-xl p-8 hover-neon-glow"
            >
              <div className="mb-4">
                <span className="px-3 py-1 bg-purple-500 bg-opacity-20 text-purple-400 rounded-full text-xs font-medium">
                  {job.department}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
              <p className="text-gray-400 mb-6">{job.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{job.type}</span>
                </div>
                {/* <div className="flex items-center text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{job.salary}</span>
                </div> */}
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white group"
                variant="outline"
                onClick={() => handleOpenApplication(index)}
              >
                <span>Apply Now</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        {selectedJob !== null && (
          <Dialog open={selectedJob !== null} onOpenChange={handleCloseApplication}>
            <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-sm border border-purple-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Apply for {jobOpenings[selectedJob].title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill out the form below to apply for this position. We'll get back to you as soon as possible.
                </DialogDescription>
              </DialogHeader>
              <JobApplicationForm jobTitle={jobOpenings[selectedJob].title} onClose={handleCloseApplication} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
