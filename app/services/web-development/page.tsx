import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceFeatures from "@/components/services/service-features"
import ServiceProcess from "@/components/services/service-process"
import ServiceCaseStudies from "@/components/services/service-case-studies"
import ServiceFAQ from "@/components/services/service-faq"
import ServiceCTA from "@/components/services/service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/web-development")

export default function WebDevelopmentPage() {
  const serviceData = {
    title: "Web Development",
    description: "Custom websites, e-commerce solutions, and CMS integrations tailored to your business needs.",
    icon: "Code",
    color: "from-purple-500 to-blue-500",
    features: [
      {
        title: "Custom Website Design",
        description: "Unique, responsive websites designed to reflect your brand identity and engage your audience.",
        link: "/services/web-development/custom-website-design",
      },
      {
        title: "E-commerce Solutions",
        description:
          "Powerful online stores with secure payment processing, inventory management, and customer analytics.",
        link: "/services/web-development/ecommerce-solutions",
      },
      {
        title: "CMS Integration",
        description: "Easy-to-use content management systems that give you full control over your website content.",
        link: "/services/web-development/cms-integration",
      },
    ],
    process: [
      "Requirements Gathering",
      "Wireframing & Design",
      "Frontend Development",
      "Backend Development",
      "Testing & QA",
      "Deployment & Launch",
      "Maintenance & Support",
    ],
    caseStudies: [
      {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with custom product configurator and payment integration.",
        image: "/projects/p1.png?height=600&width=800",
        results: "200% increase in online sales",
      },
      {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with custom product configurator and payment integration.",
        image: "/projects/p2.png?height=600&width=800",
        results: "50% increase in lead generation",
      },
    ],
    faqs: [
      {
        question: "How long does it take to develop a website?",
        answer:
          "The timeline varies depending on the complexity of the project. A simple website can take 4-6 weeks, while more complex projects like e-commerce platforms may take 3-6 months.",
      },
      {
        question: "Do you provide website maintenance services?",
        answer:
          "Yes, we offer ongoing maintenance and support services to ensure your website remains secure, up-to-date, and performing optimally.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "We specialize in website redesigns that improve user experience, performance, and conversion rates while maintaining your brand identity.",
      },
      {
        question: "What CMS platforms do you work with?",
        answer:
          "We work with various CMS platforms including WordPress, Drupal, Shopify, and custom solutions built with modern frameworks like Next.js.",
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
