import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/web-development/custom-website-design")

export default function CustomWebsiteDesignPage() {
  const serviceData = {
    title: "Custom Website Design",
    description: "Unique, responsive websites designed to reflect your brand identity and engage your audience.",
    parentService: "Web Development",
    parentServiceLink: "/services/web-development",
    color: "from-purple-500 to-blue-500",
    features: [
      {
        title: "Responsive Design",
        description: "Websites that look and function perfectly on all devices, from desktops to smartphones.",
      },
      {
        title: "Brand-Focused Design",
        description: "Custom designs that reflect your brand identity and resonate with your target audience.",
      },
      {
        title: "User Experience Optimization",
        description: "Intuitive navigation and user flows designed to maximize engagement and conversions.",
      },
      {
        title: "Performance Optimization",
        description: "Fast-loading websites optimized for search engines and user experience.",
      },
    ],
    process: [
      {
        title: "Discovery & Research",
        description:
          "We learn about your business, goals, target audience, and competitors to inform our design strategy.",
      },
      {
        title: "Wireframing",
        description:
          "We create wireframes to establish the structure and layout of key pages before adding visual design elements.",
      },
      {
        title: "Visual Design",
        description:
          "We develop the visual identity of your website, including colors, typography, imagery, and UI components.",
      },
      {
        title: "Development",
        description: "We transform the approved designs into a fully functional, responsive website with clean code.",
      },
      {
        title: "Testing & Launch",
        description: "We thoroughly test your website across devices and browsers before launching it to the public.",
      },
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Figma"],
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
      <SubServiceCTA />
    </div>
  )
}
