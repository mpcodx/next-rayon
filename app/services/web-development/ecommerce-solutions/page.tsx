import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/web-development/ecommerce-solutions")

export default function EcommerceSolutionsPage() {
  const serviceData = {
    title: "E-commerce Solutions",
    description: "Powerful online stores with secure payment processing, inventory management, and customer analytics.",
    parentService: "Web Development",
    parentServiceLink: "/services/web-development",
    color: "from-purple-500 to-blue-500",
    features: [
      {
        title: "Custom E-commerce Platforms",
        description: "Tailored online stores built to meet your specific business requirements and sales strategies.",
      },
      {
        title: "Secure Payment Processing",
        description: "Integration with multiple payment gateways to provide secure and flexible payment options.",
      },
      {
        title: "Inventory Management",
        description: "Robust inventory systems to track stock levels, manage products, and automate reordering.",
      },
      {
        title: "Customer Analytics",
        description: "Detailed insights into customer behavior, sales patterns, and marketing effectiveness.",
      },
    ],
    process: [
      {
        title: "Business Analysis",
        description:
          "We analyze your business model, products, target market, and sales goals to plan the optimal e-commerce solution.",
      },
      {
        title: "Platform Selection",
        description: "Based on your needs, we recommend the most suitable e-commerce platform or custom solution.",
      },
      {
        title: "Design & Development",
        description:
          "We design and develop your online store with a focus on user experience and conversion optimization.",
      },
      {
        title: "Payment & Shipping Setup",
        description: "We integrate payment gateways and shipping methods tailored to your business requirements.",
      },
      {
        title: "Testing & Launch",
        description:
          "We thoroughly test all aspects of your store, from checkout to inventory management, before launch.",
      },
    ],
    technologies: [
      "Shopify",
      "WooCommerce",
      "Magento",
      "BigCommerce",
      "Stripe",
      "PayPal",
      "Square",
      "Next.js Commerce",
      "Snipcart",
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
      <SubServiceCTA />
    </div>
  )
}
