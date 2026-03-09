import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/qa-automation/automated-ci-tests")

export default function AutomatedCITestsPage() {
  const serviceData = {
    title: "Automated CI Tests",
    description:
      "Continuous integration testing to catch issues early in the development process and ensure code quality.",
    parentService: "QA & Automation",
    parentServiceLink: "/services/qa-automation",
    color: "from-green-500 to-emerald-500",
    features: [
      {
        title: "Automated Test Suites",
        description: "Comprehensive automated tests covering unit, integration, and end-to-end testing scenarios.",
      },
      {
        title: "CI/CD Pipeline Integration",
        description: "Seamless integration with your CI/CD pipelines for automated testing on every code change.",
      },
      {
        title: "Test Reports & Analytics",
        description: "Detailed test reports and analytics to track test coverage, success rates, and trends over time.",
      },
      {
        title: "Parallel Test Execution",
        description: "Optimized test execution to reduce feedback time and improve development velocity.",
      },
    ],
    process: [
      {
        title: "Test Strategy Development",
        description: "We develop a comprehensive automation strategy aligned with your development workflow.",
      },
      {
        title: "Framework Selection",
        description: "We help you select the right automation frameworks and tools based on your technology stack.",
      },
      {
        title: "Test Development",
        description: "We develop maintainable and reliable automated tests following best practices.",
      },
      {
        title: "CI Integration",
        description: "We integrate the automated tests with your CI/CD pipeline for continuous testing.",
      },
      {
        title: "Monitoring & Maintenance",
        description: "We provide ongoing monitoring and maintenance to ensure test reliability and effectiveness.",
      },
    ],
    technologies: [
      "Selenium",
      "Cypress",
      "Playwright",
      "Jest",
      "Mocha",
      "Jenkins",
      "GitHub Actions",
      "CircleCI",
      "TestNG",
    ],
    faqs: [
      {
        question: "What types of tests can be automated in a CI pipeline?",
        answer:
          "Various types of tests can be automated in a CI pipeline, including unit tests (testing individual components), integration tests (testing interactions between components), API tests (verifying API functionality), UI tests (checking user interface functionality), performance tests (measuring system performance), security scans (identifying vulnerabilities), and static code analysis (checking code quality). The ideal CI pipeline includes a balanced mix of these test types to provide comprehensive coverage while maintaining reasonable execution times.",
      },
      {
        question: "How do you handle flaky tests in CI pipelines?",
        answer:
          "We address flaky tests through several strategies: identifying and fixing root causes (like race conditions, timing issues, or external dependencies); implementing retry mechanisms for intermittently failing tests; isolating test environments to prevent interference; using explicit waits instead of fixed delays; implementing proper test data management; quarantining unreliable tests until fixed; and monitoring test stability metrics over time. Our goal is to maintain a reliable test suite that provides trustworthy feedback.",
      },
      {
        question: "What automation frameworks do you recommend?",
        answer:
          "Our framework recommendations depend on your specific needs. For web UI testing, we often recommend Cypress or Playwright for modern applications due to their reliability and developer-friendly features. For API testing, we might suggest REST Assured, Postman/Newman, or custom frameworks using axios/fetch. For mobile testing, Appium is our typical choice. For unit testing, we recommend Jest for JavaScript, JUnit for Java, or pytest for Python. We'll help you select the best tools based on your technology stack and team expertise.",
      },
      {
        question: "How do you balance test coverage with execution time in CI pipelines?",
        answer:
          "We balance coverage and execution time through several approaches: implementing a test pyramid with more unit tests (fast) and fewer end-to-end tests (slow); using parallel test execution; implementing intelligent test selection to run only tests affected by code changes; separating tests into different stages (critical tests run on every commit, comprehensive tests run nightly); optimizing individual test execution time; and continuously monitoring and refining the test suite based on metrics and feedback.",
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
