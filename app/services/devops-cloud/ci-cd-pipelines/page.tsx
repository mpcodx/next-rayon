import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/devops-cloud/ci-cd-pipelines")

export default function CICDPipelinesPage() {
  const serviceData = {
    title: "CI/CD Pipelines",
    description: "Automated continuous integration and deployment pipelines for faster and more reliable releases.",
    parentService: "DevOps & Cloud",
    parentServiceLink: "/services/devops-cloud",
    color: "from-cyan-500 to-teal-500",
    features: [
      {
        title: "Continuous Integration",
        description: "Automated code integration with testing to catch issues early in the development process.",
      },
      {
        title: "Continuous Deployment",
        description: "Automated deployment processes that deliver code changes to production safely and efficiently.",
      },
      {
        title: "Pipeline Automation",
        description: "Fully automated workflows from code commit to production deployment with appropriate approvals.",
      },
      {
        title: "Quality Gates",
        description: "Integrated testing, security scanning, and code quality checks to ensure high-quality releases.",
      },
    ],
    process: [
      {
        title: "Assessment & Planning",
        description:
          "We evaluate your current development and deployment processes to identify opportunities for automation.",
      },
      {
        title: "Tool Selection",
        description: "We help you select the right CI/CD tools based on your technology stack and team preferences.",
      },
      {
        title: "Pipeline Design",
        description:
          "We design efficient pipelines with appropriate stages for building, testing, and deploying your applications.",
      },
      {
        title: "Implementation",
        description:
          "We set up and configure the CI/CD tools and implement the designed pipelines with proper integration.",
      },
      {
        title: "Training & Handover",
        description:
          "We provide training for your team and documentation to ensure successful adoption of the CI/CD processes.",
      },
    ],
    technologies: [
      "Jenkins",
      "GitHub Actions",
      "GitLab CI",
      "CircleCI",
      "Azure DevOps",
      "AWS CodePipeline",
      "ArgoCD",
      "Spinnaker",
      "Tekton",
    ],
    faqs: [
      {
        question: "What are the benefits of implementing CI/CD pipelines?",
        answer:
          "CI/CD pipelines offer numerous benefits: faster time to market with more frequent releases, improved code quality through automated testing, reduced manual errors, increased developer productivity, easier rollbacks when issues occur, better collaboration between development and operations teams, and more consistent deployment processes across environments.",
      },
      {
        question: "Which CI/CD tools do you recommend?",
        answer:
          "The best CI/CD tools depend on your specific needs. GitHub Actions works well for projects hosted on GitHub with simple to moderate complexity. Jenkins offers extensive customization and plugin support. GitLab CI provides a well-integrated experience for GitLab users. Azure DevOps is excellent for Microsoft-centric teams. We'll help you select the right tools based on your existing infrastructure, team expertise, and specific requirements.",
      },
      {
        question: "How long does it take to implement CI/CD pipelines?",
        answer:
          "The implementation timeline varies based on the complexity of your applications and existing processes. A basic CI/CD pipeline can be set up in 1-2 weeks, while more complex implementations involving multiple applications, environments, and advanced testing may take 1-3 months. We'll provide a more specific timeline after assessing your current setup and requirements.",
      },
      {
        question: "How do you ensure security in CI/CD pipelines?",
        answer:
          "We implement multiple security measures in CI/CD pipelines: secret management for sensitive credentials, security scanning of code and dependencies, container image scanning, infrastructure as code security checks, proper access controls for the CI/CD system, and audit logging of all pipeline activities. We also ensure that production deployments require appropriate approvals.",
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
