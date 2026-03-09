import CareersHero from "@/components/careers/careers-hero"
import CareersOpenings from "@/components/careers/careers-openings"
import CareersPerks from "@/components/careers/careers-perks"
import CareersValues from "@/components/careers/careers-values"
import CareersCTA from "@/components/careers/careers-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/careers")

export default function CareersPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <CareersHero />
      <CareersOpenings />
      <CareersPerks />
      <CareersValues />
      <CareersCTA />
    </div>
  )
}
