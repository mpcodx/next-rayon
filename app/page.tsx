import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Static components that don't need optimization
import FeaturedServices from "@/components/home/featured-services"
import Testimonials from "@/components/home/testimonials"
import ClientLogos from "@/components/home/client-logos"
import CTASection from "@/components/home/cta-section"
import { getPageMetadata } from "@/lib/seo"

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
  return (
    <div className="flex flex-col gap-20 pb-20">
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
