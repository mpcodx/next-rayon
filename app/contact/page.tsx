import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import EnhancedContactInfo from "@/components/contact/enhanced-contact-info"
import ContactMap from "@/components/contact/contact-map"
import ContactFAQ from "@/components/contact/contact-faq"
import ContactCTA from "@/components/contact/contact-cta"

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <ContactHero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <EnhancedContactInfo />
        </div>
      </div>
      <ContactMap />
      <ContactFAQ />
      <ContactCTA />
    </div>
  )
}
