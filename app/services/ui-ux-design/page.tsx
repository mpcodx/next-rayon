import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceFeatures from "@/components/services/service-features"
import ServiceProcess from "@/components/services/service-process"
import ServiceCaseStudies from "@/components/services/service-case-studies"
import ServiceFAQ from "@/components/services/service-faq"
import ServiceCTA from "@/components/services/service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ui-ux-design")

export default function UIUXDesignPage() {
  const serviceData = {
    title: "UI/UX Design",
    description: "User-centered design with wireframes, prototypes, and comprehensive design systems.",
    icon: "Palette",
    color: "from-pink-500 to-purple-500",
    features: [
      {
        title: "Wireframes & Prototyping",
        description:
          "Create interactive wireframes and prototypes to visualize and test your digital product before development.",
        link: "/services/ui-ux-design/wireframes-prototyping",
      },
      {
        title: "Web & Mobile App Design",
        description: "Beautiful, intuitive, and responsive designs for web and mobile applications.",
        link: "/services/ui-ux-design/web-mobile-design",
      },
      {
        title: "Design Systems",
        description:
          "Comprehensive design systems with reusable components for consistent user experiences across products.",
        link: "/services/ui-ux-design/design-systems",
      },
    ],
    process: [
      "User Research",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Usability Testing",
      "Design Handoff",
    ],
    caseStudies: [
      {
        title: "Banking App Redesign",
        description: "Complete redesign of a banking application with focus on user experience and accessibility.",
        image: "/placeholder.svg?height=600&width=800",
        results: "40% increase in user engagement",
      },
      {
        title: "E-commerce UX Overhaul",
        description: "Comprehensive UX improvement for an e-commerce platform to streamline the shopping experience.",
        image: "/placeholder.svg?height=600&width=800",
        results: "25% increase in conversion rate",
      },
    ],
    faqs: [
      {
        question: "What's the difference between UI and UX design?",
        answer:
          "UI (User Interface) design focuses on the visual elements and aesthetics of a product, while UX (User Experience) design is concerned with the overall feel and usability of the product.",
      },
      {
        question: "How do you approach the design process?",
        answer:
          "We follow a user-centered design approach that starts with understanding user needs, creating wireframes and prototypes, iterating based on feedback, and finally delivering polished designs.",
      },
      {
        question: "Do you conduct user testing?",
        answer:
          "Yes, we conduct various forms of user testing including usability testing, A/B testing, and user interviews to validate design decisions and identify areas for improvement.",
      },
      {
        question: "What deliverables can I expect from a UI/UX project?",
        answer:
          "Depending on the project scope, deliverables may include user personas, user flows, wireframes, interactive prototypes, visual designs, and design specifications for developers.",
      },
    ],
  }

  return (
    <div className="flex flex-col gap-20 pb-20">
      <ServiceDetailHero
        title={serviceData.title}
        description={serviceData.description}
        icon={serviceData.icon}
        color={serviceData.color}
      />
      <ServiceFeatures features={serviceData.features} />
      <ServiceProcess steps={serviceData.process} />
      <ServiceCaseStudies caseStudies={serviceData.caseStudies} />
      <ServiceFAQ faqs={serviceData.faqs} />
      <ServiceCTA />
    </div>
  )
}
