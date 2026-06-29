import type { Metadata } from "next"

export const SITE_NAME = "Rayon Web Solutions"
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.rayonweb.com").replace(/\/$/, "")
export const SITE_TAGLINE = "Your Vision, Our Code"
export const SITE_DESCRIPTION =
  "Software development company building web, mobile, AI/ML, DevOps, QA, and UI/UX products for startups and enterprises."
export const DEFAULT_OG_IMAGE_PATH = "/new-1.png"
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`
export const CONTACT_EMAIL = "info@rayonweb.com"
export const CONTACT_PHONE = "+91 7073-12-7076"
export const CONTACT_PHONE_URI = "+917073127076"
export const BUSINESS_LOCALITY = "Mohali"
export const BUSINESS_REGION = "Punjab"
export const BUSINESS_COUNTRY = "India"
export const BUSINESS_REGION_CODE = "IN-PB"
export const BUSINESS_COORDINATES = {
  latitude: "30.7046",
  longitude: "76.7179",
} as const
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=61573818253676",
  "https://www.instagram.com/rayonwebsolutions/",
  "https://www.linkedin.com/company/rayonwebsolutions/?viewAsMember=true",
] as const
export const SERVICE_AREAS = [
  "Worldwide",
] as const
export const SITE_KEYWORDS = [
  "Rayon Web Solutions",
  "Web Development",
  "App Development",
  "Python Django Development",
  "Backend Development",
  "DevOps",
  "Docker",
  "Kubernetes",
  "Cloud Services",
  "UI/UX Design",
  "LMS Integration",
  "QA Testing",
  "Automation",
  "AI Development",
  "Machine Learning Services",
  "LLM Development",
  "AI Integration Services",
  "Software Development Company",
  "global software development company",
  "USA web development company",
  "UAE web development company",
  "Australia web development company",
  "worldwide web development",
  "offshore web development partner",
  "web development training",
  "full stack development training",
  "software development training",
  "international software development services",
]

type PageSeo = {
  title: string
  description: string
  keywords?: string[]
  noIndex?: boolean
}

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Web, App, AI & Cloud Development Company | Rayon Web Solutions",
    description: "Rayon Web Solutions builds web, mobile, AI/ML, and DevOps products for startups and enterprises.",
    keywords: [
      "web development company",
      "software development company",
      "global software development company",
      "USA web development",
      "UAE web development",
      "Australia web development",
      "worldwide web development",
      "web development training",
      "full stack development training",
    ],
  },
  "/about": {
    title: "About Rayon Web Solutions | Product and Engineering Partner",
    description:
      "Meet Rayon Web Solutions, product and engineering partners helping startups and enterprises plan, design, build, and scale digital products with AI.",
  },
  "/blog": {
    title: "Software, AI & Product Engineering Insights | Rayon Web Solutions",
    description:
      "Read practical articles on web engineering, mobile delivery, AI integration, DevOps, UX, and product execution from the Rayon Web team and partners.",
  },
  "/careers": {
    title: "Careers | Rayon Web Solutions",
    description:
      "Explore current remote openings at Rayon Web Solutions across frontend development, backend AI/ML, and DevOps engineering.",
  },
  "/contact": {
    title: "Contact Rayon Web Solutions | Start Your Project",
    description:
      "Talk to Rayon Web Solutions about web development, AI, app development, DevOps, UI/UX, QA, and training support.",
    keywords: [
      "contact web development company",
      "global software development company contact",
      "USA web development company",
      "UAE web development company",
      "Australia web development company",
      "book discovery call",
      "web development consultation",
    ],
  },
  "/faq": {
    title: "FAQ | Rayon Web Solutions",
    description:
      "Find answers to common questions about services, timelines, pricing, and working with Rayon Web Solutions.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Rayon Web Solutions",
    description: "Read the privacy policy for Rayon Web Solutions and how we handle personal information.",
  },
  "/projects": {
    title: "Projects | Rayon Web Solutions",
    description:
      "Browse selected projects from Rayon Web Solutions, including web platforms, LMS systems, and product redesigns built for growth, reliability, and conversion.",
  },
  "/security": {
    title: "Security Practices | Rayon Web Solutions",
    description:
      "Learn about the security measures, delivery standards, and data protection practices used by Rayon Web Solutions.",
  },
  "/services": {
    title: "Software Development Services | Rayon Web Solutions",
    description:
      "Explore web, app, AI, DevOps, QA, UI/UX, and LMS services delivered by a team focused on measurable product outcomes and faster releases.",
    keywords: [
      "software development services",
      "web development services",
      "app development services",
      "global web development services",
      "USA web development services",
      "UAE web development services",
      "Australia web development services",
      "international software development services",
    ],
  },
  "/software-development-company": {
    title: "Web, AI & Software Development Company | Rayon Web Solutions",
    description:
      "Web, AI, and custom software development company for startups, businesses, and enterprises.",
    keywords: [
      "software development company",
      "web development company",
      "AI solutions company",
      "global software development company",
      "USA web development company",
      "UAE web development company",
      "Australia web development company",
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
  },
  "/sitemap": {
    title: "Sitemap | Rayon Web Solutions",
    description: "Complete sitemap of Rayon Web Solutions with links to services, company pages, and blog content.",
    noIndex: true,
  },
  "/terms": {
    title: "Terms of Use | Rayon Web Solutions",
    description: "Read the terms of use for Rayon Web Solutions services and website access.",
  },
  "/training": {
    title: "Technology Training Programs | Rayon Web Solutions",
    description:
      "Explore practical web development training, full-stack bootcamps, mobile, DevOps, UI/UX, AI, and cybersecurity programs online.",
    keywords: [
      "web development training",
      "full stack development training",
      "software development training",
      "online training programs",
      "React Next.js training",
      "DevOps training",
      "AI training",
    ],
  },
  "/training/courses": {
    title: "Training Courses | Rayon Web Solutions",
    description:
      "Explore detailed training programs in full-stack, MEAN/MERN, mobile, DevOps, UI/UX, AI, and cybersecurity with live mentorship.",
    keywords: [
      "web development courses",
      "full stack courses",
      "software training courses",
      "online React Next.js course",
      "DevOps course",
      "AI course",
    ],
  },
  "/services/ai-ml": {
    title: "AI & Machine Learning Services | Rayon Web Solutions",
    description:
      "AI integrations, LLM apps, predictive analytics, computer vision, and MLOps delivery for production use cases.",
  },
  "/services/ai-ml/ai-integration": {
    title: "AI Integration Services | Rayon Web Solutions",
    description:
      "Practical AI integrations for workflow automation, intelligent search, copilots, and customer-facing product features.",
  },
  "/services/ai-ml/computer-vision": {
    title: "Computer Vision Services | Rayon Web Solutions",
    description:
      "Computer vision solutions for detection, classification, OCR, and visual automation use cases.",
  },
  "/services/ai-ml/conversational-ai": {
    title: "Conversational AI Services | Rayon Web Solutions",
    description:
      "Chatbots and conversational systems built for customer support, internal workflows, and guided user experiences.",
  },
  "/services/ai-ml/custom-model-training": {
    title: "Custom Model Training Services | Rayon Web Solutions",
    description:
      "Train and tune custom machine learning models aligned with your data, domain requirements, and business objectives.",
  },
  "/services/ai-ml/hugging-face-models": {
    title: "Hugging Face Model Integration Services | Rayon Web Solutions",
    description:
      "Integrate Hugging Face models into product workflows with the right hosting, APIs, and evaluation strategy.",
  },
  "/services/ai-ml/llm-development": {
    title: "LLM Development Services | Rayon Web Solutions",
    description:
      "Custom LLM applications, retrieval workflows, prompt orchestration, and model-powered product experiences.",
  },
  "/services/ai-ml/mlops-model-monitoring": {
    title: "MLOps & Model Monitoring Services | Rayon Web Solutions",
    description:
      "Deployment, monitoring, observability, and lifecycle management for machine learning systems in production.",
  },
  "/services/ai-ml/predictive-analytics": {
    title: "Predictive Analytics Services | Rayon Web Solutions",
    description:
      "Forecasting and prediction systems that turn operational and customer data into actionable decisions.",
  },
  "/services/app-development": {
    title: "App Development Services | Rayon Web Solutions",
    description:
      "Mobile apps, progressive web apps, and cross-platform products built for growth-focused teams.",
    keywords: [
      "app development services",
      "mobile app development company",
      "cross-platform app development",
      "global app development company",
      "USA app development company",
      "UAE app development company",
      "Australia app development company",
    ],
  },
  "/services/app-development/cross-platform-apps": {
    title: "Cross-Platform App Development | Rayon Web Solutions",
    description:
      "Cross-platform applications that reduce delivery overhead while keeping user experience consistent across devices.",
  },
  "/services/app-development/mobile-apps": {
    title: "Mobile App Development Services | Rayon Web Solutions",
    description:
      "Native and hybrid mobile apps built for reliable performance, strong UX, and long-term maintainability.",
  },
  "/services/app-development/progressive-web-apps": {
    title: "Progressive Web App Development | Rayon Web Solutions",
    description:
      "Fast, installable PWAs that combine web reach with app-like performance and offline-ready experiences.",
  },
  "/services/devops-cloud": {
    title: "DevOps & Cloud Services | Rayon Web Solutions",
    description:
      "Cloud setup, CI/CD, containers, Kubernetes, and delivery infrastructure for reliable releases.",
  },
  "/services/devops-cloud/ci-cd-pipelines": {
    title: "CI/CD Pipeline Services | Rayon Web Solutions",
    description:
      "Automated build, test, and deployment pipelines that improve release speed and reliability.",
  },
  "/services/devops-cloud/cloud-setup": {
    title: "Cloud Setup Services | Rayon Web Solutions",
    description:
      "Cloud architecture, environment setup, and deployment foundations for scalable products.",
  },
  "/services/devops-cloud/docker-kubernetes": {
    title: "Docker & Kubernetes Services | Rayon Web Solutions",
    description:
      "Containerization and orchestration services for scalable workloads and reliable infrastructure operations.",
  },
  "/services/lms-integration": {
    title: "LMS Integration Services | Rayon Web Solutions",
    description:
      "Custom LMS platforms, payment flows, and CRM/API integrations for education and training businesses.",
  },
  "/services/lms-integration/crm-api-integration": {
    title: "CRM & API Integration Services | Rayon Web Solutions",
    description:
      "CRM and API integrations that connect course, sales, and operations data across your systems.",
  },
  "/services/lms-integration/custom-lms": {
    title: "Custom LMS Development | Rayon Web Solutions",
    description:
      "Custom learning management systems built for course delivery, reporting, and scalable learner experiences.",
  },
  "/services/lms-integration/payment-integration": {
    title: "Payment Integration Services | Rayon Web Solutions",
    description:
      "Secure payment workflows and gateway integrations for LMS, ecommerce, and subscription products.",
  },
  "/services/qa-automation": {
    title: "QA Automation Services | Rayon Web Solutions",
    description:
      "Manual testing, automated CI testing, and performance audits for stable software delivery.",
  },
  "/services/qa-automation/automated-ci-tests": {
    title: "Automated CI Testing Services | Rayon Web Solutions",
    description:
      "Automated test suites integrated into CI pipelines to catch regressions early and improve release confidence.",
  },
  "/services/qa-automation/manual-testing": {
    title: "Manual Testing Services | Rayon Web Solutions",
    description:
      "Exploratory and structured manual testing that identifies defects before they reach production.",
  },
  "/services/qa-automation/performance-audits": {
    title: "Performance Audit Services | Rayon Web Solutions",
    description:
      "Performance audits for web and app products focused on speed, stability, and conversion impact.",
  },
  "/services/ui-ux-design": {
    title: "UI/UX Design Services | Rayon Web Solutions",
    description:
      "Wireframes, product design, web and mobile UX, and design systems that improve clarity and adoption.",
  },
  "/services/ui-ux-design/design-systems": {
    title: "Design System Services | Rayon Web Solutions",
    description:
      "Reusable design systems and component foundations that improve consistency across product teams.",
  },
  "/services/ui-ux-design/web-mobile-design": {
    title: "Web & Mobile Design Services | Rayon Web Solutions",
    description:
      "User-centered interface design for websites, dashboards, SaaS platforms, and mobile applications.",
  },
  "/services/ui-ux-design/wireframes-prototyping": {
    title: "Wireframes & Prototyping Services | Rayon Web Solutions",
    description:
      "Wireframes and interactive prototypes that validate user flows before engineering begins.",
  },
  "/services/web-development": {
    title: "Web Development Services | Rayon Web Solutions",
    description:
      "Custom websites, web apps, ecommerce, and CMS development built for performance, SEO, and conversion.",
    keywords: [
      "web development services",
      "custom website development",
      "SEO friendly web design",
      "global web development company",
      "ecommerce website development",
      "USA web development services",
      "UAE web development services",
      "Australia web development services",
    ],
  },
  "/services/web-development/cms-integration": {
    title: "CMS Integration Services | Rayon Web Solutions",
    description:
      "CMS setup and integration for teams that need flexible content publishing without sacrificing performance.",
  },
  "/services/web-development/custom-website-design": {
    title: "Custom Website Design Services | Rayon Web Solutions",
    description:
      "Responsive, brand-led website design and development focused on speed, usability, and search visibility.",
  },
  "/services/web-development/ecommerce-solutions": {
    title: "Ecommerce Development Services | Rayon Web Solutions",
    description:
      "Custom ecommerce stores, checkout flows, payment integrations, and scalable storefront experiences.",
  },
}

export const SEO_PAGE_PATHS = Object.keys(PAGE_SEO)
export const SITEMAP_PATHS = Object.entries(PAGE_SEO)
  .filter(([, seo]) => !seo.noIndex)
  .map(([path]) => path)

type JsonLdNode = Record<string, unknown>

function normalizePath(path: string) {
  if (!path || path === "/") return "/"
  const pathWithLeadingSlash = path.startsWith("/") ? path : `/${path}`
  return pathWithLeadingSlash.replace(/\/$/, "")
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${SITE_URL}${normalizePath(path)}`
}

export function serializeJsonLd(node: JsonLdNode | JsonLdNode[]) {
  return JSON.stringify(node).replace(/</g, "\\u003c")
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Rayon Web",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE_URL,
    image: DEFAULT_OG_IMAGE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        availableLanguage: ["English"],
        areaServed: [...SERVICE_AREAS],
      },
    ],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "AI Development",
      "Machine Learning",
      "DevOps",
      "Cloud Engineering",
      "QA Automation",
      "UI/UX Design",
    ],
  }
}

export function buildProfessionalServiceSchema() {
  // Local SEO / AEO: keep schema specific and consistent.
  // Google can use these cues for entity understanding; it also improves clarity for AI crawlers.
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professional-service`,
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE_URL,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,

    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,

    // Geography
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_LOCALITY,
      addressRegion: BUSINESS_REGION,
      addressCountry: BUSINESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_COORDINATES.latitude,
      longitude: BUSINESS_COORDINATES.longitude,
    },

    // Service area signals (use both city/region and a generic worldwide area)
    areaServed: [BUSINESS_LOCALITY, BUSINESS_REGION, ...SERVICE_AREAS],

    // Hours (useful for some assistants/search features)
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],

    sameAs: [...SOCIAL_PROFILES],

    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Software Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Machine Learning Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "DevOps & Cloud Services",
        },
      },
    ],
  }
}


export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
  }
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

type BuildPageMetadataOptions = PageSeo & {
  path: string
  image?: string
  imageAlt?: string
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
  image = DEFAULT_OG_IMAGE_PATH,
  imageAlt = `${SITE_NAME} preview image`,
}: BuildPageMetadataOptions): Metadata {
  const canonical = normalizePath(path)
  const imageUrl = absoluteUrl(image)

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    category: "technology",
    classification: "Software Development Company",
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@rayonweb",
    },
  }
}

export function getPageMetadata(path: string) {
  const seo = PAGE_SEO[path]

  if (!seo) {
    throw new Error(`Missing SEO metadata for route: ${path}`)
  }

  return buildPageMetadata({
    path,
    ...seo,
  })
}
