import CareersHero from "@/components/careers/careers-hero"
import CareersOpenings from "@/components/careers/careers-openings"
import CareersPerks from "@/components/careers/careers-perks"
import CareersValues from "@/components/careers/careers-values"
import CareersCTA from "@/components/careers/careers-cta"
import {
  getPageMetadata,
  buildFrontendJobPostingSchema,
  buildCareersFaqSchema,
  serializeJsonLd,
  SITE_URL,
} from "@/lib/seo"

export const metadata = getPageMetadata("/careers")

export default function CareersPage() {
  const jobPostingSchema = buildFrontendJobPostingSchema()
  const faqSchema = buildCareersFaqSchema()
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Careers",
        item: `${SITE_URL}/careers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Frontend Developer (Fresher)",
        item: `${SITE_URL}/careers#frontend-developer`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([jobPostingSchema, faqSchema, breadcrumbSchema]),
        }}
      />
      <div className="flex flex-col gap-20 pb-20">
        <CareersHero />
        <CareersOpenings />
        <CareersPerks />
        <CareersValues />
        <CareersCTA />
      </div>
    </>
  )
}
