"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import BookConsultationModal from "@/components/book-consultation-modal"

export default function EnhancedContactInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const contactChannels = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@rayonweb.com",
      description: "For general inquiries and support",
      color: "from-purple-600/20 to-blue-600/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 000-0000",
      description: "Mon-Fri, 9AM-6PM EST",
      color: "from-blue-600/20 to-cyan-600/20",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Mohali, Punjab",
      description: "Our office location for in-person meetings",
      color: "from-cyan-600/20 to-green-600/20",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      value: "Available 24/7",
      description: "Get instant support from our team",
      color: "from-green-600/20 to-purple-600/20",
    },
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactChannels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`glass-card rounded-xl p-6 hover:border-purple-500/50 transition-all bg-gradient-to-br ${channel.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{channel.title}</h3>
                      <p className="text-purple-300 font-medium text-sm mb-1">{channel.value}</p>
                      <p className="text-gray-400 text-xs">{channel.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Freelance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-8 border border-purple-500/30 bg-gradient-to-br from-purple-600/10 to-blue-600/10"
        >
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div className="max-w-xl">
              <h3 className="text-xl font-bold text-white mb-2">Looking for Freelance Services?</h3>
              <p className="text-gray-300 mb-4">
                We also provide freelance support. If you want to hire a freelancer, send your query to{" "}
                <a href="mailto:info@rayonweb.com" className="text-cyan-300 hover:text-cyan-200 underline">
                  info@rayonweb.com
                </a>
                .
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">✓ Flexible engagement models</p>
                <p className="text-sm text-gray-400">✓ Vetted professionals across all domains</p>
                <p className="text-sm text-gray-400">✓ Transparent pricing and deliverables</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white whitespace-nowrap h-fit"
              >
                <a href="mailto:info@rayonweb.com">Send Freelance Query</a>
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-500/10 whitespace-nowrap h-fit"
              >
                Open Consultation Modal
              </Button>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
          <p className="text-gray-300 mb-6">
            Schedule a free consultation with our team to discuss your needs and explore the best solution for your business.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            Book a Free Consultation
          </Button>
        </motion.div>
      </motion.div>

      <BookConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
