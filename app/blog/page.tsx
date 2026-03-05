"use client"

import { useState } from "react"
import BlogHero from "@/components/blog/blog-hero"
import BlogCategories from "@/components/blog/blog-categories"
import BlogGrid from "@/components/blog/blog-grid"
import BlogNewsletter from "@/components/blog/blog-newsletter"
import { blogCategories } from "@/lib/blog-data"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="min-h-screen">
      <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <BlogCategories
        categories={blogCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      <BlogNewsletter />
    </main>
  )
}
