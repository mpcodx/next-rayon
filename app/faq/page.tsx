import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactCTA from "@/components/contact/contact-cta"
import ContactFAQ from "@/components/contact/contact-faq"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/faq")

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-8 sm:p-10 md:p-12 border border-white/15">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-4">FAQ</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Answers Before You Start the Project</h1>
            <p className="text-lg text-gray-300/90 mb-8">
              Find quick answers about timelines, pricing, communication, support, and how Rayon Web Solutions works
              with clients across regions and project types.
            </p>
            <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-8">
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <ContactFAQ />
      <ContactCTA />
    </main>
  )
}
