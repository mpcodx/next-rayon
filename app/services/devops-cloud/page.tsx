import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceFeatures from "@/components/services/service-features"
import ServiceProcess from "@/components/services/service-process"
import ServiceCaseStudies from "@/components/services/service-case-studies"
import ServiceFAQ from "@/components/services/service-faq"
import ServiceCTA from "@/components/services/service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/devops-cloud")

export default function DevOpsCloudPage() {
  const serviceData = {
    title: "DevOps & Cloud",
    description: "Cloud infrastructure setup, CI/CD pipelines, Docker, Kubernetes, and monitoring solutions.",
    icon: "Cloud",
    color: "from-cyan-500 to-teal-500",
    features: [
      {
        title: "Cloud Setup",
        description: "Setup and optimization of cloud infrastructure on AWS, Azure, or Google Cloud Platform.",
        link: "/services/devops-cloud/cloud-setup",
      },
      {
        title: "CI/CD Pipelines",
        description: "Automated continuous integration and deployment pipelines for faster and more reliable releases.",
        link: "/services/devops-cloud/ci-cd-pipelines",
      },
      {
        title: "Docker & Kubernetes",
        description: "Containerization and orchestration solutions for scalable and portable applications.",
        link: "/services/devops-cloud/docker-kubernetes",
      },
    ],
    process: [
      "Infrastructure Assessment",
      "Architecture Design",
      "Implementation",
      "Automation Setup",
      "Monitoring & Alerting",
      "Documentation",
      "Training & Handover",
    ],
    caseStudies: [
      {
        title: "Cloud Migration",
        description: "Migration of legacy systems to AWS cloud infrastructure with CI/CD pipeline implementation.",
        image: "/placeholder.svg?height=600&width=800",
        results: "70% reduction in infrastructure costs",
      },
      {
        title: "Kubernetes Deployment",
        description: "Implementation of Kubernetes for a high-traffic e-commerce platform to improve scalability.",
        image: "/placeholder.svg?height=600&width=800",
        results: "99.99% uptime and 3x faster deployments",
      },
    ],
    faqs: [
      {
        question: "Which cloud provider do you recommend?",
        answer:
          "The best cloud provider depends on your specific needs. AWS offers the most comprehensive services, Azure integrates well with Microsoft products, and Google Cloud excels in data analytics and machine learning.",
      },
      {
        question: "How can DevOps benefit my business?",
        answer:
          "DevOps practices can lead to faster development cycles, improved collaboration between teams, higher quality code, reduced deployment failures, and quicker recovery from issues.",
      },
      {
        question: "Is it worth migrating to the cloud?",
        answer:
          "For most businesses, cloud migration offers significant benefits including cost savings, improved scalability, better disaster recovery, and access to advanced services like AI and machine learning.",
      },
      {
        question: "How do you ensure security in cloud environments?",
        answer:
          "We implement security best practices including identity and access management, encryption, network security, continuous monitoring, and regular security audits to ensure your cloud environment is secure.",
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
