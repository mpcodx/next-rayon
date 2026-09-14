"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Sparkles, Code2, BrainCircuit, Server, ShieldCheck } from "lucide-react"

export default function CareersHero() {
  const scrollToOpenings = () => {
    document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Now Hiring Freshers (2024 – 2026)
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
              Launch Your Career in <span className="gradient-text">Tech & AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
              We are actively looking for enthusiastic freshers ready to learn, build, and deploy production software across <strong className="text-white">Frontend</strong>, <strong className="text-white">Python AI/ML</strong>, <strong className="text-white">DevOps</strong>, and <strong className="text-white">Cybersecurity</strong>.
            </p>

            <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
              At Rayon Web Solutions, freshers don't just watch from the sidelines. You will write real code for real users, work alongside senior architects, and accelerate your engineering journey from day one.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 items-center mb-10">
              <Button
                onClick={scrollToOpenings}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-7 py-6 text-base rounded-full shadow-lg shadow-purple-600/25"
              >
                Explore 4 Open Roles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <a
                href="mailto:hr@rayonweb.com?subject=Fresher%20Application%20-%20Rayon%20Web%20Solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-gray-200 text-sm font-medium transition-all hover:border-purple-500/50"
              >
                <Mail className="h-4 w-4 text-purple-400" />
                <span>Email hr@rayonweb.com</span>
              </a>
            </div>

            {/* Quick Track Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-800/80">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>Frontend</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <BrainCircuit className="h-4 w-4 text-purple-400" />
                <span>Python AI / ML</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Server className="h-4 w-4 text-amber-400" />
                <span>DevOps</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Cybersecurity</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden glass-card p-2 shadow-2xl border border-purple-500/20">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <Image
                  src="https://img.freepik.com/free-photo/hiring-concept-with-people-coming-together_23-2149519873.jpg?height=600&width=800"
                  alt="Rayon Web Solutions Team"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Fresher Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 rounded-xl p-4 bg-gray-900/90 backdrop-blur-md border border-purple-500/40 shadow-xl items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">Early Career Tracks</div>
                <div className="text-sm font-bold text-white">Full-Time Fresher Roles</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
