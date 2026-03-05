import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import Script from "next/script"

// Static components that don't need optimization
import FeaturedServices from "@/components/home/featured-services"
import Testimonials from "@/components/home/testimonials"
import ClientLogos from "@/components/home/client-logos"
import CTASection from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "Web, App, AI & Cloud Development Company",
  description:
    "Rayon Web Solutions builds high-performance web apps, mobile apps, AI/ML systems, DevOps pipelines, and UX-led digital products for growing businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Web, App, AI & Cloud Development Company | Rayon Web Solutions",
    description:
      "Engineering-first partner for web platforms, mobile apps, DevOps, and AI/ML product development.",
    url: "https://rayonweb.com",
    siteName: "Rayon Web Solutions",
    images: [
      {
        url: "https://rayonweb.com/images/new-1.png",
        width: 1200,
        height: 630,
        alt: "Rayon Web Solutions - Software Development Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web, App, AI & Cloud Development Company | Rayon Web Solutions",
    description:
      "Build secure and scalable digital products with Rayon Web Solutions.",
    images: ["https://rayonweb.com/images/new-1.png"],
  },
}

// Dynamically import the heavy Hero component
const Hero = dynamic(() => import("@/components/home/hero"), {
  loading: () => (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse"></div>
    </div>
  ),
  ssr: true,
})

// Dynamically import the RecentProjects component with images
const RecentProjects = dynamic(() => import("@/components/home/recent-projects"), {
  ssr: true,
})

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rayon Web Solutions",
    url: "https://rayonweb.com",
    email: "info@rayonweb.com",
    logo: "https://rayonweb.com/images/new-1.png",
    description:
      "Software development company delivering web, app, AI/ML, DevOps, and UI/UX services.",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rayon Web Solutions",
    url: "https://rayonweb.com",
  }

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Suspense
        fallback={
          <div className="min-h-[90vh] flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse"></div>
          </div>
        }
      >
        <Hero />
      </Suspense>
      <FeaturedServices />
      <RecentProjects />
      <Testimonials />
      <ClientLogos />
      <CTASection />
    </div>
  )
}
