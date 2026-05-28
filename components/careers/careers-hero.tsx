"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CareersHero() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join a remote-first team building modern frontend, backend AI/ML, and DevOps solutions for ambitious
              products and growing businesses.
            </p>
            <p className="text-gray-400 mb-8">
              At Rayon Web Solutions, we believe in fostering a culture of innovation, collaboration, and continuous
              learning. We are currently hiring for remote-only roles and looking for people who care about strong
              engineering, clear communication, and real product impact.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden glass-card p-2">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <Image
                  src="https://img.freepik.com/free-photo/hiring-concept-with-people-coming-together_23-2149519873.jpg?height=600&width=800"
                  alt="Rayon Web Solutions Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
