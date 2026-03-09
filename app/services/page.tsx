import ServicesHero from "@/components/services/services-hero"
import ServicesList from "@/components/services/services-list"
import ProcessSection from "@/components/services/process-section"
import TechnologiesSection from "@/components/services/technologies-section"
import ServicesCTA from "@/components/services/services-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services")

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <ServicesHero />
      <ServicesList />
      <ProcessSection />
      <TechnologiesSection />
      <ServicesCTA />
    </div>
  )
}
