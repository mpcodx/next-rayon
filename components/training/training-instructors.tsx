"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Cloud, Code, Zap, Brain, Lock } from "lucide-react"

const instructors = [
  {
    name: "Manpreet Singh",
    role: "Python, Django, DevOps & Docker Expert",
    bio: "Builds and deploys production-ready platforms using Django architecture, Docker workflows, and cloud DevOps practices.",
    initials: "MS",
    icon: Cloud,
    specialties: ["Python", "Django", "Docker"],
    social: {
      linkedin: "https://www.linkedin.com/in/er-manpreet-singh-0a5a7a192/",
    },
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    name: "Arshpreet Singh",
    role: "Python & Django Backend Expert",
    bio: "Specializes in backend engineering, API architecture, database design, and scalable Django service development.",
    initials: "AS",
    icon: Code,
    specialties: ["Python", "Django", "Backend APIs"],
    social: {
      linkedin: "https://www.linkedin.com/in/arshpreet-singh-4a7b7a192/",
    },
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    name: "Ajay Kumar",
    role: "AI/ML & Full Static Developer",
    bio: "Builds fast static websites and applies AI/ML integrations for intelligent user experiences and workflow automation.",
    initials: "AK",
    icon: Zap,
    specialties: ["Static Web", "AI Integrations", "Performance"],
    social: {
      linkedin: "https://linkedin.com/in/ajay-kumar",
    },
    gradient: "from-indigo-600 to-violet-600",
  },
  {
    name: "Anusha Agarwal",
    role: "Cybersecurity Expert",
    bio: "Guides learners on secure development, application security testing, risk analysis, and modern threat defense.",
    initials: "AA",
    icon: Lock,
    specialties: ["App Security", "Threat Modeling", "VAPT"],
    social: {
      linkedin: "https://linkedin.com/in/anusha-agarwal",
    },
    gradient: "from-emerald-600 to-cyan-600",
  },
  {
    name: "Sandeep Verma",
    role: "MEAN & MERN Stack Expert",
    bio: "Mentors developers on MongoDB, Express, Angular/React, and Node.js with a strong focus on real-world products.",
    initials: "SV",
    icon: Brain,
    specialties: ["MongoDB", "MEAN", "MERN"],
    social: {
      linkedin: "https://linkedin.com/in/sandeep-verma",
    },
    gradient: "from-amber-600 to-orange-600",
  },
]

export default function TrainingInstructors() {
  return (
    <section className="py-24 bg-slate-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-cyan-400/40 text-cyan-300 bg-cyan-500/10">
            Instructor Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Your Training Mentors</h2>
          <p className="text-xl text-gray-300/90 max-w-3xl mx-auto">
            Learn directly from practitioners who build, secure, and scale modern software systems every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="glass-card rounded-xl overflow-hidden h-full flex flex-col">
                {/* Avatar Section */}
                <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${instructor.gradient} flex items-center justify-center group`}>
                  <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Main Avatar Circle */}
                    <motion.div
                      className="relative w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 shadow-2xl"
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="mb-2"
                        >
                          <instructor.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </motion.div>
                        {/* Initials */}
                        <span className="text-2xl font-bold text-white text-center">{instructor.initials}</span>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                    ></motion.div>
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                  {/* LinkedIn Icon on Hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={instructor.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all duration-300 border border-white/30"
                      aria-label={`${instructor.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-1">{instructor.name}</h3>
                  <p className="text-cyan-300 text-sm mb-3">{instructor.role}</p>
                  <p className="text-gray-300/85 text-sm mb-4 flex-grow">{instructor.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="bg-slate-800/80 text-gray-200 border border-white/10 text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
