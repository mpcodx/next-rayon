"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BlogCategoriesProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function BlogCategories({ categories, activeCategory, onCategoryChange }: BlogCategoriesProps) {
  return (
    <section className="py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm border transition-colors",
                activeCategory === category
                  ? "border-cyan-400/45 bg-cyan-500/15 text-cyan-200"
                  : "border-white/15 bg-white/[0.03] text-gray-300 hover:text-white hover:border-white/30",
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
