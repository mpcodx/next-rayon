import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceFeatures from "@/components/services/service-features"
import ServiceProcess from "@/components/services/service-process"
import ServiceCaseStudies from "@/components/services/service-case-studies"
import ServiceFAQ from "@/components/services/service-faq"
import ServiceCTA from "@/components/services/service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/lms-integration")

export default function LMSIntegrationPage() {
  const serviceData = {
    title: "LMS & Integration",
    description: "Custom Learning Management Systems and third-party integrations for seamless workflows.",
    icon: "BookOpen",
    color: "from-amber-500 to-orange-500",
    features: [
      {
        title: "Custom LMS",
        description:
          "Tailored learning management systems designed to meet your specific educational or training needs.",
        link: "/services/lms-integration/custom-lms",
      },
      {
        title: "Payment Integration",
        description:
          "Seamless integration with payment gateways for course sales, subscriptions, and membership models.",
        link: "/services/lms-integration/payment-integration",
      },
      {
        title: "CRM & API Integration",
        description:
          "Connect your LMS with CRM systems and other tools through API integrations for streamlined workflows.",
        link: "/services/lms-integration/crm-api-integration",
      },
    ],
    process: [
      "Requirements Analysis",
      "System Architecture",
      "Custom Development",
      "Integration Setup",
      "Testing & QA",
      "Deployment",
      "Training & Support",
    ],
    caseStudies: [
      {
        title: "Learning Management System",
        description:
          "Custom LMS with course creation, student management, and payment processing for an educational institution.",
        image: "/placeholder.svg?height=600&width=800",
        results: "10,000+ students onboarded in first year",
      },
      {
        title: "Corporate Training Platform",
        description: "Integrated training platform with CRM and HR systems for a multinational corporation.",
        image: "/placeholder.svg?height=600&width=800",
        results: "85% completion rate for mandatory training",
      },
    ],
    faqs: [
      {
        question: "Should I use an off-the-shelf LMS or build a custom one?",
        answer:
          "It depends on your specific needs. Off-the-shelf solutions are quicker to implement and less expensive initially, but custom LMS solutions offer greater flexibility, scalability, and can be tailored to your exact requirements.",
      },
      {
        question: "What payment gateways can you integrate with?",
        answer:
          "We can integrate with most popular payment gateways including Stripe, PayPal, Authorize.net, Braintree, and many others depending on your region and requirements.",
      },
      {
        question: "Can you migrate data from our existing LMS?",
        answer:
          "Yes, we can help migrate your courses, user data, and other content from your existing LMS to a new platform while ensuring data integrity and minimal disruption.",
      },
      {
        question: "Do you provide support after the LMS is launched?",
        answer:
          "We offer various support and maintenance packages to ensure your LMS continues to run smoothly, stays secure, and can be updated with new features as needed.",
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
