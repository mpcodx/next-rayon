import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/app-development/progressive-web-apps")

export default function ProgressiveWebAppsPage() {
  const serviceData = {
    title: "Progressive Web Apps",
    description:
      "Web applications that offer a mobile app-like experience with offline capabilities and fast loading times.",
    parentService: "App Development",
    parentServiceLink: "/services/app-development",
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        title: "Offline Functionality",
        description: "Apps that work without an internet connection, providing uninterrupted user experience.",
      },
      {
        title: "Fast Loading",
        description: "Optimized performance with quick initial load and instant navigation between pages.",
      },
      {
        title: "App-Like Experience",
        description: "Immersive full-screen experience with app-like interactions and navigation.",
      },
      {
        title: "Cross-Platform Compatibility",
        description:
          "Works on all devices and platforms through the web browser, eliminating the need for separate apps.",
      },
    ],
    process: [
      {
        title: "Requirements Gathering",
        description: "We identify your business goals, target audience, and technical requirements for the PWA.",
      },
      {
        title: "Architecture Planning",
        description: "We design the application architecture with a focus on performance and offline capabilities.",
      },
      {
        title: "UI/UX Design",
        description:
          "We create intuitive interfaces that provide an app-like experience while following web best practices.",
      },
      {
        title: "Development",
        description:
          "We build the PWA using modern web technologies, implementing service workers for offline functionality.",
      },
      {
        title: "Testing & Optimization",
        description: "We thoroughly test across devices and optimize for performance, accessibility, and SEO.",
      },
    ],
    technologies: [
      "React",
      "Next.js",
      "Service Workers",
      "IndexedDB",
      "Workbox",
      "Web App Manifest",
      "Push API",
      "Lighthouse",
      "PWA Builder",
    ],
    faqs: [
      {
        question: "What is a Progressive Web App?",
        answer:
          "A Progressive Web App (PWA) is a type of application that combines the best features of web and mobile apps. PWAs are built using web technologies but offer app-like experiences such as working offline, push notifications, and device hardware access. They can be installed on the home screen without going through an app store.",
      },
      {
        question: "What are the advantages of PWAs over native apps?",
        answer:
          "PWAs offer several advantages: they don't require installation from an app store, they work across all platforms from a single codebase, they're discoverable through search engines, they take up less storage space, they update automatically, and they're generally more cost-effective to develop and maintain than native apps.",
      },
      {
        question: "Do PWAs work offline?",
        answer:
          "Yes, PWAs can work offline or in low-quality network conditions. Using service workers, PWAs can cache important resources and data, allowing users to continue using the application even without an internet connection. When the connection is restored, the app can synchronize any changes made offline.",
      },
      {
        question: "Can PWAs send push notifications?",
        answer:
          "Yes, PWAs can send push notifications on supported platforms, allowing you to re-engage users with timely and relevant information. This feature works on Android devices and on desktop browsers, with varying levels of support on iOS.",
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
