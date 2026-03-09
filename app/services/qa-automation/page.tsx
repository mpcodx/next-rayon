import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceFeatures from "@/components/services/service-features"
import ServiceProcess from "@/components/services/service-process"
import ServiceCaseStudies from "@/components/services/service-case-studies"
import ServiceFAQ from "@/components/services/service-faq"
import ServiceCTA from "@/components/services/service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/qa-automation")

export default function QAAutomationPage() {
  const serviceData = {
    title: "QA & Automation",
    description: "Comprehensive testing strategies with manual and automated testing to ensure quality.",
    icon: "TestTube",
    color: "from-green-500 to-emerald-500",
    features: [
      {
        title: "Manual Testing",
        description:
          "Thorough manual testing by experienced QA professionals to ensure functionality, usability, and user experience.",
        link: "/services/qa-automation/manual-testing",
      },
      {
        title: "Automated CI Tests",
        description:
          "Continuous integration testing to catch issues early in the development process and ensure code quality.",
        link: "/services/qa-automation/automated-ci-tests",
      },
      {
        title: "Performance Audits",
        description:
          "Comprehensive performance testing to identify bottlenecks and optimize your application's speed and efficiency.",
        link: "/services/qa-automation/performance-audits",
      },
    ],
    process: [
      "Test Planning",
      "Test Case Development",
      "Test Environment Setup",
      "Manual Testing",
      "Automation Framework Setup",
      "Automated Test Development",
      "Continuous Integration",
    ],
    caseStudies: [
      {
        title: "Automated Testing Framework",
        description: "Custom testing framework for automated regression testing of a complex SaaS platform.",
        image: "/placeholder.svg?height=600&width=800",
        results: "90% reduction in regression testing time",
      },
      {
        title: "E-commerce Performance Optimization",
        description: "Performance testing and optimization for a high-traffic e-commerce website during peak seasons.",
        image: "/placeholder.svg?height=600&width=800",
        results: "60% improvement in page load times",
      },
    ],
    faqs: [
      {
        question: "What types of testing do you provide?",
        answer:
          "We offer a comprehensive range of testing services including functional testing, regression testing, performance testing, security testing, usability testing, compatibility testing, and more.",
      },
      {
        question: "What automation tools do you use?",
        answer:
          "We work with various automation tools including Selenium, Cypress, Playwright, Jest, Mocha, and others depending on the specific requirements of your project.",
      },
      {
        question: "How do you integrate testing into the development process?",
        answer:
          "We integrate testing throughout the development lifecycle using CI/CD pipelines to ensure that tests are run automatically with each code change, providing immediate feedback to developers.",
      },
      {
        question: "Can you help improve our existing QA processes?",
        answer:
          "Yes, we can assess your current QA processes and provide recommendations for improvement, including implementing best practices, setting up automation frameworks, and training your team.",
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
