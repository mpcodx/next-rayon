import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import Script from "next/script"

// Static components that don't need optimization
import FeaturedServices from "@/components/home/featured-services"
import Testimonials from "@/components/home/testimonials"
import ClientLogos from "@/components/home/client-logos"
import CTASection from "@/components/home/cta-section"
import { DEFAULT_OG_IMAGE_URL, SITE_NAME, SITE_URL, getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/")

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
    name: SITE_NAME,
    url: SITE_URL,
    email: "info@rayonweb.com",
    logo: DEFAULT_OG_IMAGE_URL,
    description:
      "Software development company delivering web, app, AI/ML, DevOps, and UI/UX services.",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
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
