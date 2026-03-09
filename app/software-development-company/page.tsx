import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  Bot,
  Building2,
  Code2,
  Globe,
  Layers3,
  LineChart,
  Rocket,
  ShieldCheck,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pageTitle = "Web, AI & Software Development Company | Rayon Web Solutions"
const pageDescription =
  "Rayon Web Solutions delivers web development, AI solutions, and custom software for startups, businesses, and enterprises worldwide with expert delivery."
const pageUrl = "https://rayonweb.com/software-development-company/"
const inlineLinkClass = "text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"

const servicePillars = [
  {
    title: "Web Development Services",
    description:
      "Conversion-focused websites, portals, SaaS products, and web applications built for speed, usability, and search visibility.",
    href: "/services/web-development",
    icon: Code2,
  },
  {
    title: "AI Solutions",
    description:
      "Practical AI integrations, LLM workflows, predictive analytics, and automation systems designed around measurable business value.",
    href: "/services/ai-ml",
    icon: Bot,
  },
  {
    title: "Custom Software Development",
    description:
      "Scalable internal platforms, customer systems, and business software aligned with your operations, integrations, and growth plans.",
    href: "/services/app-development",
    icon: Layers3,
  },
] as const

const trustSignals = [
  {
    title: "Global delivery model",
    description: "Support for startups, growing businesses, and enterprise teams across markets and time zones.",
    icon: Globe,
  },
  {
    title: "Commercially aligned execution",
    description: "Architecture, UX, and feature prioritization tied directly to revenue, efficiency, and adoption goals.",
    icon: LineChart,
  },
  {
    title: "Built for scale",
    description: "Maintainable codebases, flexible integrations, and cloud-ready systems that support future releases.",
    icon: Rocket,
  },
  {
    title: "Reliable delivery standards",
    description: "Security, QA, performance, and deployment discipline built into the process instead of added later.",
    icon: ShieldCheck,
  },
] as const

const processSteps = [
  {
    title: "Discovery and planning",
    description: "We define goals, audiences, risks, integrations, and delivery priorities before implementation starts.",
  },
  {
    title: "UX, architecture, and scope",
    description: "Product structure, user journeys, and technical foundations are shaped around the outcome you need.",
  },
  {
    title: "Iterative development",
    description: "Frontend, backend, integrations, and AI workflows are shipped in controlled phases with regular feedback.",
  },
  {
    title: "QA, launch, and optimization",
    description: "Testing, deployment, monitoring, and post-launch improvements keep the product stable after release.",
  },
] as const

const faqItems = [
  {
    question: "What services does Rayon Web Solutions provide?",
    answer:
      "Rayon Web Solutions provides web development, AI solutions, custom software development, app development, UI/UX design, DevOps and cloud support, QA automation, and integration services for startups, businesses, and enterprise teams.",
  },
  {
    question: "Do you work with startups as well as enterprise teams?",
    answer:
      "Yes. We support startups that need MVP development and growth planning, businesses that need scalable platforms, and enterprise teams that need modernization, integrations, performance, and long-term delivery support.",
  },
  {
    question: "Can you combine web development and AI solutions in one project?",
    answer:
      "Yes. We regularly build websites and web applications that include AI capabilities such as chatbots, workflow automation, predictive analytics, intelligent search, and document processing in the same roadmap.",
  },
  {
    question: "How long does a custom software development project take?",
    answer:
      "Timelines depend on complexity, feature depth, integrations, and stakeholder alignment. A focused MVP can take a few weeks, while a larger multi-team platform can take several months. We define scope and phases early so delivery expectations stay clear.",
  },
  {
    question: "Do you provide post-launch support and optimization?",
    answer:
      "Yes. We support bug fixes, performance tuning, feature expansion, QA, cloud deployment, monitoring, and continuous optimization after launch so your software keeps creating value.",
  },
  {
    question: "Why choose a global software development company like Rayon Web Solutions?",
    answer:
      "A global delivery model gives businesses access to broader technical expertise, flexible execution, and efficient development without sacrificing quality. We pair that reach with structured communication and accountable delivery.",
  },
] as const

const relatedPages = [
  { label: "Custom Website Design", href: "/services/web-development/custom-website-design" },
  { label: "CMS Integration", href: "/services/web-development/cms-integration" },
  { label: "AI Integration", href: "/services/ai-ml/ai-integration" },
  { label: "LLM Development", href: "/services/ai-ml/llm-development" },
  { label: "DevOps & Cloud", href: "/services/devops-cloud" },
  { label: "QA & Automation", href: "/services/qa-automation" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
] as const

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  keywords: [
    "software development company",
    "web development company",
    "AI solutions company",
    "custom software development",
    "global software development services",
    "custom website development",
    "AI integration services",
    "enterprise software development",
    "startup software development company",
    "scalable web applications",
    "business automation solutions",
    "mobile app development",
    "technical SEO web development",
  ],
  alternates: {
    canonical: "/software-development-company/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "Rayon Web Solutions",
    images: [
      {
        url: "https://rayonweb.com/images/new-1.png",
        width: 1200,
        height: 630,
        alt: "Rayon Web Solutions web, AI, and software development services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["https://rayonweb.com/images/new-1.png"],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rayonweb.com/#organization",
      name: "Rayon Web Solutions",
      url: "https://rayonweb.com",
      logo: "https://rayonweb.com/images/new-1.png",
      email: "info@rayonweb.com",
      description:
        "Global software development company delivering web development, AI solutions, and custom software services.",
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": "https://rayonweb.com/#website",
      url: "https://rayonweb.com",
      name: "Rayon Web Solutions",
      publisher: {
        "@id": "https://rayonweb.com/#organization",
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
          item: "https://rayonweb.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Software Development Company",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      isPartOf: {
        "@id": "https://rayonweb.com/#website",
      },
      about: {
        "@id": "https://rayonweb.com/#organization",
      },
      inLanguage: "en",
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Web, AI & Software Development Services",
      url: pageUrl,
      provider: {
        "@id": "https://rayonweb.com/#organization",
      },
      areaServed: "Worldwide",
      serviceType: ["Web Development", "AI Solutions", "Custom Software Development"],
      audience: {
        "@type": "Audience",
        audienceType: "Startups, Businesses, and Enterprises",
      },
      description:
        "Rayon Web Solutions builds scalable websites, AI products, and custom software platforms for startups, businesses, and enterprises worldwide.",
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

export default function SoftwareDevelopmentCompanyPage() {
  return (
    <main className="pb-20">
      <Script
        id="software-development-company-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden pb-12 pt-16">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
                Global delivery for startups, businesses, and enterprises
              </span>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Web, AI & Software Development Company for Startups and Enterprises
                </h1>
                <p className="max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
                  Rayon Web Solutions helps organizations build high-performance websites, intelligent applications,
                  and custom software systems that improve customer experience, streamline operations, and support
                  sustainable growth across global markets.
                </p>
                <p className="max-w-4xl text-lg leading-8 text-slate-300">
                  We combine strategy, UX, engineering, QA, deployment, and optimization in one delivery process so
                  your product is ready for real adoption, not just release day. From early-stage MVPs to enterprise
                  modernization projects, the focus stays on measurable business outcomes.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a Discovery Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>

            <Card className="glass-card border border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">SEO positioning built into the page</CardTitle>
                <CardDescription className="text-slate-300">
                  This landing page targets high-intent searches around web development, AI solutions, and custom
                  software delivery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-white">Focus keywords</p>
                  <p>software development company, web development company, AI solutions company</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Secondary keywords</p>
                  <p>custom software development, enterprise software development, AI integration services</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Primary CTA</p>
                  <p>Book a Discovery Call</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Suggested URL</p>
                  <p>/software-development-company/</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {servicePillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <Card key={pillar.title} className="glass-card border border-white/10">
                <CardHeader className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-white">{pillar.title}</CardTitle>
                    <CardDescription className="text-slate-300">{pillar.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={pillar.href} className="inline-flex items-center gap-2 font-medium text-cyan-300">
                    View service
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Growth-ready delivery</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Build Digital Products That Scale With Your Business
            </h2>
            <h3 className="text-2xl font-semibold text-white">Strategy-led development focused on outcomes</h3>
            <p className="text-lg leading-8 text-slate-300">
              Every engagement starts with clarity. Before writing code, we define your target audience, goals,
              technical constraints, integration needs, and growth targets. That discovery process helps us recommend
              the right roadmap for founders validating an MVP, businesses replacing manual work with software, and
              enterprise teams modernizing legacy systems without creating unnecessary risk.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Product decisions only create value when they connect to commercial priorities. By aligning roadmap,
              architecture, and user journeys with measurable outcomes, we reduce wasted effort and create software
              that is easier to launch, easier to maintain, and easier to expand as your market, service offering, or
              operational complexity grows.
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Built for performance, usability, and search visibility
            </h3>
            <p className="text-lg leading-8 text-slate-300">
              Modern buyers expect digital experiences that are fast, intuitive, and credible from the first visit.
              Our development approach prioritizes mobile responsiveness, technical SEO, accessibility, structured
              content, and conversion-focused UX so your platform is positioned to rank well, engage visitors, and move
              users toward the next action with less friction.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              That also means your team receives a maintainable codebase instead of a short-term build. When software is
              engineered around performance, search visibility, and clean architecture from the start, it becomes far
              easier to add new features, publish content, improve funnel performance, and support future growth without
              continuous rework.
            </p>
          </div>

          <div className="grid gap-4">
            {trustSignals.map((signal) => {
              const Icon = signal.icon

              return (
                <Card key={signal.title} className="glass-card border border-white/10">
                  <CardHeader className="space-y-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl text-white">{signal.title}</CardTitle>
                    <CardDescription className="text-slate-300">{signal.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Web Development Services That Turn Traffic Into Revenue
            </h2>
            <h3 className="text-2xl font-semibold text-white">Custom websites and web applications</h3>
            <p className="text-lg leading-8 text-slate-300">
              As a web development company, Rayon Web Solutions builds websites and applications that do more than look
              polished. We create digital experiences that support lead generation, ecommerce performance, customer
              self-service, and operational efficiency. From brand-led websites to custom portals and SaaS platforms,
              the work is shaped around information clarity, fast performance, intuitive journeys, and conversion
              intent.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              If you want buyers to trust your business online, every touchpoint needs to feel seamless. That includes
              navigation, load speed, messaging hierarchy, mobile usability, and the technical foundation behind the
              experience. Our team builds websites that help companies communicate value clearly while keeping the
              backend flexible enough for future content, campaigns, and integrations.
            </p>
            <h3 className="text-2xl font-semibold text-white">Ecommerce, CMS, and integration-ready platforms</h3>
            <p className="text-lg leading-8 text-slate-300">
              We also develop platforms that connect with the systems your business already relies on. That includes
              ecommerce builds, CMS implementations, API integrations, and workflow automation that keep your teams
              efficient behind the scenes. Instead of forcing your business into a rigid template, we create flexible
              solutions that support real marketing workflows, product requirements, and long-term expansion plans.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              If you want to explore supporting pages from this section, start with{" "}
              <Link href="/services/web-development" className={inlineLinkClass}>
                web development services
              </Link>
              ,{" "}
              <Link href="/services/web-development/custom-website-design" className={inlineLinkClass}>
                custom website design
              </Link>
              , and{" "}
              <Link href="/services/web-development/cms-integration" className={inlineLinkClass}>
                CMS integration
              </Link>
              . Those pages reinforce topical relevance while giving users clear paths into more specific solutions.
            </p>
          </div>

          <Card className="glass-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Related internal links</CardTitle>
              <CardDescription className="text-slate-300">
                Use contextual anchor text from this page to strengthen crawl paths and service discovery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 hover:border-cyan-400/30 hover:bg-white/[0.05]"
                >
                  <span>{page.label}</span>
                  <ArrowRight className="h-4 w-4 text-cyan-300" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            AI Solutions That Create Real Operational Value
          </h2>
          <h3 className="text-2xl font-semibold text-white">
            AI integration for automation, insight, and customer experience
          </h3>
          <p className="text-lg leading-8 text-slate-300">
            AI becomes valuable when it solves clear business problems. Rayon Web Solutions builds AI solutions that
            help companies automate repetitive work, improve decision-making, personalize digital experiences, and
            respond faster to customers. That can include AI integration, predictive analytics, intelligent search,
            conversational interfaces, and document-driven workflows, all designed around practical ROI instead of
            novelty.
          </p>
          <p className="text-lg leading-8 text-slate-300">
            Instead of treating AI as a separate experiment, we treat it as a capability that must connect cleanly to
            your product, operations, and data. That creates more reliable adoption because the system fits existing
            workflows, team responsibilities, and performance expectations rather than sitting outside the business as a
            disconnected prototype.
          </p>
          <h3 className="text-2xl font-semibold text-white">Practical AI delivery backed by modern engineering</h3>
          <p className="text-lg leading-8 text-slate-300">
            Strong AI solutions require more than a model. They need clean architecture, reliable data flow, testing,
            monitoring, and governance to perform consistently after release. Our team supports LLM-powered
            applications, chatbot experiences, forecasting workflows, and production-ready machine learning
            implementations with the infrastructure needed to keep them useful over time.
          </p>
          <p className="text-lg leading-8 text-slate-300">
            To deepen topic coverage and improve site-wide SEO, connect this section to{" "}
            <Link href="/services/ai-ml" className={inlineLinkClass}>
              AI and machine learning services
            </Link>
            ,{" "}
            <Link href="/services/ai-ml/ai-integration" className={inlineLinkClass}>
              AI integration
            </Link>
            ,{" "}
            <Link href="/services/ai-ml/llm-development" className={inlineLinkClass}>
              LLM development
            </Link>
            , and{" "}
            <Link href="/services/ai-ml/mlops-model-monitoring" className={inlineLinkClass}>
              MLOps and model monitoring
            </Link>
            . Those supporting pages create stronger semantic depth around AI delivery and implementation quality.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Custom Software Development for Startups, Businesses, and Enterprises
          </h2>
          <h3 className="text-2xl font-semibold text-white">MVP development for startups and growth-stage teams</h3>
          <p className="text-lg leading-8 text-slate-300">
            Startups need speed, focus, and a realistic path to launch. We help founders and product teams turn early
            concepts into usable products with the right feature set, architecture, and user experience for fast
            validation. That may include a SaaS MVP, a marketplace, a customer portal, a mobile application, or an
            internal workflow tool that improves execution while the business scales.
          </p>
          <p className="text-lg leading-8 text-slate-300">
            By building only what moves the product forward, we help reduce unnecessary cost and keep the foundation
            stable for iteration after customer feedback arrives. This matters because early product velocity depends on
            disciplined scope, clear ownership, and an engineering approach that balances speed with future
            maintainability.
          </p>
          <h3 className="text-2xl font-semibold text-white">Scalable systems for complex business operations</h3>
          <p className="text-lg leading-8 text-slate-300">
            For established businesses and enterprise teams, custom software development is often about replacing
            bottlenecks, connecting systems, and improving visibility across operations. Rayon Web Solutions builds
            software that supports internal workflows, reporting, customer data, integrations, and secure access across
            multiple teams without forcing the business into generic tooling that only solves part of the problem.
          </p>
          <p className="text-lg leading-8 text-slate-300">
            Relevant internal destinations from this section include{" "}
            <Link href="/services/app-development" className={inlineLinkClass}>
              app development services
            </Link>
            ,{" "}
            <Link href="/services/devops-cloud" className={inlineLinkClass}>
              DevOps and cloud services
            </Link>
            ,{" "}
            <Link href="/services/qa-automation" className={inlineLinkClass}>
              QA and automation
            </Link>
            , and{" "}
            <Link href="/services/ui-ux-design" className={inlineLinkClass}>
              UI/UX design
            </Link>
            . Together, those pages explain how delivery, deployment, quality, and product usability support long-term
            software performance.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Businesses Choose Rayon Web Solutions</h2>
            <h3 className="text-2xl font-semibold text-white">
              Global delivery with clear communication and accountable execution
            </h3>
            <p className="text-lg leading-8 text-slate-300">
              Businesses working with distributed vendors often struggle with missed timelines, unclear ownership, and
              uneven quality. Rayon Web Solutions solves that by keeping delivery structured, transparent, and
              collaborative. We define milestones, communicate regularly, and keep technical decisions tied to business
              goals so clients understand what is being built, why it matters, and how it supports the larger roadmap.
            </p>
            <h3 className="text-2xl font-semibold text-white">Secure, scalable, and built for long-term growth</h3>
            <p className="text-lg leading-8 text-slate-300">
              Our work is designed for durability. We prioritize security, performance, code quality, QA, and
              deployment stability because successful digital products must continue to perform after launch. Whether
              you are building a high-growth platform or modernizing an existing system, the goal is a solution that
              supports future releases, third-party integrations, and rising user demand without constant instability.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              To strengthen trust signals across the site, connect this section to{" "}
              <Link href="/projects" className={inlineLinkClass}>
                projects
              </Link>
              ,{" "}
              <Link href="/about" className={inlineLinkClass}>
                the about page
              </Link>
              ,{" "}
              <Link href="/blog" className={inlineLinkClass}>
                the blog
              </Link>
              , and{" "}
              <Link href="/contact" className={inlineLinkClass}>
                the contact page
              </Link>
              . Those links reinforce credibility while giving users more ways to validate expertise before reaching
              out.
            </p>
          </div>

          <Card className="glass-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Best-fit audiences</CardTitle>
              <CardDescription className="text-slate-300">
                This page is written to serve high-intent visitors across multiple buying stages.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <Rocket className="h-4 w-4 text-cyan-300" />
                  <span className="font-semibold">Startups</span>
                </div>
                <p className="text-sm">MVP builds, product validation, rapid iteration, and launch-ready architecture.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <Building2 className="h-4 w-4 text-cyan-300" />
                  <span className="font-semibold">Businesses</span>
                </div>
                <p className="text-sm">Scalable websites, automation, integrations, and software that removes bottlenecks.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                  <span className="font-semibold">Enterprises</span>
                </div>
                <p className="text-sm">Modernization, secure architecture, multi-team delivery, and long-term execution support.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Process for Consistent Delivery</h2>
          <p className="max-w-4xl text-lg leading-8 text-slate-300">
            Rayon Web Solutions follows a practical development model that reduces risk and keeps projects moving. We
            start with discovery and planning, move into UX and architecture, build in iterative phases, validate with
            QA, and support launch with deployment and monitoring. After release, we help clients improve performance,
            expand functionality, and respond to user feedback without losing product stability.
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <Card key={step.title} className="glass-card border border-white/10">
                <CardHeader>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">FAQ</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Answers for high-intent buyers</h2>
            <p className="text-lg leading-8 text-slate-300">
              This FAQ section supports rich results, addresses common objections, and gives search engines clearer
              context around the services and audience fit of the page.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 px-6"
              >
                <AccordionTrigger className="py-5 text-left text-lg text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-7 text-slate-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <Card className="glass-card overflow-hidden border border-cyan-400/20">
          <CardContent className="relative p-8 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/8 via-transparent to-indigo-500/8" />
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_auto] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Call to action</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Need a website, AI workflow, or software platform that can scale with your business?
                </h2>
                <p className="max-w-3xl text-lg leading-8 text-slate-300">
                  Talk to Rayon Web Solutions about your goals, timeline, and technical requirements. We can help you
                  shape the right roadmap for launch, modernization, or growth.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a Discovery Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">View Recent Projects</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
