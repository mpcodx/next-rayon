import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/lms-integration/payment-integration")

export default function PaymentIntegrationPage() {
  const serviceData = {
    title: "Payment Integration",
    description: "Seamless integration with payment gateways for course sales, subscriptions, and membership models.",
    parentService: "LMS & Integration",
    parentServiceLink: "/services/lms-integration",
    color: "from-amber-500 to-orange-500",
    features: [
      {
        title: "Multiple Payment Gateways",
        description: "Integration with popular payment processors to offer flexibility for your customers.",
      },
      {
        title: "Subscription Management",
        description: "Recurring billing systems for membership and subscription-based learning models.",
      },
      {
        title: "Secure Transactions",
        description: "PCI-compliant payment processing to ensure the security of financial transactions.",
      },
      {
        title: "Global Payment Support",
        description: "Support for multiple currencies and regional payment methods to serve international audiences.",
      },
    ],
    process: [
      {
        title: "Requirements Analysis",
        description: "We analyze your business model, target markets, and payment requirements.",
      },
      {
        title: "Gateway Selection",
        description: "We help you select the most suitable payment gateways based on your needs and target regions.",
      },
      {
        title: "Integration Design",
        description: "We design a secure and user-friendly payment flow integrated with your learning platform.",
      },
      {
        title: "Implementation",
        description: "We implement the payment integration with proper security measures and error handling.",
      },
      {
        title: "Testing & Deployment",
        description: "We thoroughly test all payment scenarios before deploying to production.",
      },
    ],
    technologies: [
      "Stripe",
      "PayPal",
      "Braintree",
      "Authorize.net",
      "Square",
      "Recurly",
      "Chargebee",
      "2Checkout",
      "Adyen",
    ],
    faqs: [
      {
        question: "Which payment gateways do you recommend for educational platforms?",
        answer:
          "For educational platforms, we often recommend Stripe for its developer-friendly API, extensive features, and global reach. PayPal is excellent for international audiences due to its widespread recognition. For subscription-based models, specialized platforms like Chargebee or Recurly can provide additional subscription management features. The best choice depends on your specific needs, target regions, and business model.",
      },
      {
        question: "How do you handle security for payment processing?",
        answer:
          "We implement multiple security measures including PCI DSS compliance, tokenization of payment information (so sensitive data never touches your servers), SSL/TLS encryption for all transactions, fraud detection mechanisms, and secure authentication. We follow security best practices and stay updated on the latest security standards to protect both your business and your customers.",
      },
      {
        question: "Can you implement complex pricing models for courses?",
        answer:
          "Yes, we can implement various pricing models including one-time purchases, subscriptions with different tiers, bundle pricing, time-limited access, installment payments, team/group pricing, promotional discounts, coupon codes, and free trials. We design the payment system to be flexible enough to accommodate your current pricing strategy and future changes.",
      },
      {
        question: "How do you handle international payments and currencies?",
        answer:
          "We implement multi-currency support allowing you to display prices in the user's local currency. We integrate with payment gateways that support international payment methods beyond credit cards, such as bank transfers, digital wallets, and region-specific payment options. We also implement proper tax handling for different regions and currencies to ensure compliance with local regulations.",
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
