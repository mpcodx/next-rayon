"use client"

import { motion } from "framer-motion"

const timelineEvents = [
  {
    year: "2015",
    title: "Company Founded",
    description:
      "Rayon Web Solutions was founded with a vision to create innovative digital solutions for businesses of all sizes.",
  },
  {
    year: "2017",
    title: "Expanded Services",
    description:
      "Added mobile app development and UI/UX design services to our portfolio, growing our team to 15 professionals.",
  },
  {
    year: "2019",
    title: "Broader Reach",
    description: "Opened our first remote delivery office and expanded support across multiple regions.",
  },
  {
    year: "2021",
    title: "Cloud Solutions",
    description:
      "Launched our DevOps and cloud solutions division, helping businesses migrate and optimize their cloud infrastructure.",
  },
  {
    year: "2023",
    title: "AI Integration",
    description:
      "Began incorporating AI and machine learning solutions into our service offerings to help clients leverage cutting-edge technology.",
  },
  {
    year: "Today",
    title: "Industry Leader",
    description:
      "Now recognized as an industry leader with over 200 successful projects and a team of 50+ digital experts.",
  },
]

export default function Timeline() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From humble beginnings to industry leadership, our journey has been defined by innovation, growth, and a
            commitment to excellence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>

          <div className="relative">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center justify-between mb-16 last:mb-0 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400">{event.description}</p>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">{event.year}</span>
                  </div>
                </div>

                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
