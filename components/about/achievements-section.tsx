"use client"

import { motion } from "framer-motion"
import { Users, Trophy, Briefcase, Globe } from "lucide-react"

const achievements = [
  {
    icon: Trophy,
    number: "500+",
    label: "Projects Completed",
    description: "Successfully delivered across 50+ countries",
  },
  {
    icon: Users,
    number: "100+",
    label: "Team Members",
    description: "Expert developers, designers & strategists",
  },
  {
    icon: Briefcase,
    number: "10+",
    label: "Years of Experience",
    description: "Building digital solutions since 2015",
  },
  {
    icon: Globe,
    number: "98%",
    label: "Client Satisfaction",
    description: "Committed to excellence in every project",
  },
]

export default function AchievementsSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-3xl"></div>
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
          <h2 className="text-4xl font-bold mb-4">Our Impact & Achievements</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Partner with a team that delivers measurable results and drives real business growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group glass-card rounded-xl p-8 text-center hover:border-purple-500/50 transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
                  <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                  {achievement.number}
                </h3>
                <h4 className="text-lg font-semibold text-white mb-2">{achievement.label}</h4>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
