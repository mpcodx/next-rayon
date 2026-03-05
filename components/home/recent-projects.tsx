"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "E-commerce Platform",
    category: "Web Development",
    description: "Conversion-focused commerce platform with catalog management, custom checkout, and secure payment integration.",
    image: "/projects/p1.png?height=600&width=800",
    href: "/projects/ecommerce-platform",
  },
  {
    title: "Quizzes Platform",
    category: "UI/UX Design",
    description: "Interactive quizzes product with modern UX, seamless payments, and scalable management workflows.",
    image: "/projects/p8.png?height=600&width=800",
    href: "/projects/health-fitness-app",
  },
  {
    title: "Learning Management System",
    category: "LMS & Integration",
    description: "Custom LMS enabling course delivery, student lifecycle management, and integrated billing operations.",
    image: "/projects/p6.png?height=600&width=800",
    href: "/projects/learning-management-system",
  },
]

export default function RecentProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-950/35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-4"
            >
              Selected Work
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Recent <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xl text-gray-300/85 max-w-2xl"
            >
              Explore delivery quality across web products, enterprise workflows, and platform modernization engagements.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Link href="/projects">
              <Button variant="outline" className="group rounded-full border-white/20 hover:bg-white/[0.08]">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <Link href={project.href} className="block">
                <article className="rounded-2xl overflow-hidden glass-card border border-white/15 hover:border-cyan-400/35 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={`object-cover transition-transform duration-500 ${hoveredIndex === index ? "scale-105" : "scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-cyan-500/90 rounded-full text-xs font-medium text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                    <p className="text-gray-300/85 mb-5 flex-grow">{project.description}</p>
                    <div className="flex items-center text-cyan-300 font-medium group">
                      <span>View Project</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
