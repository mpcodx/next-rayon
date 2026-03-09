import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getPageMetadata } from "@/lib/seo"

export const metadata: Metadata = getPageMetadata("/training")

export default function TrainingLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
