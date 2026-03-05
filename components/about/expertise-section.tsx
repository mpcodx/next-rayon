"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Cloud, Zap } from "lucide-react"

const expertise = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Modern web & mobile apps built with cutting-edge technologies",
    skills: ["React", "Next.js", "Node.js", "Python", "TypeScript"],
  },
  {
    icon: Palette,
    title: "Design & UX/UI",
    description: "Beautiful, user-centered designs that drive conversions",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable infrastructure and deployment solutions",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Cloud Architecture"],
  },
  {
    icon: Zap,
    title: "AI & Automation",
    description: "Intelligent solutions that streamline your business processes",
    skills: ["Machine Learning", "AI Integration", "Automation", "Data Analytics", "APIs"],
  },
]

export default function ExpertiseSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive technical solutions across multiple domains to meet your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertise.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group glass-card rounded-xl p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
                    <Icon className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300 group-hover:bg-purple-600/30 group-hover:border-purple-500/50 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
