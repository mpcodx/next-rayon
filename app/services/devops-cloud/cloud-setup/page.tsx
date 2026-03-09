import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/devops-cloud/cloud-setup")

export default function CloudSetupPage() {
  const serviceData = {
    title: "Cloud Setup",
    description: "Setup and optimization of cloud infrastructure on AWS, Azure, or Google Cloud Platform.",
    parentService: "DevOps & Cloud",
    parentServiceLink: "/services/devops-cloud",
    color: "from-cyan-500 to-teal-500",
    features: [
      {
        title: "Cloud Architecture Design",
        description: "Custom cloud architecture designed for scalability, security, and cost-efficiency.",
      },
      {
        title: "Infrastructure as Code",
        description:
          "Automated infrastructure provisioning and management using tools like Terraform and CloudFormation.",
      },
      {
        title: "Multi-Cloud Strategy",
        description:
          "Strategic implementation across multiple cloud providers to optimize for cost, performance, and redundancy.",
      },
      {
        title: "Cloud Migration",
        description:
          "Seamless migration of existing applications and infrastructure to the cloud with minimal disruption.",
      },
    ],
    process: [
      {
        title: "Assessment & Planning",
        description:
          "We evaluate your current infrastructure and business needs to develop a comprehensive cloud strategy.",
      },
      {
        title: "Architecture Design",
        description:
          "We design a cloud architecture that aligns with your business goals, security requirements, and budget.",
      },
      {
        title: "Infrastructure as Code Setup",
        description:
          "We implement infrastructure as code to ensure consistent, repeatable, and version-controlled deployments.",
      },
      {
        title: "Migration & Implementation",
        description:
          "We execute the migration or new setup with careful planning to minimize disruption to your operations.",
      },
      {
        title: "Optimization & Monitoring",
        description:
          "We set up monitoring and continuously optimize your cloud infrastructure for performance and cost.",
      },
    ],
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Terraform",
      "CloudFormation",
      "Pulumi",
      "Kubernetes",
      "Docker",
      "Ansible",
    ],
    faqs: [
      {
        question: "Which cloud provider is best for my business?",
        answer:
          "The best cloud provider depends on your specific needs. AWS offers the most comprehensive services and global reach. Azure integrates well with Microsoft products and is ideal for enterprises already using Microsoft technologies. Google Cloud excels in data analytics, machine learning, and containerization. We'll help you evaluate your requirements and choose the right provider or multi-cloud strategy.",
      },
      {
        question: "How do you ensure security in cloud environments?",
        answer:
          "We implement a comprehensive security approach including identity and access management, network security with proper segmentation, encryption of data at rest and in transit, security monitoring and logging, automated security scanning, and compliance with relevant standards. We follow the principle of least privilege and implement security at every layer of your cloud infrastructure.",
      },
      {
        question: "What is Infrastructure as Code and why is it important?",
        answer:
          "Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code rather than manual processes. It's important because it makes your infrastructure deployments consistent, repeatable, version-controlled, and auditable. IaC enables you to quickly replicate environments, implement disaster recovery, and scale efficiently while reducing human error.",
      },
      {
        question: "How do you optimize cloud costs?",
        answer:
          "We optimize cloud costs through several strategies: right-sizing resources to match actual needs, implementing auto-scaling to adjust capacity based on demand, utilizing reserved instances or savings plans for predictable workloads, identifying and removing unused resources, setting up cost monitoring and alerts, and continuously analyzing usage patterns to recommend optimizations.",
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
