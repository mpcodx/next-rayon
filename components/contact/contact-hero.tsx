"use client"

import { motion } from "framer-motion"

export default function ContactHero() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
              ✨ We're Here to Help
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Have a question, project idea, or want to explore freelance opportunities? We'd love to hear from you.
          </p>
          <p className="text-lg text-gray-400">
            Reach out using the form below or contact us directly. Our team typically responds within 24 hours.
          </p>
          <p className="text-sm text-cyan-300 mt-6 rounded-full inline-flex px-4 py-2 border border-cyan-500/30 bg-cyan-500/10">
            Need freelance talent? Send your query at info@rayonweb.com
          </p>
        </motion.div>
      </div>
    </section>
  )
}
