"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Github, Code2, Palette, Lock, Cloud, Briefcase, Zap } from "lucide-react"

const team = [
  {
    name: "Arshpreet Singh",
    position: "Python & Django Backend Expert",
    bio: "Arshpreet builds stable backend systems with Django, API architecture, and database-driven workflows for scalable products.",
    initials: "AS",
    icon: Code2,
    gradient: "from-blue-600 to-cyan-600",
    social: {
      linkedin: "https://www.linkedin.com/in/arshpreet-singh-4a7b7a192/",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Manpreet Singh",
    position: "Python, Django, DevOps & Docker Expert",
    bio: "Manpreet focuses on production deployment architecture with Python, Django, Docker, and DevOps automation best practices.",
    initials: "MS",
    icon: Cloud,
    gradient: "from-purple-600 to-pink-600",
    social: {
      linkedin: "https://www.linkedin.com/in/er-manpreet-singh-0a5a7a192/",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Ritika Sharma",
    position: "Creative Director",
    bio: "Ritika brings a flair for innovative UI/UX design and brand storytelling, ensuring every project is visually compelling and user-centric.",
    initials: "RS",
    icon: Palette,
    gradient: "from-rose-600 to-orange-600",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Ankit Verma",
    position: "Head of Development",
    bio: "Ankit leads the development team with precision, delivering scalable solutions using modern frameworks with a focus on performance and maintainability.",
    initials: "AV",
    icon: Zap,
    gradient: "from-amber-600 to-yellow-600",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Ajay Kumar",
    position: "AI/ML & Full Static Developer",
    bio: "Ajay combines static web engineering with AI/ML implementation to deliver fast, intelligent user experiences.",
    initials: "AK",
    icon: Briefcase,
    gradient: "from-green-600 to-emerald-600",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Anusha Agarwal",
    position: "Cybersecurity Expert",
    bio: "Anusha ensures our systems and products are secure, compliant, and resilient, with deep expertise in ethical hacking, threat analysis, and cloud security.",
    initials: "AA",
    icon: Lock,
    gradient: "from-red-600 to-rose-600",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Priya Nair",
    position: "DevOps Lead",
    bio: "Priya ensures seamless deployments, robust infrastructure, and high availability across all environments through her expertise in cloud platforms and automation tools.",
    initials: "PN",
    icon: Cloud,
    gradient: "from-indigo-600 to-purple-600",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Rajeev Kumar",
    position: "Project Manager",
    bio: "Rajeev coordinates client communication, timelines, and resource allocation, ensuring every project is delivered on time and meets the highest standards.",
    initials: "RK",
    icon: Briefcase,
    gradient: "from-teal-600 to-cyan-600",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];



export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our talented team of experts is passionate about creating innovative digital solutions that drive business
            success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
            <div className="glass-card rounded-xl overflow-hidden h-full">
                <div className={`relative h-80 overflow-hidden bg-gradient-to-br ${member.gradient} flex items-center justify-center group`}>
                  {/* Avatar Section */}
                  <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Main Avatar Circle */}
                    <motion.div
                      className="relative w-40 h-40 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 shadow-2xl"
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="mb-2"
                        >
                          <member.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                        </motion.div>
                        {/* Initials */}
                        <span className="text-4xl font-bold text-white text-center">{member.initials}</span>
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

                  {/* Social icons on Hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all duration-300 border border-white/30"
                    >
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all duration-300 border border-white/30"
                    >
                      <Twitter className="h-5 w-5 text-white" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-all duration-300 border border-white/30"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-400 mb-4">{member.position}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
