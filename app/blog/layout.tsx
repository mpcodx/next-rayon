import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/blog")

export default function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
