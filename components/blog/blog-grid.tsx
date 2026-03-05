"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

interface BlogGridProps {
  activeCategory: string
  searchQuery: string
}

export default function BlogGrid({ activeCategory, searchQuery }: BlogGridProps) {
  const query = searchQuery.trim().toLowerCase()

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch = activeCategory === "All" || post.category === activeCategory
    const queryMatch =
      query.length === 0 ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    return categoryMatch && queryMatch
  })

  if (filteredPosts.length === 0) {
    return (
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl border border-white/15 p-10 text-center">
            <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
            <p className="text-gray-400">Try changing category or search with a different keyword.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl border border-white/15 overflow-hidden h-full flex flex-col hover:border-cyan-400/35 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="relative h-56 block overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-cyan-400/30 bg-slate-950/70 px-3 py-1 text-xs text-cyan-200">
                  {post.category}
                </span>
              </Link>

              <div className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-semibold leading-snug mb-3">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{post.excerpt}</p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 text-sm font-medium">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
