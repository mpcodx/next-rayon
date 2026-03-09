import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/lms-integration/custom-lms")

export default function CustomLMSPage() {
  const serviceData = {
    title: "Custom LMS",
    description: "Tailored learning management systems designed to meet your specific educational or training needs.",
    parentService: "LMS & Integration",
    parentServiceLink: "/services/lms-integration",
    color: "from-amber-500 to-orange-500",
    features: [
      {
        title: "Tailored User Experience",
        description: "Custom interfaces designed specifically for your learners, instructors, and administrators.",
      },
      {
        title: "Flexible Content Management",
        description: "Powerful tools for creating, organizing, and delivering various types of learning content.",
      },
      {
        title: "Advanced Assessment Tools",
        description: "Comprehensive assessment capabilities including quizzes, assignments, and practical evaluations.",
      },
      {
        title: "Detailed Analytics",
        description: "In-depth reporting and analytics to track learner progress and course effectiveness.",
      },
    ],
    process: [
      {
        title: "Requirements Analysis",
        description:
          "We analyze your educational goals, learner needs, and technical requirements to define the LMS scope.",
      },
      {
        title: "System Architecture",
        description: "We design a scalable and secure architecture for your custom LMS solution.",
      },
      {
        title: "UI/UX Design",
        description: "We create intuitive interfaces for learners, instructors, and administrators.",
      },
      {
        title: "Development",
        description: "We build your custom LMS using modern technologies and best practices.",
      },
      {
        title: "Testing & Deployment",
        description: "We thoroughly test all aspects of the LMS before deploying it to your environment.",
      },
    ],
    technologies: ["React", "Node.js", "MongoDB", "PostgreSQL", "AWS", "Docker", "WebRTC", "xAPI", "SCORM"],
    faqs: [
      {
        question: "Why choose a custom LMS over off-the-shelf solutions?",
        answer:
          "A custom LMS offers several advantages: it can be tailored to your specific teaching methodology and workflow; it can integrate seamlessly with your existing systems; it can support unique content types or assessment methods not available in standard LMS platforms; it provides complete control over features and user experience; and it can scale according to your specific needs without forcing you into predefined pricing tiers.",
      },
      {
        question: "How long does it take to develop a custom LMS?",
        answer:
          "The development timeline for a custom LMS typically ranges from 4-8 months, depending on the complexity and scope of features. A basic LMS with core functionality might take 3-4 months, while a comprehensive system with advanced features could take 6-12 months. We can provide a more specific timeline after understanding your requirements in detail.",
      },
      {
        question: "Can you migrate content from our existing LMS?",
        answer:
          "Yes, we can help migrate content from your existing LMS to your new custom platform. We develop migration strategies and tools specific to your current system, whether it's Moodle, Canvas, Blackboard, or another platform. We ensure that course content, user data, and learning records are transferred accurately while taking the opportunity to improve organization and structure.",
      },
      {
        question: "How do you ensure the security of learner data?",
        answer:
          "We implement multiple layers of security including secure authentication with role-based access control, encryption of sensitive data both in transit and at rest, regular security audits and penetration testing, compliance with relevant standards like GDPR or FERPA, secure API implementations, and comprehensive logging and monitoring. We also provide documentation on security practices for administrators.",
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
