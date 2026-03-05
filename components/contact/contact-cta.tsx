"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function ContactCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with our team today and discover how we can help transform your vision into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            href="mailto:info@rayonweb.com"
            whileHover={{ y: -5 }}
            className="text-center p-8 glass-card rounded-xl hover:border-purple-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Email</h3>
            <p className="text-purple-300 font-medium mb-4">info@rayonweb.com</p>
            <p className="text-gray-400 text-sm">General inquiries and support</p>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            href="tel:+15550000000"
            whileHover={{ y: -5 }}
            className="text-center p-8 glass-card rounded-xl hover:border-purple-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600/30 group-hover:to-cyan-600/30 transition-all">
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Phone</h3>
            <p className="text-blue-300 font-medium mb-4">+1 (555) 000-0000</p>
            <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-8 glass-card rounded-xl hover:border-purple-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-600/20 to-green-600/20 flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-600/30 group-hover:to-green-600/30 transition-all">
              <MapPin className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Office</h3>
            <p className="text-cyan-300 font-medium mb-4">New York, USA</p>
            <p className="text-gray-400 text-sm">6 GMD, Ganganagar, Rajasthan</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
            <Link href="/contact">Get In Touch Today</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
