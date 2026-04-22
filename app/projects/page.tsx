"use client"

import { useState } from "react"
import ProjectsHero from "@/components/projects/projects-hero"
import ProjectsFilter, { type ProjectCategory } from "@/components/projects/projects-filter"
import ProjectsGrid from "@/components/projects/projects-grid"
import ProjectsCta from "@/components/projects/projects-cta"

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All")

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <ProjectsHero />
      <ProjectsFilter onCategoryChange={handleCategoryChange} />
      <ProjectsGrid activeCategory={activeCategory} />
      <ProjectsCta />
    </main>
  )
}
