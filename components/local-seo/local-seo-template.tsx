"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Script from "next/script"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Globe,
  HelpCircle,
  Layers3,
  LineChart,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE_URL } from "@/lib/seo"

export interface LocalSeoPageProps {
  locationName: string
  region: string
  title: string
  description: string
  slug: string
  keywords: string[]
}

export default function LocalSeoTemplate({
  locationName,
  region,
  title,
  description,
  slug,
  keywords,
}: LocalSeoPageProps) {
  const pageUrl = `${SITE_URL}/${slug}`

  // Curated FAQs based on location
  const isIndianLocation = ["Mohali", "Chandigarh", "Hanumangarh", "Sri Ganganagar"].includes(locationName)

  const faqItems = isIndianLocation
    ? [
        {
          question: `Do you provide in-person consultations in ${locationName}?`,
          answer: `Yes, we support both virtual and in-person consultations for clients based in the ${locationName} and Chandigarh Tricity region. Our team is available to discuss requirements, project roadmaps, and delivery schedules in person at your office or our regional development hub.`,
        },
        {
          question: `What is the cost of custom web development services in ${locationName}?`,
          answer: `The cost varies depending on project scope, technology stack, feature complexity, and design requirements. A standard business website or custom CMS might range differently than a fully bespoke e-commerce store or AI-integrated SaaS platform. We provide detailed, itemized proposals after a discovery call so pricing expectations stay clear.`,
        },
        {
          question: `How long does it take to deliver a custom website in ${locationName}?`,
          answer: "A custom website design and frontend build typically takes 4 to 8 weeks, while complex web applications, learning management systems (LMS), or custom software integrations can take 3 to 6 months. We execute in weekly sprints to ensure you see progress and can provide feedback at every stage.",
        },
        {
          question: `Do you work with international clients as well as local businesses in ${locationName}?`,
          answer: `Absolutely. While we are proud to serve local businesses and enterprises in ${locationName}, we also serve clients globally across the USA, UAE, Australia, and Europe. This gives us deep expertise in both local market dynamics and international software standards.`,
        },
        {
          question: "Do you offer post-launch support and hosting management?",
          answer: "Yes. We provide comprehensive support plans including monthly maintenance, security monitoring, performance audits, core updates, and cloud hosting management (AWS, GCP, DigitalOcean, Vercel) to ensure your application runs without interruption.",
        },
      ]
    : [
        {
          question: `How do you handle time zone differences for web development in ${locationName}?`,
          answer: `We overlap our working hours with your local business hours in ${locationName} to ensure smooth communication. Weekly sprint updates, daily stand-up summaries, and async channels (Slack, Jira, email) ensure you receive real-time answers and continuous delivery.`,
        },
        {
          question: `What is your communication model for offshore web development from ${locationName}?`,
          answer: "We pair each project with a dedicated Project Manager and a Senior Architect. All deliverables are documented in Jira/Trello and code is versioned on GitHub/GitLab, ensuring absolute transparency, regular demos, and predictable release schedules.",
        },
        {
          question: `What technologies do you use for web development projects in ${locationName}?`,
          answer: "We specialize in modern, high-performance tech stacks including Next.js, React, Node.js, Python (Django/FastAPI), Docker, Kubernetes, and PostgreSQL. We choose technologies based on your performance, scalability, and long-term maintenance requirements.",
        },
        {
          question: `Do you provide post-launch security and performance optimization for clients in ${locationName}?`,
          answer: "Yes. Every contract includes post-launch warranty support. We also provide ongoing service level agreements (SLAs) covering performance tuning (LCP/INP optimization), security patches, cloud cost optimization, and SEO maintenance.",
        },
        {
          question: "Can you help integrate AI/ML features into our existing website or app?",
          answer: "Yes, we specialize in practical AI integrations. This includes building custom LLM wrappers, retrieval-augmented generation (RAG) pipelines, conversational agents (chatbots), OCR engines, predictive analytics models, and Hugging Face model integrations.",
        },
      ]

  const servicePillars = [
    {
      title: "Bespoke Web Development",
      description: `High-performance Next.js and React applications tailored to the ${locationName} market. Built for speed, mobile responsiveness, and high conversion rates.`,
      href: "/services/web-development",
      icon: Code2,
    },
    {
      title: "Practical AI & ML Integrations",
      description: "Custom chatbots, workflow automation, intelligent search, and LLM-powered features designed to reduce operations cost and improve user experience.",
      href: "/services/ai-ml",
      icon: Bot,
    },
    {
      title: "Custom Software Solutions",
      description: "Scalable SaaS platforms, corporate portals, and internal workflows aligned with your business processes, security compliance, and growth metrics.",
      href: "/services/app-development",
      icon: Layers3,
    },
  ]

  const trustSignals = [
    {
      title: "Local and Global Delivery",
      description: `Supporting businesses in ${locationName} and globally with secure, scalable solutions.`,
      icon: Globe,
    },
    {
      title: "Metric-Driven Execution",
      description: "All design and development choices are tied to clear business goals: speed, SEO rank, and lead generation.",
      icon: LineChart,
    },
    {
      title: "Agile Development",
      description: "Weekly releases, collaborative workspaces, and absolute clarity on scope changes.",
      icon: Rocket,
    },
    {
      title: "High Performance & Core Web Vitals",
      description: "Every build undergoes rigorous LCP, CLS, and INP audits to guarantee premium speed on all devices.",
      icon: ShieldCheck,
    },
  ]

  // Structured Data Schema for Search Engines (AEO/SEO/GEO)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#professional-service`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_OG_IMAGE_URL,
        image: DEFAULT_OG_IMAGE_URL,
        description: description,
        telephone: "+1 (123) 456-7890",
        email: "info@rayonweb.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: isIndianLocation ? locationName : "Mohali",
          addressRegion: isIndianLocation ? "Punjab" : "Punjab",
          addressCountry: isIndianLocation ? "India" : "India",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "30.7046",
          longitude: "76.7179",
        },
        areaServed: [region, "Worldwide"],
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Web Development in ${locationName}`,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <main className="pb-20">
      <Script
        id={`local-seo-schema-${locationName.toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-16">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
                <Sparkles className="h-4 w-4 mr-2 text-cyan-300" />
                Web & Software Engineering Services in {locationName}
              </span>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Web Development Company in {locationName}
                </h1>
                <p className="max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Rayon Web Solutions builds high-performance websites, customized e-commerce portals, and enterprise-grade software products that enable businesses in {locationName} to scale efficiently, rank higher on search engines, and drive customer conversion.
                </p>
                <p className="max-w-4xl text-lg leading-8 text-slate-300">
                  Whether you are a startup in need of a validation-ready MVP or an established business seeking to modernize legacy workflows with custom cloud integrations and AI automation, we deliver secure, fast, and beautifully designed web solutions designed around your specific local market.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8">
                  <Link href="/contact">
                    Book a Discovery Call
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/[0.08] px-8">
                  <Link href="/projects">View Case Studies</Link>
                </Button>
              </div>
            </div>

            {/* Local SEO Card / AEO Signals */}
            <Card className="glass-card border border-cyan-400/20 bg-slate-950/40 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-cyan-300 animate-pulse" />
                  {locationName} Regional Presence
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Optimized digital engineering and communication tailored to your region.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-white">Target Service Area</p>
                  <p>{region} & Worldwide</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Delivery Stack</p>
                  <p>Next.js 16, React 19, TypeScript, Python, TailwindCSS, AWS, Docker</p>
                </div>
                <div>
                  <p className="font-semibold text-white">SEO & AEO Compliance</p>
                  <p>Fully compliant with mobile Core Web Vitals, Structured Schema markup, and LLM-search citation guidelines.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Inquiries</p>
                  <p>info@rayonweb.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Our Services in {locationName}</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Full-cycle engineering services built on modern technologies and clean architecture.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <Card key={pillar.title} className="glass-card border border-white/10 bg-slate-900/30 hover:border-cyan-400/35 transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-white text-xl">{pillar.title}</CardTitle>
                    <CardDescription className="text-slate-300 min-h-[72px]">{pillar.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={pillar.href} className="inline-flex items-center gap-2 font-medium text-cyan-300 hover:text-cyan-200 transition-colors">
                    View service details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Engineered for Core Web Vitals, Conversion, and Discoverability
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              In a crowded digital ecosystem, a website that merely looks polished is no longer enough. To capture high-intent traffic, your site must load instantly, respond immediately to user clicks, and structure its content so both search engines and AI answer assistants (like Gemini and ChatGPT) can read and reference your brand.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Our engineering processes are designed from the ground up to target this intersection of design aesthetics, blazing-fast performance, and semantic SEO. We build using statically generated pages, optimize image sizes dynamically, structure metadata hierarchically, and inject rich JSON-LD schema objects so your brand gains the authority it deserves.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              By working with Rayon Web Solutions, you get a collaborative delivery partner that prioritizes transparent sprint execution, secure coding practices, and an architecture that allows your team to expand features in the future without expensive rewrites.
            </p>
          </div>

          <div className="grid gap-4">
            {trustSignals.map((signal) => {
              const Icon = signal.icon

              return (
                <Card key={signal.title} className="glass-card border border-white/10 bg-slate-900/40 p-4">
                  <CardHeader className="p-2 space-y-2">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg text-white font-semibold">{signal.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-sm leading-relaxed">{signal.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section (AEO/GEO Optimized) */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">FAQ</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
            <p className="text-lg leading-8 text-slate-300">
              Clear, direct answers to common questions about our delivery model, pricing structures, and engineering timelines in {locationName}.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 px-6 hover:border-cyan-400/20 transition-all duration-300"
              >
                <AccordionTrigger className="py-5 text-left text-lg text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-7 text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pt-12 sm:px-6 lg:px-8">
        <Card className="glass-card overflow-hidden border border-cyan-400/20 bg-slate-950/60 relative">
          <CardContent className="relative p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/8 via-transparent to-indigo-500/8" />
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_auto] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Start Your Project</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Ready to launch your web platform in {locationName}?
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-slate-300">
                  Get in touch with our solutions architects to map out a clear development timeline, choose the right technology architecture, and request a detailed proposal.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col shrink-0">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8">
                  <Link href="/contact">
                    Book a Discovery Call
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/[0.08] px-8">
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
