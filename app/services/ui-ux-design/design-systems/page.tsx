import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ui-ux-design/design-systems")

export default function DesignSystemsPage() {
  const serviceData = {
    title: "Design Systems",
    description:
      "Comprehensive design systems with reusable components for consistent user experiences across products.",
    parentService: "UI/UX Design",
    parentServiceLink: "/services/ui-ux-design",
    color: "from-pink-500 to-purple-500",
    features: [
      {
        title: "Component Libraries",
        description: "Reusable UI components with clear usage guidelines for consistent implementation.",
      },
      {
        title: "Design Tokens",
        description: "Standardized design variables for colors, typography, spacing, and other visual properties.",
      },
      {
        title: "Documentation",
        description: "Comprehensive documentation of design principles, components, and usage guidelines.",
      },
      {
        title: "Design-to-Code Integration",
        description: "Seamless integration between design assets and development frameworks.",
      },
    ],
    process: [
      {
        title: "Audit & Analysis",
        description: "We audit existing designs and interfaces to identify patterns and inconsistencies.",
      },
      {
        title: "Design Principles",
        description: "We establish core design principles that will guide the entire design system.",
      },
      {
        title: "Component Design",
        description: "We design a comprehensive library of reusable components with variants and states.",
      },
      {
        title: "Documentation",
        description: "We create detailed documentation for each component, including usage guidelines and examples.",
      },
      {
        title: "Implementation & Governance",
        description: "We help implement the design system and establish processes for maintenance and evolution.",
      },
    ],
    technologies: [
      "Figma",
      "Storybook",
      "Zeroheight",
      "Notion",
      "GitHub",
      "Sketch",
      "Abstract",
      "InVision DSM",
      "Lottie",
    ],
    faqs: [
      {
        question: "What is a design system and why do I need one?",
        answer:
          "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It includes UI components, design tokens, guidelines, and documentation. You need a design system to ensure consistency across products, accelerate design and development, improve collaboration between teams, reduce design debt, and create a more cohesive user experience as your product portfolio grows.",
      },
      {
        question: "How long does it take to create a design system?",
        answer:
          "Creating a comprehensive design system typically takes 2-4 months for the initial version, depending on the complexity of your products and the scope of the system. This includes auditing existing designs, creating core components, establishing design tokens, and developing documentation. After the initial release, design systems require ongoing maintenance and evolution as your products grow and change.",
      },
      {
        question: "How do you ensure adoption of the design system across teams?",
        answer:
          "We ensure adoption through several strategies: involving stakeholders from different teams early in the process; creating comprehensive and accessible documentation; providing training sessions for designers and developers; demonstrating the value and efficiency gains; establishing clear governance processes; and creating tools that make using the design system easier than not using it. We also help establish metrics to track adoption and impact.",
      },
      {
        question: "Can a design system work with our existing products?",
        answer:
          "Yes, design systems can be implemented incrementally with existing products. We typically start by auditing current designs, identifying common patterns, and creating a system that accommodates existing components while establishing a path for future consistency. We can help develop a migration strategy that allows you to gradually implement the design system without disrupting ongoing development.",
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
