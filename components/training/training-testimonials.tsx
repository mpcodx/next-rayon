"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Sparkles } from "lucide-react"

const testimonials = [
  {
    name: "Emily Rodriguez",
    initials: "ER",
    role: "Frontend Developer at Spotify",
    content:
      "The Full-Stack Web Development Bootcamp completely transformed my career. I went from a marketing role to a frontend developer position at Spotify within 3 months of completing the program. The instructors were incredibly knowledgeable and supportive throughout the journey.",
    course: "Full-Stack Web Development Bootcamp",
    rating: 5,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    name: "David Kim",
    initials: "DK",
    role: "Mobile App Developer at Uber",
    content:
      "I had some programming experience before joining the React Native course, but this program took my skills to the next level. The hands-on projects and code reviews were invaluable. I now work as a mobile developer at Uber, building features used by millions.",
    course: "Mobile App Development with React Native",
    rating: 5,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    name: "Sophia Chen",
    initials: "SC",
    role: "UI/UX Designer at Adobe",
    content:
      "The UI/UX Design Bootcamp provided me with both the theoretical knowledge and practical skills needed in the industry. The portfolio I built during the course helped me land my dream job at Adobe. I highly recommend this program to anyone interested in design.",
    course: "UI/UX Design Bootcamp",
    rating: 5,
    gradient: "from-rose-600 to-orange-600",
  },
  {
    name: "Marcus Johnson",
    initials: "MJ",
    role: "DevOps Engineer at Microsoft",
    content:
      "After 10 years in traditional IT, I wanted to transition to cloud and DevOps. This program made that possible with practical, hands-on training. The instructors brought real-world scenarios that prepared me for my current role at Microsoft.",
    course: "DevOps Engineering Certification",
    rating: 4,
    gradient: "from-green-600 to-emerald-600",
  },
  {
    name: "Aisha Patel",
    initials: "AP",
    role: "Full-Stack Developer at Netflix",
    content:
      "Coming from a non-technical background, I was worried about keeping up, but the step-by-step curriculum and supportive environment made learning to code accessible. Now I'm working as a full-stack developer at Netflix and loving every minute of it!",
    course: "Full-Stack Web Development Bootcamp",
    rating: 5,
    gradient: "from-amber-600 to-yellow-600",
  },
  {
    name: "Thomas Wright",
    initials: "TW",
    role: "iOS Developer at Airbnb",
    content:
      "The iOS Development course was comprehensive and well-structured. The focus on Swift and practical app development prepared me for real-world challenges. Within weeks of completing the course, I received multiple job offers and ultimately joined the mobile team at Airbnb.",
    course: "iOS Development with Swift",
    rating: 4,
    gradient: "from-indigo-600 to-purple-600",
  },
]

export default function TrainingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-slate-900/35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Success Stories</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear from our graduates who have transformed their careers through our training programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
            <motion.div
              key={`${testimonials.indexOf(testimonial)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="glass-card rounded-xl overflow-hidden h-full flex flex-col">
                {/* Avatar Section */}
                <div className={`relative h-60 overflow-hidden bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center group`}>
                  <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Main Avatar Circle */}
                    <motion.div
                      className="relative w-28 h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 shadow-2xl"
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="mb-1"
                        >
                          <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </motion.div>
                        {/* Initials */}
                        <span className="text-lg font-bold text-white text-center">{testimonial.initials}</span>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                    ></motion.div>
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Star Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-300 mb-5 text-sm italic">"{testimonial.content}"</p>

                  {/* Author Info */}
                  <div className="mt-auto">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-cyan-300 mt-1">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-all ${index === currentIndex ? "bg-cyan-400 w-8" : "bg-gray-700"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
