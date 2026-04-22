import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { featuredProjects } from "@/lib/projects-data"

export default function RecentProjects() {
  return (
    <section className="py-24 bg-slate-950/35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-4">
              Selected Work
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Recent <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-300/85 max-w-2xl">
              Explore delivery quality across web products, enterprise workflows, and platform modernization engagements.
            </p>
          </div>

          <div>
            <Link href="/projects">
              <Button variant="outline" className="group rounded-full border-white/20 hover:bg-white/[0.08]">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="group"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <article className="rounded-2xl overflow-hidden glass-card border border-white/15 hover:border-cyan-400/35 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-cyan-500/90 rounded-full text-xs font-medium text-white">
                      {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300/85 mb-5 flex-grow">{project.summary}</p>
                    <div className="flex items-center text-cyan-300 font-medium group">
                      <span>View Project</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
