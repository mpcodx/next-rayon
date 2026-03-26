import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects, getProjectBySlug } from "@/lib/projects-data"
import { buildPageMetadata, SITE_NAME } from "@/lib/seo"

type ProjectDetailPageProps = {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return buildPageMetadata({
    title: `${project.title} | ${SITE_NAME}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
    imageAlt: project.title,
  })
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <main className="min-h-screen pb-20">
      <section className="pt-24 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200">
            {"<- Back to Projects"}
          </Link>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <span className="inline-flex rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200 mb-4">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">{project.title}</h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">{project.summary}</p>
            </div>

            <div className="relative h-[260px] sm:h-[320px] rounded-3xl overflow-hidden border border-white/15 glass-card">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
            <div className="glass-card rounded-2xl border border-white/15 p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <div className="space-y-4">
                  {project.overview.map((paragraph) => (
                    <p key={paragraph} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">Challenges</h2>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-300 text-gray-300">
                  {project.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">Approach</h2>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-300 text-gray-300">
                  {project.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">Solution</h2>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-300 text-gray-300">
                  {project.solution.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">Outcomes</h2>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-300 text-gray-300">
                  {project.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="glass-card rounded-2xl border border-white/15 p-6">
                <h3 className="text-lg font-semibold mb-4">Core Services</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-gray-300 hover:text-white hover:border-cyan-400/40"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/15 p-6">
                <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/15 p-6">
                <h3 className="text-lg font-semibold mb-3">Build Something Similar</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Share your goals and we will map a delivery plan tailored to your timeline and team structure.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-medium">
                  {"Start a Project ->"}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
