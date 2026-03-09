import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/ai-integration")

export default function AIIntegrationPage() {
  const features = [
    {
      title: "API Integration",
      description: "Connect your systems with AI services through robust API integrations for seamless functionality.",
      icon: "Link",
    },
    {
      title: "Workflow Automation",
      description: "Automate business processes with AI-powered decision making and intelligent workflows.",
      icon: "GitBranch",
    },
    {
      title: "Legacy System Enhancement",
      description: "Add AI capabilities to existing systems without complete redevelopment.",
      icon: "RefreshCw",
    },
    {
      title: "Multi-platform Deployment",
      description: "Deploy AI solutions across web, mobile, desktop, and IoT platforms.",
      icon: "Layers",
    },
    {
      title: "Real-time Processing",
      description: "Implement real-time AI processing for immediate insights and actions.",
      icon: "Zap",
    },
    {
      title: "Scalable Architecture",
      description: "Design AI integrations that scale with your business growth and increasing data volumes.",
      icon: "BarChart",
    },
  ]

  const process = [
    {
      title: "Integration Assessment",
      description: "We evaluate your existing systems and identify optimal integration points for AI capabilities.",
    },
    {
      title: "AI Service Selection",
      description: "We help you select the most appropriate AI services and models for your specific needs.",
    },
    {
      title: "Architecture Design",
      description: "We design a robust integration architecture that connects your systems with AI services.",
    },
    {
      title: "API Development",
      description: "We develop the necessary APIs and connectors to facilitate seamless communication.",
    },
    {
      title: "Data Pipeline Setup",
      description: "We establish efficient data pipelines to feed information to and from AI services.",
    },
    {
      title: "Integration Implementation",
      description: "We implement the integration according to the designed architecture and best practices.",
    },
    {
      title: "Testing & Validation",
      description: "We thoroughly test the integration to ensure reliability, performance, and accuracy.",
    },
    {
      title: "Deployment & Monitoring",
      description: "We deploy the integration to production and implement monitoring systems.",
    },
  ]

  // Changed from objects to simple strings
  const technologies = [
    "REST APIs",
    "GraphQL",
    "Webhooks",
    "Docker",
    "Kubernetes",
    "Apache Kafka",
    "Redis",
    "Elasticsearch",
  ]

  const faqs = [
    {
      question: "How can AI be integrated into my existing business systems?",
      answer:
        "AI can be integrated into existing systems through various approaches: API integrations that connect your systems with AI services, embedded AI models that run directly within your applications, middleware solutions that act as a bridge between your systems and AI capabilities, data pipeline integrations that feed information to and from AI systems, and workflow automation tools that incorporate AI for decision-making. We'll assess your specific systems and recommend the most appropriate integration approach.",
    },
    {
      question: "What are the technical requirements for AI integration?",
      answer:
        "Technical requirements vary based on the specific integration, but generally include: APIs or interfaces for communication between systems, data pipelines for feeding information to AI models, sufficient computing resources for model inference, appropriate storage for data and model artifacts, networking infrastructure for communication between components, and monitoring systems to track performance and usage. We'll provide detailed requirements after assessing your specific environment.",
    },
    {
      question: "How do you ensure AI integrations are secure?",
      answer:
        "We implement comprehensive security measures for AI integrations: secure API authentication and authorization, encryption for data in transit and at rest, proper access controls and user permissions, secure handling of sensitive data, regular security audits and vulnerability assessments, and compliance with relevant regulations like GDPR or HIPAA where applicable. Security is built into our integration process from the beginning.",
    },
    {
      question: "Can AI be integrated with legacy systems?",
      answer:
        "Yes, AI can be integrated with legacy systems through various approaches: developing custom APIs or adapters that connect legacy systems to modern AI services, implementing middleware solutions that bridge the gap between old and new technologies, using robotic process automation (RPA) to interact with legacy interfaces, extracting data from legacy systems for processing by external AI services, and gradually modernizing components while maintaining integration points.",
    },
    {
      question: "How do you handle data privacy concerns in AI integrations?",
      answer:
        "We address data privacy through multiple strategies: implementing data minimization principles to only use necessary information, anonymizing or pseudonymizing sensitive data where possible, ensuring proper consent management for data usage, establishing clear data retention policies, implementing access controls and audit trails, and designing systems to comply with relevant regulations like GDPR, CCPA, or industry-specific requirements. We'll work with you to understand your specific privacy requirements and implement appropriate measures.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="AI Integration Services"
        description="Seamlessly integrate AI capabilities into your existing applications, systems, and workflows for enhanced functionality."
        parentService="AI & Machine Learning"
        parentServiceLink="/services/ai-ml"
        color="from-emerald-500 to-teal-500"
      />
      <SubServiceFeatures features={features} />
      <SubServiceProcess process={process} />
      <SubServiceTechnologies technologies={technologies} color="from-emerald-500 to-teal-500" />
      <SubServiceFAQ faqs={faqs} />
      <SubServiceCTA />
    </div>
  )
}
