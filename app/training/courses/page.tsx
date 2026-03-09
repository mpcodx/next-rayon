import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  Cloud,
  Code,
  Mail,
  MapPin,
  Palette,
  Phone,
  Smartphone,
  Users,
} from "lucide-react"
import { trainingContactDetails, trainingCourseCategories } from "@/lib/training-course-data"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/training/courses")

const iconByCategory = {
  web: Code,
  mobile: Smartphone,
  devops: Cloud,
  design: Palette,
  ai: Brain,
} as const

export default function TrainingCoursesPage() {
  return (
    <main className="min-h-screen pb-24">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-8 sm:p-10 md:p-12 border border-white/15">
            <Badge variant="outline" className="mb-4 border-cyan-400/40 text-cyan-300 bg-cyan-500/10">
              Detailed Course Catalog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose the Right <span className="gradient-text">Training Path</span> for Your Career
            </h1>
            <p className="text-xl text-gray-300/90 max-w-3xl mx-auto mb-8">
              Each program is built for practical outcomes: portfolio projects, code reviews, deployment workflows,
              interview guidance, and mentorship from experienced engineers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-8">
                <Link href="/training#apply">Apply for a Course</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 border-white/20 hover:bg-white/[0.08]">
                <Link href="/contact">Talk to Admissions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {trainingCourseCategories.map((category) => {
            const Icon = iconByCategory[category.key]
            return (
              <div key={category.key} className="glass-card rounded-3xl border border-white/15 p-6 sm:p-8">
                <div className="mb-8">
                  <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200 mb-4">
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </div>
                  <p className="text-gray-300/90">{category.summary}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {category.items.map((course) => (
                    <article key={course.slug} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-2xl font-bold leading-tight">{course.title}</h2>
                        {course.popular ? (
                          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white whitespace-nowrap">Top Pick</Badge>
                        ) : null}
                      </div>

                      <p className="text-gray-300/85 mb-4">{course.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Clock className="h-4 w-4 text-cyan-300 mr-2" />
                          {course.duration}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="h-4 w-4 text-cyan-300 mr-2" />
                          {course.level}
                        </div>
                        <div className="flex items-center text-gray-300 sm:col-span-2">
                          <Briefcase className="h-4 w-4 text-cyan-300 mr-2" />
                          {course.format}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-800/70 p-4 mb-5">
                        <p className="text-sm text-cyan-200 font-medium mb-1">Project Scope</p>
                        <p className="text-sm text-gray-300">{course.projects}</p>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm font-semibold text-white mb-2">What you will learn</p>
                        <ul className="space-y-2">
                          {course.skills.map((skill) => (
                            <li key={skill} className="flex items-start text-sm text-gray-300">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2 mt-0.5" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto flex flex-col sm:flex-row gap-3">
                        <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex-1">
                          <Link href="/training#apply">Apply Now</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/20 hover:bg-white/[0.08] flex-1">
                          <Link href="/contact" className="inline-flex items-center justify-center">
                            Ask a Mentor <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-white/15">
              <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Email</p>
              <p className="text-sm text-gray-300 flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" />{trainingContactDetails.email}</p>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/15">
              <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Phone</p>
              <p className="text-sm text-gray-300 flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-300" />{trainingContactDetails.phone}</p>
            </div>
            <div className="glass-card rounded-2xl p-5 border border-white/15">
              <p className="text-xs uppercase tracking-wide text-cyan-300 mb-2">Location</p>
              <p className="text-sm text-gray-300 flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" />{trainingContactDetails.location}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
