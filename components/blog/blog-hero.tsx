"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface BlogHeroProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  return (
    <section className="relative pt-24 pb-14 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-64 w-64 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-indigo-500/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-8 sm:p-10 border border-white/15"
        >
          <p className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-5">
            Engineering Insights
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">
            Latest from Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Practical guides on web, mobile, cloud, AI, and delivery strategy. Written for teams shipping real
            products.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search articles, topics, or keywords..."
              className="pl-11 h-12 bg-slate-900/70 border-white/20 text-white placeholder:text-gray-400"
              aria-label="Search blog articles"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
