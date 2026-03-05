"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Code, Smartphone, Cloud, Palette, BookOpen, TestTube, Brain, ArrowRight } from "lucide-react"

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Web Development",
    description: "Custom websites, e-commerce platforms, dashboards, and CMS solutions engineered for conversion and speed.",
    href: "/services/web-development",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "App Development",
    description: "Native and cross-platform mobile experiences with clean architecture, testing, and release workflows.",
    href: "/services/app-development",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: <Cloud className="h-10 w-10" />,
    title: "DevOps & Cloud",
    description: "CI/CD, cloud setup, Docker, Kubernetes, observability, and reliable deployment pipelines.",
    href: "/services/devops-cloud",
    color: "from-cyan-500 to-emerald-500",
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "UI/UX Design",
    description: "Research-driven product design, interaction systems, and developer-ready handoff.",
    href: "/services/ui-ux-design",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "LMS & Integrations",
    description: "Learning platforms, payment modules, CRM integrations, and automation-ready workflows.",
    href: "/services/lms-integration",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <TestTube className="h-10 w-10" />,
    title: "QA & Automation",
    description: "Manual testing, automation suites, and performance checks to reduce production risk.",
    href: "/services/qa-automation",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI & Machine Learning",
    description: "LLM applications, computer vision, predictive models, and AI-enabled product features.",
    href: "/services/ai-ml",
    color: "from-cyan-500 to-indigo-600",
  },
]

export default function FeaturedServices() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-5"
          >
            Service Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            High-Impact <span className="gradient-text">Technology Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xl text-gray-300/85 max-w-3xl mx-auto"
          >
            We design, build, and scale digital products with a pragmatic engineering approach and measurable business outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="h-full"
            >
              <Link href={service.href} className="block h-full">
                <article className="service-card h-full flex flex-col border border-white/15 hover:border-cyan-400/35">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} w-16 h-16 flex items-center justify-center mb-6`}
                  >
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-300/85 mb-7 flex-grow">{service.description}</p>

                  <div className="flex items-center text-cyan-300 font-medium group">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
