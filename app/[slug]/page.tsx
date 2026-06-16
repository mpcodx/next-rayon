import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { locationsList, getLocationBySlug } from "@/lib/locations"
import { buildPageMetadata } from "@/lib/seo"
import LocalSeoTemplate from "@/components/local-seo/local-seo-template"

interface LocalSeoPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locationsList.map((loc) => ({ slug: loc.slug }))
}

export async function generateMetadata({ params }: LocalSeoPageProps): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocationBySlug(slug)

  if (!loc) {
    return {
      title: "Page Not Found",
    }
  }

  return buildPageMetadata({
    title: loc.title,
    description: loc.description,
    path: `/${loc.slug}`,
    keywords: loc.keywords,
    imageAlt: `Web development services in ${loc.locationName} - Rayon Web Solutions`,
  })
}

export default async function LocalSeoPage({ params }: LocalSeoPageProps) {
  const { slug } = await params
  const loc = getLocationBySlug(slug)

  if (!loc) {
    notFound()
  }

  return (
    <LocalSeoTemplate
      locationName={loc.locationName}
      region={loc.region}
      title={loc.title}
      description={loc.description}
      slug={loc.slug}
      keywords={loc.keywords}
    />
  )
}
