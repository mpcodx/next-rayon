import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceFeatures from "@/components/services/service-features"
import ServiceProcess from "@/components/services/service-process"
import ServiceCaseStudies from "@/components/services/service-case-studies"
import ServiceFAQ from "@/components/services/service-faq"
import ServiceCTA from "@/components/services/service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/app-development")

export default function AppDevelopmentPage() {
  const serviceData = {
    title: "App Development",
    description: "Native and cross-platform mobile applications for Android, iOS, and Progressive Web Apps.",
    icon: "Smartphone",
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        title: "Android & iOS Apps",
        description:
          "Native mobile applications for Android and iOS platforms with optimal performance and user experience.",
        link: "/services/app-development/mobile-apps",
      },
      {
        title: "Progressive Web Apps",
        description:
          "Web applications that offer a mobile app-like experience with offline capabilities and fast loading times.",
        link: "/services/app-development/progressive-web-apps",
      },
      {
        title: "Cross-Platform Apps",
        description: "Build once, deploy everywhere with cross-platform frameworks like React Native and Flutter.",
        link: "/services/app-development/cross-platform-apps",
      },
    ],
    process: [
      "Requirements Analysis",
      "UI/UX Design",
      "App Architecture",
      "Development",
      "Testing & QA",
      "Deployment",
      "Maintenance & Updates",
    ],
    caseStudies: [
      {
        title: "Health & Fitness App",
        description: "Cross-platform mobile application for tracking workouts, nutrition, and health metrics.",
        image: "/placeholder.svg?height=600&width=800",
        results: "100,000+ downloads in first month",
      },
      {
        title: "E-commerce Mobile App",
        description: "Native shopping application with AR product visualization and seamless checkout experience.",
        image: "/placeholder.svg?height=600&width=800",
        results: "35% increase in mobile sales",
      },
    ],
    faqs: [
      {
        question: "How long does it take to develop a mobile app?",
        answer:
          "The timeline varies depending on the complexity of the app. A simple app can take 2-3 months, while more complex applications may take 4-8 months or more.",
      },
      {
        question: "Should I build a native app or a cross-platform app?",
        answer:
          "It depends on your specific needs. Native apps offer the best performance and access to platform-specific features, while cross-platform apps are more cost-effective and faster to develop.",
      },
      {
        question: "Do you provide app maintenance services?",
        answer:
          "Yes, we offer ongoing maintenance and support services to ensure your app remains compatible with the latest OS versions and performs optimally.",
      },
      {
        question: "Can you help with app store submission?",
        answer:
          "We handle the entire app store submission process for both Google Play Store and Apple App Store, ensuring your app meets all requirements.",
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
