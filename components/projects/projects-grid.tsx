"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects-data"

export default function ProjectsGrid({ activeCategory }) {
  // Filter projects based on the active category
  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  if (filteredProjects.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl border border-white/15 p-10 text-center">
            <h3 className="text-2xl font-semibold mb-2">No projects in this category yet</h3>
            <p className="text-gray-400 mb-6">
              We can share relevant examples on request and outline a delivery plan tailored to your goals.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-medium">
              {"Request examples ->"}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.summary}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-block text-purple-500 font-medium hover:text-purple-400 transition-colors"
                >
                  View Project →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
