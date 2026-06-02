"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How quickly can you respond to my inquiry?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please indicate so in your message and we'll prioritize your request.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes, we work with clients remotely. Our team is distributed across multiple time zones, allowing us to provide flexible support and services.",
  },
  {
    question: "What information should I include in my project inquiry?",
    answer:
      "To help us understand your needs better, please include details about your project scope, timeline, budget range, and any specific requirements or challenges you're facing.",
  },
  {
    question: "Do you offer maintenance services after project completion?",
    answer:
      "Yes, we offer various maintenance packages to ensure your digital solutions remain up-to-date, secure, and performing optimally after launch.",
  },
  {
    question: "How do you handle project pricing?",
    answer:
      "Our pricing is based on project scope, complexity, and timeline. We offer both fixed-price quotes and time-and-materials billing depending on the nature of your project.",
  },
]

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about contacting and working with us.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6 last:mb-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 glass-card rounded-xl text-left"
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-purple-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-900/50 rounded-b-xl">
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
