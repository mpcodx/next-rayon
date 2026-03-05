"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutHero() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
                🏢 About Rayon Web Solutions
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              About <span className="gradient-text">Rayon Web Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              We're a team of passionate developers, designers, and digital strategists dedicated to transforming
              businesses through innovative technology solutions.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Founded in 2015, Rayon Web Solutions has grown from a small startup to a leading digital agency with
              clients worldwide. Our mission is to bridge the gap between business goals and technological innovation,
              creating digital experiences that drive growth and success.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              With expertise spanning web development, mobile applications, cloud solutions, UI/UX design, and more, we
              offer comprehensive digital services tailored to your unique needs.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-500/50 hover:bg-purple-500/10 text-white"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="glass-card rounded-xl border border-cyan-500/30 p-4 bg-cyan-500/5">
              <p className="text-sm text-gray-200">
                Need freelance support? We also provide freelance professionals. Send your query to{" "}
                <a href="mailto:info@rayonweb.com" className="text-cyan-300 underline hover:text-cyan-200">
                  info@rayonweb.com
                </a>
                .
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-full"
          >
            {/* Main Image Grid */}
            <div className="grid grid-cols-2 gap-4 relative h-[500px]">
              {/* Large Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="col-span-1 row-span-2 relative overflow-hidden rounded-3xl shadow-2xl group border border-gray-700/50"
              >
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop"
                  alt="Team Collaboration"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </motion.div>

              {/* Top Right Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group border border-gray-700/50"
              >
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                  alt="Team Creativity"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              </motion.div>

              {/* Bottom Right Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group border border-gray-700/50"
              >
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                  alt="Office Environment"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </motion.div>
            </div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-8 right-0 w-72"
            >
              <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-blue-600/20 shadow-2xl backdrop-blur-xl">
                <h4 className="font-semibold text-white mb-4 text-lg">Why Choose Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0 border border-green-500/50">
                      <span className="text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-sm text-gray-300">Expert Team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0 border border-green-500/50">
                      <span className="text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-sm text-gray-300">Proven Track Record</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0 border border-green-500/50">
                      <span className="text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-sm text-gray-300">24/7 Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
