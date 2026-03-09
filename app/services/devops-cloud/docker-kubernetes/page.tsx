import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/devops-cloud/docker-kubernetes")

export default function DockerKubernetesPage() {
  const serviceData = {
    title: "Docker & Kubernetes",
    description: "Containerization and orchestration solutions for scalable and portable applications.",
    parentService: "DevOps & Cloud",
    parentServiceLink: "/services/devops-cloud",
    color: "from-cyan-500 to-teal-500",
    features: [
      {
        title: "Application Containerization",
        description: "Package applications and dependencies into standardized containers for consistent deployment.",
      },
      {
        title: "Container Orchestration",
        description: "Automated deployment, scaling, and management of containerized applications with Kubernetes.",
      },
      {
        title: "Microservices Architecture",
        description:
          "Design and implementation of microservices-based applications for improved scalability and resilience.",
      },
      {
        title: "Service Mesh Integration",
        description:
          "Enhanced communication, security, and observability between microservices with service mesh technology.",
      },
    ],
    process: [
      {
        title: "Assessment & Strategy",
        description:
          "We evaluate your applications and infrastructure to develop a containerization and orchestration strategy.",
      },
      {
        title: "Container Design",
        description:
          "We design optimized container images with security, performance, and size considerations in mind.",
      },
      {
        title: "Kubernetes Architecture",
        description:
          "We design a Kubernetes architecture that meets your scalability, availability, and security requirements.",
      },
      {
        title: "Implementation",
        description:
          "We implement the containerization and Kubernetes setup, including necessary infrastructure and configurations.",
      },
      {
        title: "Monitoring & Optimization",
        description: "We set up comprehensive monitoring and continuously optimize your container environment.",
      },
    ],
    technologies: ["Docker", "Kubernetes", "Helm", "Istio", "Prometheus", "Grafana", "Harbor", "Linkerd", "Podman"],
    faqs: [
      {
        question: "What are the benefits of containerization?",
        answer:
          "Containerization offers numerous benefits: consistent environments across development, testing, and production; improved application isolation and security; faster deployment and scaling; better resource utilization; simplified dependency management; and enhanced portability across different infrastructure environments.",
      },
      {
        question: "When should I use Kubernetes vs. simpler orchestration options?",
        answer:
          "Kubernetes is ideal for complex applications with multiple services that need advanced scaling, high availability, and automated failover. For simpler applications, lighter solutions like Docker Compose, AWS ECS, or managed container services might be more appropriate. We'll help you evaluate the complexity of your application and operational requirements to recommend the right orchestration solution.",
      },
      {
        question: "How do you handle stateful applications in Kubernetes?",
        answer:
          "We handle stateful applications in Kubernetes using StatefulSets and persistent volumes. We implement proper backup and recovery strategies, use operators for database workloads when appropriate, and design for data consistency and availability. For critical stateful workloads, we may recommend managed database services that integrate well with your Kubernetes environment.",
      },
      {
        question: "What's your approach to Kubernetes security?",
        answer:
          "Our Kubernetes security approach includes: securing the cluster with proper authentication and authorization; implementing network policies for service isolation; using security contexts and pod security policies; scanning container images for vulnerabilities; managing secrets securely; implementing runtime security monitoring; and regularly updating all components to address security vulnerabilities.",
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
