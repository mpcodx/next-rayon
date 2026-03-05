"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Code, Smartphone, Cloud, Palette, BookOpen, TestTube, Brain, ArrowRight } from "lucide-react"

const services = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Web Development",
    description: "Custom websites, e-commerce solutions, and CMS integrations tailored to your business needs.",
    href: "/services/web-development",
    color: "from-violet-500 to-blue-500",
    subServices: [
      { name: "Custom Website Design", href: "/services/web-development/custom-website-design" },
      { name: "E-commerce Solutions", href: "/services/web-development/ecommerce-solutions" },
      { name: "CMS Integration", href: "/services/web-development/cms-integration" },
    ],
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "App Development",
    description: "Native and cross-platform mobile applications for Android, iOS, and Progressive Web Apps.",
    href: "/services/app-development",
    color: "from-blue-500 to-cyan-500",
    subServices: [
      { name: "Android & iOS Apps", href: "/services/app-development/mobile-apps" },
      { name: "Progressive Web Apps", href: "/services/app-development/progressive-web-apps" },
      { name: "Cross-Platform Apps", href: "/services/app-development/cross-platform-apps" },
    ],
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "DevOps & Cloud",
    description: "Cloud infrastructure setup, CI/CD pipelines, Docker, Kubernetes, and monitoring solutions.",
    href: "/services/devops-cloud",
    color: "from-cyan-500 to-teal-500",
    subServices: [
      { name: "Cloud Setup", href: "/services/devops-cloud/cloud-setup" },
      { name: "CI/CD Pipelines", href: "/services/devops-cloud/ci-cd-pipelines" },
      { name: "Docker & Kubernetes", href: "/services/devops-cloud/docker-kubernetes" },
    ],
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "UI/UX Design",
    description: "User-centered design with wireframes, prototypes, and comprehensive design systems.",
    href: "/services/ui-ux-design",
    color: "from-fuchsia-500 to-purple-500",
    subServices: [
      { name: "Wireframes & Prototyping", href: "/services/ui-ux-design/wireframes-prototyping" },
      { name: "Web & Mobile App Design", href: "/services/ui-ux-design/web-mobile-design" },
      { name: "Design Systems", href: "/services/ui-ux-design/design-systems" },
    ],
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "LMS & Integration",
    description: "Custom Learning Management Systems and third-party integrations for seamless workflows.",
    href: "/services/lms-integration",
    color: "from-amber-500 to-orange-500",
    subServices: [
      { name: "Custom LMS", href: "/services/lms-integration/custom-lms" },
      { name: "Payment Integration", href: "/services/lms-integration/payment-integration" },
      { name: "CRM & API Integration", href: "/services/lms-integration/crm-api-integration" },
    ],
  },
  {
    icon: <TestTube className="h-6 w-6" />,
    title: "QA & Automation",
    description: "Comprehensive testing strategies with manual and automated testing to ensure quality.",
    href: "/services/qa-automation",
    color: "from-green-500 to-emerald-500",
    subServices: [
      { name: "Manual Testing", href: "/services/qa-automation/manual-testing" },
      { name: "Automated CI Tests", href: "/services/qa-automation/automated-ci-tests" },
      { name: "Performance Audits", href: "/services/qa-automation/performance-audits" },
    ],
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI & Machine Learning",
    description: "Applied AI solutions including LLMs, forecasting, computer vision, and production-ready MLOps.",
    href: "/services/ai-ml",
    color: "from-blue-600 to-violet-600",
    subServices: [
      { name: "Hugging Face Models", href: "/services/ai-ml/hugging-face-models" },
      { name: "LLM Development", href: "/services/ai-ml/llm-development" },
      { name: "Custom Model Training", href: "/services/ai-ml/custom-model-training" },
      { name: "Predictive Analytics", href: "/services/ai-ml/predictive-analytics" },
      { name: "AI Integration", href: "/services/ai-ml/ai-integration" },
      { name: "Computer Vision", href: "/services/ai-ml/computer-vision" },
      { name: "Conversational AI", href: "/services/ai-ml/conversational-ai" },
      { name: "MLOps & Model Monitoring", href: "/services/ai-ml/mlops-model-monitoring" },
    ],
  },
]

export default function ServicesList() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Service Areas Built for <span className="gradient-text">Real Outcomes</span>
          </h2>
          <p className="text-lg text-gray-400">
            Pick one service or combine multiple tracks. We design delivery plans around your timeline, budget, and
            product stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass-card rounded-2xl p-6 flex flex-col h-full border border-white/10 hover:border-cyan-400/35 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center shadow-[0_12px_24px_rgba(15,23,42,0.35)]`}
                >
                  {service.icon}
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                  {service.subServices.length} offerings
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.subServices.slice(0, 4).map((subService) => (
                  <Link
                    key={subService.name}
                    href={subService.href}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:border-cyan-400/40"
                  >
                    {subService.name}
                  </Link>
                ))}
                {service.subServices.length > 4 && (
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-200">
                    +{service.subServices.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                >
                  Explore Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
