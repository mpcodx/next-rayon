import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/projects")

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
