"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GraduationCap, Users, Calendar, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TrainingHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:56px_56px]" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <BadgePill />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 mt-5 leading-tight">
              Build Job-Ready Skills with <span className="gradient-text">Expert-Led Training</span>
            </h1>
            <p className="text-xl text-gray-300/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Learn full-stack development, MEAN/MERN architecture, AI workflows, and cybersecurity with live mentors,
              portfolio projects, and structured career support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-8"
                asChild
              >
                <Link href="/training/courses" className="inline-flex items-center">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:bg-white/[0.08]" asChild>
                <Link href="#apply">Apply for Training</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="relative z-10 glass-card rounded-3xl p-6 md:p-8 border border-white/15">
              <div className="grid grid-cols-2 gap-5">
                <StatCard icon={<GraduationCap className="h-9 w-9 text-cyan-300 mx-auto mb-3" />} value="25+" label="Career Tracks" />
                <StatCard icon={<Users className="h-9 w-9 text-blue-300 mx-auto mb-3" />} value="1,500+" label="Learners Trained" />
                <StatCard icon={<Calendar className="h-9 w-9 text-indigo-300 mx-auto mb-3" />} value="Weekly" label="New Batches" />
                <StatCard icon={<Award className="h-9 w-9 text-amber-300 mx-auto mb-3" />} value="Industry" label="Certifications" />
              </div>

              <div className="mt-6 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4">
                <p className="text-sm text-gray-200">
                  <span className="text-cyan-300 font-semibold">Admissions Open:</span> Get personalized counseling and
                  choose the right course path based on your goals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BadgePill() {
  return (
    <div className="inline-flex items-center rounded-full border border-cyan-400/35 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200">
      Training Programs with Live Mentorship
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5 text-center">
      {icon}
      <h3 className="text-lg font-semibold mb-1">{value}</h3>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  )
}
