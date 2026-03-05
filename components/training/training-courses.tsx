"use client"

import { useState } from "react"
import type { ComponentType } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Code,
  Smartphone,
  Cloud,
  Palette,
  Brain,
  Clock,
  Users,
  CheckCircle2,
  Briefcase,
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react"
import { trainingContactDetails, trainingCourseCategories } from "@/lib/training-course-data"

type CategoryKey = "web" | "mobile" | "devops" | "design" | "ai"

const categoryIcons: Record<CategoryKey, ComponentType<{ className?: string }>> = {
  web: Code,
  mobile: Smartphone,
  devops: Cloud,
  design: Palette,
  ai: Brain,
}

export default function TrainingCourses() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("web")

  return (
    <section id="courses" className="py-24 bg-slate-950/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-3 py-1 border-cyan-400/40 text-cyan-300 bg-cyan-500/10">
            Career-Focused Curriculum
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Specialized Training Programs</h2>
          <p className="text-xl text-gray-300/90 max-w-3xl mx-auto">
            Pick a learning track and build job-ready skills with guided projects, live mentorship, and structured
            interview preparation.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-4 sm:p-6 md:p-8 border border-white/15">
          <Tabs defaultValue="web" value={activeTab} onValueChange={(value) => setActiveTab(value as CategoryKey)} className="w-full">
            <div className="flex justify-center mb-10 overflow-x-auto">
              <TabsList className="grid min-w-[680px] grid-cols-5 gap-2 bg-slate-900/70 p-1.5 rounded-2xl border border-white/10">
                {trainingCourseCategories.map((category) => {
                  const Icon = categoryIcons[category.key]

                  return (
                    <TabsTrigger
                      key={category.key}
                      value={category.key}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 rounded-xl py-2.5"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>

            {trainingCourseCategories.map((category) => (
              <TabsContent key={category.key} value={category.key} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-8 px-1">
                    <h3 className="text-2xl font-bold mb-2">{category.label}</h3>
                    <p className="text-gray-300/85">{category.summary}</p>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {category.items.map((course, index) => (
                      <motion.div
                        key={course.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="service-card h-full"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h4 className="text-xl font-bold leading-tight">{course.title}</h4>
                          {course.popular ? (
                            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white whitespace-nowrap">
                              Popular
                            </Badge>
                          ) : null}
                        </div>

                        <p className="text-gray-300/85 mb-5">{course.description}</p>

                        <div className="grid sm:grid-cols-2 gap-3 mb-5 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="h-4 w-4 text-cyan-300" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Users className="h-4 w-4 text-cyan-300" />
                            <span>{course.level}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 sm:col-span-2">
                            <Briefcase className="h-4 w-4 text-cyan-300" />
                            <span>{course.format}</span>
                          </div>
                        </div>

                        <div className="rounded-xl bg-slate-900/70 border border-white/10 p-4 mb-5">
                          <p className="text-sm text-cyan-200 font-medium mb-2">Project Output</p>
                          <p className="text-sm text-gray-300">{course.projects}</p>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm font-semibold text-white mb-3">Core Skills</p>
                          <ul className="space-y-2">
                            {course.skills.map((skill) => (
                              <li key={skill} className="flex items-start text-sm text-gray-300">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2 mt-0.5" />
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                          <Button asChild className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white">
                            <Link href="/training/courses">View Details</Link>
                          </Button>
                          <Button asChild variant="outline" className="flex-1 border-white/20 hover:bg-white/[0.08]">
                            <Link href="#apply" className="flex items-center justify-center">
                              Apply Now <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/15">
            <p className="text-xs uppercase tracking-wide text-cyan-300 mb-1">Training Email</p>
            <p className="text-gray-200 flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" />{trainingContactDetails.email}</p>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-white/15">
            <p className="text-xs uppercase tracking-wide text-cyan-300 mb-1">Call Admissions</p>
            <p className="text-gray-200 flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-300" />{trainingContactDetails.phone}</p>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-white/15">
            <p className="text-xs uppercase tracking-wide text-cyan-300 mb-1">Need guidance?</p>
            <Button asChild variant="outline" className="mt-1 border-white/20 hover:bg-white/[0.08]">
              <Link href="/contact">Book Counseling Session</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
