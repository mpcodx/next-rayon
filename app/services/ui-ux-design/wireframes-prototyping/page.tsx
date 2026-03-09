import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ui-ux-design/wireframes-prototyping")

export default function WireframesPrototypingPage() {
  const serviceData = {
    title: "Wireframes & Prototyping",
    description:
      "Create interactive wireframes and prototypes to visualize and test your digital product before development.",
    parentService: "UI/UX Design",
    parentServiceLink: "/services/ui-ux-design",
    color: "from-pink-500 to-purple-500",
    features: [
      {
        title: "Low-Fidelity Wireframes",
        description:
          "Simple sketches and layouts to quickly explore ideas and establish the basic structure of your product.",
      },
      {
        title: "High-Fidelity Wireframes",
        description: "Detailed wireframes with accurate content, spacing, and layout to visualize the final product.",
      },
      {
        title: "Interactive Prototypes",
        description:
          "Clickable prototypes that simulate user flows and interactions for testing and stakeholder presentations.",
      },
      {
        title: "User Testing Integration",
        description: "Prototypes designed for user testing to gather valuable feedback before development begins.",
      },
    ],
    process: [
      {
        title: "Requirements Gathering",
        description:
          "We collect and analyze your requirements, user needs, and business goals to inform the wireframing process.",
      },
      {
        title: "Information Architecture",
        description:
          "We organize content and define user flows to create a logical structure for your digital product.",
      },
      {
        title: "Low-Fidelity Wireframing",
        description: "We create initial wireframes to establish layout, content hierarchy, and basic functionality.",
      },
      {
        title: "High-Fidelity Wireframing",
        description: "We refine wireframes with more detail, accurate content, and visual hierarchy.",
      },
      {
        title: "Interactive Prototyping",
        description:
          "We develop clickable prototypes that simulate the user experience and allow for testing and feedback.",
      },
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Axure RP", "Marvel", "Balsamiq", "Framer", "Zeplin"],
    faqs: [
      {
        question: "What's the difference between wireframes and prototypes?",
        answer:
          "Wireframes are static representations of a digital product that focus on layout, structure, and information hierarchy. They range from low-fidelity sketches to high-fidelity detailed layouts. Prototypes, on the other hand, are interactive simulations of the product that demonstrate functionality and user flows. Prototypes allow users to interact with the design and experience how the final product will work.",
      },
      {
        question: "Why are wireframes and prototypes important in the design process?",
        answer:
          "Wireframes and prototypes are crucial because they allow you to visualize and test ideas before investing in full development. They help identify usability issues early, facilitate stakeholder alignment, provide clear direction for developers, and enable user testing to validate design decisions. This process significantly reduces the risk of expensive changes later in development.",
      },
      {
        question: "How long does the wireframing and prototyping process take?",
        answer:
          "The timeline varies depending on the complexity of your project. For a simple website or app, wireframing might take 1-2 weeks, with prototyping adding another 1-2 weeks. More complex products with multiple user flows and features can take 4-8 weeks for comprehensive wireframing and prototyping. We'll provide a specific timeline based on your project scope.",
      },
      {
        question: "Do you conduct user testing with the prototypes?",
        answer:
          "Yes, we can conduct user testing sessions with your prototypes to gather valuable feedback. We use various methods including moderated usability testing, unmoderated remote testing, and A/B testing depending on your needs. The insights from these tests help refine the design before development, ensuring the final product meets user expectations and business goals.",
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
