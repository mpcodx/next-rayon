import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/web-development/cms-integration")

export default function CMSIntegrationPage() {
  const serviceData = {
    title: "CMS Integration",
    description: "Seamlessly integrate content management systems to give you full control over your website content.",
    parentService: "Web Development",
    parentServiceLink: "/services/web-development",
    color: "from-purple-500 to-blue-500",
    features: [
      {
        title: "WordPress Integration",
        description: "Custom WordPress themes and plugins tailored to your specific business needs and branding.",
      },
      {
        title: "Headless CMS Solutions",
        description: "Modern headless CMS implementations for flexible content delivery across multiple platforms.",
      },
      {
        title: "E-commerce CMS",
        description: "Integrate powerful e-commerce capabilities with your content management system.",
      },
      {
        title: "Custom Admin Dashboards",
        description: "Tailored admin interfaces that make content management intuitive and efficient.",
      },
    ],
    process: [
      {
        title: "Requirements Analysis",
        description:
          "We analyze your content management needs, workflows, and user roles to determine the best CMS solution.",
      },
      {
        title: "CMS Selection",
        description: "Based on your requirements, we recommend the most suitable CMS platform for your project.",
      },
      {
        title: "Custom Development",
        description:
          "We develop custom themes, plugins, or modules to extend the CMS functionality to meet your needs.",
      },
      {
        title: "Content Migration",
        description:
          "We carefully migrate your existing content to the new CMS, ensuring data integrity and proper formatting.",
      },
      {
        title: "Training & Documentation",
        description:
          "We provide comprehensive training and documentation to ensure your team can effectively manage content.",
      },
    ],
    technologies: [
      "WordPress",
      "Drupal",
      "Contentful",
      "Strapi",
      "Sanity",
      "Shopify",
      "BigCommerce",
      "Prismic",
      "Ghost",
    ],
    faqs: [
      {
        question: "What CMS platform is best for my website?",
        answer:
          "The best CMS depends on your specific needs. WordPress is excellent for small to medium-sized businesses with its user-friendly interface and extensive plugin ecosystem. Drupal offers more robust capabilities for complex, enterprise-level sites. Headless CMS options like Contentful or Strapi are ideal for multi-channel content delivery. We'll help you evaluate factors like content complexity, technical requirements, budget, and team capabilities to recommend the most suitable platform.",
      },
      {
        question: "What is a headless CMS and when should I use it?",
        answer:
          "A headless CMS separates the content management backend from the frontend presentation layer. Content is delivered via APIs rather than being tightly coupled with the frontend. This approach is ideal when you need to deliver content to multiple platforms (web, mobile, IoT devices), want greater flexibility in frontend technologies, require high performance for content-heavy sites, or need to future-proof your content strategy as new channels emerge.",
      },
      {
        question: "Can you migrate content from our existing website to a new CMS?",
        answer:
          "Yes, we specialize in content migration between different CMS platforms. We develop custom migration scripts to transfer content while preserving relationships, metadata, and media assets. We handle complex migrations including content restructuring, URL mapping for SEO preservation, and user data transfer. Our process includes thorough testing and validation to ensure all content is migrated accurately.",
      },
      {
        question: "How do you ensure our CMS is secure?",
        answer:
          "We implement multiple security measures including regular updates to the CMS core and plugins, secure authentication with strong password policies and two-factor authentication, proper user role configuration, security plugins and firewalls, malware scanning, secure hosting configurations, and regular security audits. We also provide security best practices training for your content team to maintain ongoing protection.",
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
