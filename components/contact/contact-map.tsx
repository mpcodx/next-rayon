"use client"

import { motion } from "framer-motion"
import { Globe, Mail, MapPin } from "lucide-react"
import { BUSINESS_COUNTRY, BUSINESS_LOCALITY, BUSINESS_REGION, CONTACT_EMAIL } from "@/lib/seo"

export default function ContactMap() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find <span className="gradient-text">Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Visit our office or reach out to us online. We're always happy to connect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl overflow-hidden border border-white/15"
        >
          <div className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />
            <div className="relative grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <MapPin className="mb-4 h-6 w-6 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">Office Location</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {BUSINESS_LOCALITY}, {BUSINESS_REGION}, {BUSINESS_COUNTRY}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Globe className="mb-4 h-6 w-6 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">Remote Friendly</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  We work with clients across time zones and are happy to schedule remote discovery calls and support sessions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Mail className="mb-4 h-6 w-6 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">Email Us</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block text-sm leading-6 text-cyan-300 hover:text-cyan-200">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
