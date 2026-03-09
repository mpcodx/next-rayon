import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/lms-integration/crm-api-integration")

export default function CRMAPIIntegrationPage() {
  const serviceData = {
    title: "CRM & API Integration",
    description:
      "Connect your LMS with CRM systems and other tools through API integrations for streamlined workflows.",
    parentService: "LMS & Integration",
    parentServiceLink: "/services/lms-integration",
    color: "from-amber-500 to-orange-500",
    features: [
      {
        title: "CRM Integration",
        description: "Seamless connection between your LMS and CRM systems for unified customer data.",
      },
      {
        title: "API Development",
        description: "Custom API development to enable integration with various third-party systems.",
      },
      {
        title: "Data Synchronization",
        description: "Automated data syncing between systems to maintain consistency and eliminate manual updates.",
      },
      {
        title: "Workflow Automation",
        description: "Automated workflows across systems to streamline operations and improve efficiency.",
      },
    ],
    process: [
      {
        title: "Integration Assessment",
        description:
          "We analyze your existing systems and integration requirements to develop a comprehensive strategy.",
      },
      {
        title: "API Design",
        description: "We design robust APIs following RESTful principles and industry best practices.",
      },
      {
        title: "Integration Development",
        description: "We develop the necessary integrations between your LMS and other systems.",
      },
      {
        title: "Data Mapping & Migration",
        description: "We map data fields between systems and develop migration strategies for existing data.",
      },
      {
        title: "Testing & Deployment",
        description: "We thoroughly test all integration points before deploying to production.",
      },
    ],
    technologies: ["REST API", "GraphQL", "Salesforce", "HubSpot", "Zapier", "Webhooks", "OAuth", "JSON", "XML"],
    faqs: [
      {
        question: "Which CRM systems can you integrate with our LMS?",
        answer:
          "We can integrate your LMS with virtually any modern CRM system including Salesforce, HubSpot, Zoho CRM, Microsoft Dynamics, Pipedrive, and others. The integration approach depends on the specific CRM and can utilize their API, webhooks, or middleware solutions like Zapier. We'll recommend the most efficient integration method based on your specific systems and requirements.",
      },
      {
        question: "What types of data can be synchronized between our LMS and CRM?",
        answer:
          "We can synchronize various types of data including user profiles, course enrollments, completion status, assessment results, certification information, payment history, and engagement metrics. This allows your sales and marketing teams to have visibility into learning activities while enabling your LMS to leverage customer data from the CRM for personalized learning experiences.",
      },
      {
        question: "Can you build custom APIs for our specific integration needs?",
        answer:
          "Yes, we can develop custom APIs tailored to your specific integration requirements. We design RESTful or GraphQL APIs with proper authentication, rate limiting, and documentation. These custom APIs can enable unique integrations between your LMS and proprietary systems, legacy applications, or third-party services that don't have standard integration options.",
      },
      {
        question: "How do you ensure data security during integration?",
        answer:
          "We implement multiple security measures including secure authentication (OAuth 2.0, API keys), data encryption in transit and at rest, proper access controls and permissions, secure webhook handling, comprehensive logging and monitoring, and regular security audits. We also ensure compliance with relevant data protection regulations like GDPR or CCPA when transferring data between systems.",
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
