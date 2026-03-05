"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, Code, Smartphone, Cloud, Palette, BookOpen, TestTube, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import BookConsultationModal from "./contact/BookConsultationModal"

const services = [
  {
    name: "Web Development",
    href: "/services/web-development",
    icon: <Code className="h-5 w-5" />,
    subServices: [
      { name: "Custom Website Design", href: "/services/web-development/custom-website-design" },
      { name: "E-commerce Solutions", href: "/services/web-development/ecommerce-solutions" },
      { name: "CMS Integration", href: "/services/web-development/cms-integration" },
    ],
  },
  {
    name: "App Development",
    href: "/services/app-development",
    icon: <Smartphone className="h-5 w-5" />,
    subServices: [
      { name: "Android & iOS Apps", href: "/services/app-development/mobile-apps" },
      { name: "Progressive Web Apps", href: "/services/app-development/progressive-web-apps" },
      { name: "Cross-Platform Apps", href: "/services/app-development/cross-platform-apps" },
    ],
  },
  {
    name: "DevOps & Cloud",
    href: "/services/devops-cloud",
    icon: <Cloud className="h-5 w-5" />,
    subServices: [
      { name: "Cloud Setup", href: "/services/devops-cloud/cloud-setup" },
      { name: "CI/CD Pipelines", href: "/services/devops-cloud/ci-cd-pipelines" },
      { name: "Docker & Kubernetes", href: "/services/devops-cloud/docker-kubernetes" },
    ],
  },
  {
    name: "UI/UX Design",
    href: "/services/ui-ux-design",
    icon: <Palette className="h-5 w-5" />,
    subServices: [
      { name: "Wireframes & Prototyping", href: "/services/ui-ux-design/wireframes-prototyping" },
      { name: "Web & Mobile App Design", href: "/services/ui-ux-design/web-mobile-design" },
      { name: "Design Systems", href: "/services/ui-ux-design/design-systems" },
    ],
  },
  {
    name: "LMS & Integration",
    href: "/services/lms-integration",
    icon: <BookOpen className="h-5 w-5" />,
    subServices: [
      { name: "Custom LMS", href: "/services/lms-integration/custom-lms" },
      { name: "Payment Integration", href: "/services/lms-integration/payment-integration" },
      { name: "CRM & API Integration", href: "/services/lms-integration/crm-api-integration" },
    ],
  },
  {
    name: "QA & Automation",
    href: "/services/qa-automation",
    icon: <TestTube className="h-5 w-5" />,
    subServices: [
      { name: "Manual Testing", href: "/services/qa-automation/manual-testing" },
      { name: "Automated CI Tests", href: "/services/qa-automation/automated-ci-tests" },
      { name: "Performance Audits", href: "/services/qa-automation/performance-audits" },
    ],
  },
  {
    name: "AI & Machine Learning",
    href: "/services/ai-ml",
    icon: <Brain className="h-5 w-5" />,
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

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", dropdown: true },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Training", href: "/training" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        setOpenDropdown(null)
      }
    }

    window.addEventListener("keydown", onEscape)
    return () => window.removeEventListener("keydown", onEscape)
  }, [])

  const isServicesOpen = openDropdown === "Services"

  const toggleDropdown = (name: string) => {
    setOpenDropdown((current) => (current === name ? null : name))
  }

  const closeAllMenus = () => {
    setIsOpen(false)
    setOpenDropdown(null)
  }

  const handleOpenModal = () => {
    setShowModal(true)
    closeAllMenus()
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-slate-950/75 backdrop-blur-xl border-b border-white/10 shadow-[0_16px_35px_rgba(2,6,23,0.55)]"
          : "bg-slate-950/40 backdrop-blur-md border-b border-white/5",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Rayon Web Solutions Home" onClick={closeAllMenus}>
              <Image
                src="/new-1.png"
                alt="Rayon Web Solutions"
                height={200}
                width={300}
                priority
                className="object-cover"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={cn(
                      "flex items-center rounded-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all",
                      pathname.startsWith(link.href) && "text-white bg-white/[0.08] font-medium",
                    )}
                  >
                    {link.name}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        isServicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeAllMenus}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all",
                      pathname === link.href && "text-white bg-white/[0.08] font-medium",
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Button
              onClick={handleOpenModal}
              className="h-10 rounded-full px-5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
            >
              Book a Consultation
            </Button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none border border-white/15"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isServicesOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close services menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenDropdown(null)}
                className="hidden lg:block fixed inset-0 top-20 z-40 bg-black/20"
              />

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block absolute left-[11%] top-full mt-3 w-[min(94vw,64rem)] z-50 rounded-2xl glass-card border border-white/20 shadow-[0_24px_45px_rgba(2,6,23,0.55)]"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Services</p>
                    <p className="text-sm text-gray-300 mt-1">Choose any service to view details and sub-services</p>
                  </div>
                  <Link
                    href="/services"
                    onClick={closeAllMenus}
                    className="text-xs rounded-md border border-cyan-400/35 bg-cyan-500/10 px-3 py-1.5 text-cyan-200 hover:bg-cyan-500/20"
                  >
                    View All Services
                  </Link>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-5">
                  <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {services.map((item) => (
                      <li key={item.name} className="rounded-xl border border-white/15 bg-white/[0.03] p-4 hover:border-cyan-400/35 transition-colors">
                        <Link
                          href={item.href}
                          onClick={closeAllMenus}
                          className="flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-200"
                        >
                          <span className="text-cyan-300">{item.icon}</span>
                          {item.name}
                        </Link>

                        <ul className="mt-3 space-y-1.5 pl-5 list-disc marker:text-cyan-300">
                          {item.subServices.map((subService) => (
                            <li key={subService.name}>
                              <Link
                                href={subService.href}
                                onClick={closeAllMenus}
                                className="text-xs text-gray-400 hover:text-cyan-200 transition-colors"
                              >
                                {subService.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-3 pt-3 pb-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium",
                          pathname.startsWith(link.href)
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        )}
                      >
                        {link.name}
                        <ChevronDown
                          className={cn(
                            "ml-1 h-4 w-4 transition-transform duration-200",
                            isServicesOpen && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-2 pr-1 mt-2 space-y-2 max-h-[60vh] overflow-y-auto"
                          >
                            {services.map((item) => (
                              <div key={item.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                                <Link
                                  href={item.href}
                                  onClick={closeAllMenus}
                                  className="flex items-center gap-2 px-1 py-1 text-sm font-medium text-gray-100"
                                >
                                  <span className="text-cyan-300">{item.icon}</span>
                                  {item.name}
                                </Link>

                                <ul className="mt-2 pl-6 space-y-1 list-disc marker:text-cyan-300">
                                  {item.subServices.map((subService) => (
                                    <li key={subService.name}>
                                      <Link
                                        href={subService.href}
                                        onClick={closeAllMenus}
                                        className="block py-0.5 text-xs text-gray-400 hover:text-white"
                                      >
                                        {subService.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeAllMenus}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        pathname === link.href
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-3">
                <Button
                  onClick={handleOpenModal}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full"
                >
                  Book a Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookConsultationModal showModal={showModal} onClose={handleCloseModal} />
    </header>
  )
}
