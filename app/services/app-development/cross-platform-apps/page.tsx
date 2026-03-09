import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/app-development/cross-platform-apps")

export default function CrossPlatformAppsPage() {
  const serviceData = {
    title: "Cross-Platform Apps",
    description: "Build once, deploy everywhere with cross-platform frameworks like React Native and Flutter.",
    parentService: "App Development",
    parentServiceLink: "/services/app-development",
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        title: "Single Codebase",
        description:
          "Develop for iOS and Android simultaneously with a shared codebase, reducing development time and costs.",
      },
      {
        title: "Native-Like Performance",
        description:
          "Modern cross-platform frameworks deliver performance comparable to native apps for most use cases.",
      },
      {
        title: "Consistent User Experience",
        description:
          "Maintain brand consistency across platforms while respecting platform-specific design guidelines.",
      },
      {
        title: "Faster Time to Market",
        description: "Launch your app on multiple platforms simultaneously, reaching a wider audience from day one.",
      },
    ],
    process: [
      {
        title: "Framework Selection",
        description:
          "We help you choose the right cross-platform framework based on your specific requirements and goals.",
      },
      {
        title: "UI/UX Design",
        description:
          "We design interfaces that work well across platforms while respecting platform-specific conventions.",
      },
      {
        title: "Development",
        description: "We build your app using the selected framework, optimizing for performance and user experience.",
      },
      {
        title: "Native Integration",
        description: "We integrate with native device features and third-party services to enhance functionality.",
      },
      {
        title: "Testing & Deployment",
        description: "We test across multiple devices and platforms before helping you launch on app stores.",
      },
    ],
    technologies: [
      "React Native",
      "Flutter",
      "Expo",
      "Ionic",
      "Capacitor",
      "NativeScript",
      "Firebase",
      "Redux",
      "MobX",
    ],
    faqs: [
      {
        question: "Which cross-platform framework is best for my app?",
        answer:
          "The best framework depends on your specific needs. React Native is excellent if you already have React experience and need deep integration with native modules. Flutter offers superior performance and a consistent UI across platforms. We'll help you choose the right framework based on your project requirements, team expertise, and business goals.",
      },
      {
        question: "Will a cross-platform app perform as well as a native app?",
        answer:
          "Modern cross-platform frameworks like React Native and Flutter can achieve near-native performance for most applications. While extremely graphics-intensive apps or those requiring specialized hardware access might still benefit from native development, cross-platform solutions work excellently for the vast majority of business applications, offering a great balance of performance and development efficiency.",
      },
      {
        question: "Can cross-platform apps access device features like camera and GPS?",
        answer:
          "Yes, cross-platform frameworks provide access to most device features including camera, GPS, accelerometer, Bluetooth, and more. If a specific native feature isn't directly available through the framework, we can create custom native modules to bridge that functionality to your cross-platform app.",
      },
      {
        question: "How much can I save by choosing cross-platform over native development?",
        answer:
          "Cross-platform development typically reduces development costs by 30-40% compared to building separate native apps for iOS and Android. You'll also save on ongoing maintenance as updates only need to be implemented once rather than separately for each platform. However, the exact savings depend on the complexity of your app and specific requirements.",
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
