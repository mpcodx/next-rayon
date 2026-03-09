import LegalHero from "@/components/legal/legal-hero"
import LegalContent from "@/components/legal/legal-content"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/privacy-policy")

export default function PrivacyPolicyPage() {
  const pageData = {
    title: "Privacy Policy",
    lastUpdated: "May 1, 2023",
    content: [
      {
        heading: "Introduction",
        text: "At Rayon Web Solutions, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
      },
      {
        heading: "Information We Collect",
        text: "We may collect, use, store and transfer different kinds of personal data about you including your name, contact details, technical data including internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform, and other technology on the devices you use to access this website.",
      },
      {
        heading: "How We Use Your Information",
        text: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide our services to you, to manage our relationship with you, to improve our website and services, and where necessary to comply with a legal or regulatory obligation.",
      },
      {
        heading: "Data Security",
        text: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We also limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
      },
      {
        heading: "Your Legal Rights",
        text: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access to your personal data, request correction of your personal data, request erasure of your personal data, object to processing of your personal data, and request restriction of processing your personal data.",
      },
      {
        heading: "Changes to This Privacy Policy",
        text: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'last updated' date at the top of this privacy policy.",
      },
      {
        heading: "Contact Us",
        text: "If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@rayonwebsolutions.com.",
      },
    ],
  }

  return (
    <div className="flex flex-col gap-12 pb-20">
      <LegalHero title={pageData.title} lastUpdated={pageData.lastUpdated} />
      <LegalContent content={pageData.content} />
    </div>
  )
}
