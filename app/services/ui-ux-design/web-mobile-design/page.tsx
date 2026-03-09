import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ui-ux-design/web-mobile-design")

export default function WebMobileDesignPage() {
  const serviceData = {
    title: "Web & Mobile App Design",
    description: "Beautiful, intuitive, and responsive designs for web and mobile applications.",
    parentService: "UI/UX Design",
    parentServiceLink: "/services/ui-ux-design",
    color: "from-pink-500 to-purple-500",
    features: [
      {
        title: "Responsive Web Design",
        description: "Websites that adapt seamlessly to all screen sizes, from desktop to mobile devices.",
      },
      {
        title: "Mobile App UI Design",
        description:
          "Intuitive and engaging interfaces for iOS and Android applications following platform guidelines.",
      },
      {
        title: "User-Centered Design",
        description: "Designs focused on user needs, behaviors, and preferences to create intuitive experiences.",
      },
      {
        title: "Visual Design Excellence",
        description: "Stunning visuals with attention to typography, color theory, imagery, and micro-interactions.",
      },
    ],
    process: [
      {
        title: "User Research",
        description: "We conduct research to understand your users' needs, behaviors, and pain points.",
      },
      {
        title: "UX Strategy",
        description: "We develop a UX strategy aligned with your business goals and user expectations.",
      },
      {
        title: "Wireframing & Prototyping",
        description: "We create wireframes and interactive prototypes to visualize the user experience.",
      },
      {
        title: "Visual Design",
        description: "We develop the visual language including color schemes, typography, and UI components.",
      },
      {
        title: "Design System Creation",
        description: "We build a comprehensive design system for consistent implementation across platforms.",
      },
    ],
    technologies: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Photoshop",
      "Illustrator",
      "InVision",
      "Principle",
      "After Effects",
      "Zeplin",
    ],
    faqs: [
      {
        question: "What's the difference between UI and UX design?",
        answer:
          "UI (User Interface) design focuses on the visual elements of a digital product—how it looks and feels, including colors, typography, buttons, and overall aesthetics. UX (User Experience) design is broader and focuses on the entire user journey and how users interact with the product, including information architecture, user flows, wireframing, and usability. While distinct, they work together to create effective digital products.",
      },
      {
        question: "How do you ensure designs are accessible to all users?",
        answer:
          "We implement accessibility best practices throughout the design process, including sufficient color contrast, keyboard navigation support, screen reader compatibility, appropriate text sizing, and clear focus states. We follow WCAG guidelines and test designs with accessibility tools. Our goal is to create inclusive designs that work for users of all abilities.",
      },
      {
        question: "Do you design for both iOS and Android platforms?",
        answer:
          "Yes, we design for both iOS and Android platforms. We're well-versed in the design guidelines for each platform (Human Interface Guidelines for iOS and Material Design for Android) and can create designs that feel native to each while maintaining your brand identity. We can also create unified designs for cross-platform apps with appropriate adaptations for each platform.",
      },
      {
        question: "How do you handle design handoff to developers?",
        answer:
          "We provide comprehensive design handoff that includes interactive prototypes, detailed specifications, asset exports, and style guides. We use tools like Zeplin or Figma for developer handoff, which allow developers to inspect designs, get exact measurements, and export assets. We also remain available during development to clarify design decisions and ensure accurate implementation.",
      },
    ],
  }

  return (
    <div className="flex flex-col gap-20 pb-20">
      <SubServiceHero
        title={serviceData.title}
        description={serviceData.description}
        parentService={serviceData.parentService}
        parentServiceLink={serviceData.parentServiceLink}
        color={serviceData.color}
      />
      <SubServiceFeatures features={serviceData.features} />
      <SubServiceProcess process={serviceData.process} />
      <SubServiceTechnologies technologies={serviceData.technologies} color={serviceData.color} />
      <SubServiceFAQ faqs={serviceData.faqs} />
      <SubServiceCTA />
    </div>
  )
}
