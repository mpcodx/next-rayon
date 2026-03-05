"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Briefcase, Award, Clock, Globe, Headphones, Shield } from "lucide-react"

const benefits = [
  {
    icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience in leading tech companies.",
  },
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "Small Class Sizes",
    description: "Enjoy personalized attention with our small class sizes ensuring you get the support you need.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-green-500" />,
    title: "Job Placement",
    description: "Access our network of hiring partners and receive career guidance to land your dream tech job.",
  },
  {
    icon: <Award className="h-10 w-10 text-purple-500" />,
    title: "Industry Certification",
    description: "Earn recognized certifications that validate your skills to potential employers.",
  },
  {
    icon: <Clock className="h-10 w-10 text-red-500" />,
    title: "Flexible Schedule",
    description: "Choose between full-time, part-time, and weekend courses to fit your busy lifestyle.",
  },
  {
    icon: <Globe className="h-10 w-10 text-teal-500" />,
    title: "Remote Learning",
    description: "Access our training programs from anywhere in the world with our virtual classroom.",
  },
  {
    icon: <Headphones className="h-10 w-10 text-orange-500" />,
    title: "Ongoing Support",
    description: "Get lifetime access to course materials and community support even after graduation.",
  },
  {
    icon: <Shield className="h-10 w-10 text-indigo-500" />,
    title: "Money-Back Guarantee",
    description: "We're confident in our training quality. If you're not satisfied, get a full refund within 7 days.",
  },
]

export default function TrainingBenefits() {
  return (
    <section className="py-24 bg-slate-950/35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Training Programs</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're committed to providing the highest quality tech education with these key advantages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card border border-white/15 hover:border-cyan-400/30 transition-all h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-5 p-3 rounded-full bg-gray-800/50">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
