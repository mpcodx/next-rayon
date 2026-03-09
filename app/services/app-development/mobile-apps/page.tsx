import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/app-development/mobile-apps")

export default function MobileAppsPage() {
  const serviceData = {
    title: "Android & iOS Apps",
    description:
      "Native mobile applications for Android and iOS platforms with optimal performance and user experience.",
    parentService: "App Development",
    parentServiceLink: "/services/app-development",
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        title: "Native iOS Development",
        description:
          "Custom iOS applications built with Swift for optimal performance and seamless integration with Apple's ecosystem.",
      },
      {
        title: "Native Android Development",
        description:
          "Powerful Android applications developed with Kotlin or Java, optimized for the diverse Android device landscape.",
      },
      {
        title: "UI/UX Design for Mobile",
        description:
          "Intuitive and engaging mobile interfaces designed according to platform-specific guidelines and best practices.",
      },
      {
        title: "App Store Optimization",
        description: "Strategic app store listing optimization to improve visibility and increase downloads.",
      },
    ],
    process: [
      {
        title: "Requirements Analysis",
        description:
          "We analyze your business needs, target audience, and technical requirements to define the app scope.",
      },
      {
        title: "UI/UX Design",
        description:
          "We create wireframes and high-fidelity designs that follow platform-specific guidelines and best practices.",
      },
      {
        title: "Native Development",
        description: "We develop your app using native technologies for optimal performance and user experience.",
      },
      {
        title: "Testing & QA",
        description:
          "We conduct thorough testing across multiple devices to ensure functionality, performance, and usability.",
      },
      {
        title: "Deployment & Launch",
        description: "We handle the app store submission process and help you launch your app successfully.",
      },
    ],
    technologies: ["Swift", "Kotlin", "Java", "SwiftUI", "Jetpack Compose", "Firebase", "CoreData", "ARKit", "CoreML"],
    faqs: [
      {
        question: "How long does it take to develop a mobile app?",
        answer:
          "The timeline for mobile app development typically ranges from 3-6 months, depending on the complexity of the app, features required, and the platforms you're targeting. Simple apps may take less time, while complex applications with extensive features could take longer.",
      },
      {
        question: "What's the difference between native and cross-platform development?",
        answer:
          "Native development involves building apps specifically for a single platform (iOS or Android) using platform-specific languages and tools. This approach offers the best performance, access to all device features, and optimal user experience. Cross-platform development uses frameworks like React Native or Flutter to build apps that work on multiple platforms from a single codebase, which can be more cost-effective but may have some limitations in performance or feature access.",
      },
      {
        question: "Do you provide app maintenance services?",
        answer:
          "Yes, we offer comprehensive app maintenance services to ensure your app remains compatible with the latest OS versions, secure against new threats, and up-to-date with evolving user expectations. Our maintenance packages include regular updates, bug fixes, performance optimization, and feature enhancements.",
      },
      {
        question: "How do you ensure app security?",
        answer:
          "We implement multiple layers of security including secure authentication, data encryption, secure API communication, code obfuscation, and regular security audits. We follow platform-specific security best practices and stay updated on the latest security threats and mitigation strategies.",
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
