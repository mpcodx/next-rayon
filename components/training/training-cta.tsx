"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function TrainingCta() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center glass-card rounded-3xl p-10 md:p-14 border border-white/15"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Accelerate Your Tech Career?</h2>
          <p className="text-xl text-gray-300/90 mb-10 max-w-3xl mx-auto">
            Join mentorship-led cohorts built by Manpreet Singh, Arshpreet Singh, Ajay Kumar, Anusha Agarwal, and Sandeep Verma. Learn practical skills
            and build projects that recruiters care about.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-8"
              asChild
            >
              <Link href="/training#apply" className="flex items-center">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:bg-white/[0.08]" asChild>
              <Link href="/training/courses">Browse Detailed Courses</Link>
            </Button>
          </div>

          <div className="mt-10 p-6 border border-cyan-400/20 rounded-2xl bg-slate-900/60">
            <p className="text-gray-300 font-medium">
              "Focus on building deployable projects, not just watching tutorials. We train for real delivery standards."
            </p>
            <p className="mt-4 text-cyan-300 font-medium">- Training Mentor Panel, Rayon Web Solutions</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
