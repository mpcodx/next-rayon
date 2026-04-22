"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export const projectCategories = [
  "All",
  "Web Development",
  "Product Owner",
]

export type ProjectCategory = (typeof projectCategories)[number]

type ProjectsFilterProps = {
  onCategoryChange: (category: ProjectCategory) => void
}

export default function ProjectsFilter({ onCategoryChange }: ProjectsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All")

  const handleCategoryClick = (category: ProjectCategory) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-3 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
