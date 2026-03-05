"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "We've worked with Rayon Web Solutions for over five years. Their team is reliable, technically sharp, and consistently strong across Django, PostgreSQL, AWS, React, and Tailwind delivery.",
    author: "Varun Gulati",
    position: "President & CTO",
    image: "/2x2_1_FfnZ0k4.jpeg?height=100&width=100",
  },
  {
    quote:
      "Rayon delivered our mobile app ahead of schedule with clear sprint communication and excellent engineering quality from start to launch.",
    author: "Michael Chen",
    position: "CTO, Health Tech Startup",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Their LMS engineering expertise helped us scale to thousands of students while improving platform performance and reliability.",
    author: "Emily Rodriguez",
    position: "Director, Educational Institute",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The DevOps modernization reduced deployment time by 70% and improved system stability significantly. Rayon became a trusted long-term partner.",
    author: "David Wilson",
    position: "VP of Engineering, SaaS Company",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        next()
      }, 5000)
    }
    return () => {
      resetTimeout()
    }
  }, [current, autoplay])

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-4">
            Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300/85 max-w-3xl mx-auto">
            Long-term partnerships built on quality delivery, transparent execution, and strong technical outcomes.
          </p>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="glass-card rounded-2xl p-8 md:p-10 border border-white/15">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-cyan-300 transform -scale-x-100" />
                        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-cyan-400/60">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.author}
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-lg md:text-2xl text-center mb-6 text-gray-100">"{testimonial.quote}"</blockquote>
                    <div className="text-center">
                      <div className="font-bold text-lg">{testimonial.author}</div>
                      <div className="text-cyan-300">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 bg-slate-800 hover:bg-slate-700 rounded-full p-3 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 bg-slate-800 hover:bg-slate-700 rounded-full p-3 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  current === index ? "bg-cyan-400" : "bg-slate-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
