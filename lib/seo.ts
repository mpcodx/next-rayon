import type { Metadata } from "next"

export const SITE_NAME = "Rayon Web Solutions"
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.rayonweb.com").replace(/\/$/, "")
export const DEFAULT_OG_IMAGE_PATH = "/new-1.png"
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`

type PageSeo = {
  title: string
  description: string
  keywords?: string[]
  noIndex?: boolean
}

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Web, App, AI & Cloud Development Company | Rayon Web Solutions",
    description:
      "Rayon Web Solutions builds high-performance web apps, mobile apps, AI/ML systems, DevOps pipelines, and UX-led digital products for growing businesses.",
  },
  "/about": {
    title: "About Rayon Web Solutions | Product and Engineering Partner",
    description:
      "Learn how Rayon Web Solutions helps startups and enterprises build scalable digital products with strategy, design, development, and AI.",
  },
  "/blog": {
    title: "Software, AI & Product Engineering Insights | Rayon Web Solutions",
    description:
      "Read practical articles from Rayon Web Solutions on web engineering, mobile delivery, AI integration, DevOps, UX, and product execution.",
  },
  "/careers": {
    title: "Careers | Rayon Web Solutions",
    description:
      "Explore engineering, design, and delivery opportunities at Rayon Web Solutions.",
  },
  "/contact": {
    title: "Contact Rayon Web Solutions | Start Your Project",
    description:
      "Talk to Rayon Web Solutions about web development, AI, app development, DevOps, UI/UX, QA, and custom software projects.",
  },
  "/faq": {
    title: "FAQ | Rayon Web Solutions",
    description:
      "Find answers to common questions about services, timelines, pricing, global delivery, and working with Rayon Web Solutions.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Rayon Web Solutions",
    description: "Read the privacy policy for Rayon Web Solutions and how we handle personal information.",
  },
  "/projects": {
    title: "Projects | Rayon Web Solutions",
    description:
      "See selected website, software, and digital product work delivered by Rayon Web Solutions.",
  },
  "/security": {
    title: "Security Practices | Rayon Web Solutions",
    description:
      "Learn about the security measures, delivery standards, and data protection practices used by Rayon Web Solutions.",
  },
  "/services": {
    title: "Software Development Services | Rayon Web Solutions",
    description:
      "Explore web development, app development, AI solutions, DevOps, QA, UI/UX, and LMS services built for startups and enterprises.",
  },
  "/software-development-company": {
    title: "Web, AI & Software Development Company | Rayon Web Solutions",
    description:
      "Rayon Web Solutions delivers web development, AI solutions, and custom software for startups, businesses, and enterprises worldwide.",
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
      "Explore practical training programs in full-stack development, mobile, DevOps, UI/UX, AI, and cybersecurity.",
  },
  "/training/courses": {
    title: "Training Courses | Rayon Web Solutions",
    description:
      "Explore detailed training programs in Full-Stack, MEAN/MERN, Mobile, DevOps, UI/UX, AI, and Cybersecurity with live mentorship.",
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
