import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/qa-automation/performance-audits")

export default function PerformanceAuditsPage() {
  const serviceData = {
    title: "Performance Audits",
    description:
      "Comprehensive performance testing to identify bottlenecks and optimize your application's speed and efficiency.",
    parentService: "QA & Automation",
    parentServiceLink: "/services/qa-automation",
    color: "from-green-500 to-emerald-500",
    features: [
      {
        title: "Load Testing",
        description: "Simulate high user loads to identify performance bottlenecks and system limitations.",
      },
      {
        title: "Stress Testing",
        description: "Push your system beyond normal operational capacity to test stability and recovery.",
      },
      {
        title: "Frontend Performance",
        description:
          "Analyze and optimize client-side performance including rendering, loading, and interaction times.",
      },
      {
        title: "Database Optimization",
        description: "Identify and resolve database performance issues including query optimization and indexing.",
      },
    ],
    process: [
      {
        title: "Performance Requirements Analysis",
        description: "We define performance goals and requirements based on your business needs and user expectations.",
      },
      {
        title: "Test Planning",
        description: "We develop comprehensive performance test plans including test scenarios and success criteria.",
      },
      {
        title: "Test Environment Setup",
        description:
          "We set up appropriate test environments and monitoring tools for accurate performance measurement.",
      },
      {
        title: "Test Execution",
        description: "We execute various performance tests and collect detailed metrics and data.",
      },
      {
        title: "Analysis & Recommendations",
        description: "We analyze results and provide actionable recommendations for performance optimization.",
      },
    ],
    technologies: ["JMeter", "Gatling", "Lighthouse", "WebPageTest", "New Relic", "Datadog", "Grafana", "Locust", "k6"],
    faqs: [
      {
        question: "What types of performance testing do you conduct?",
        answer:
          "We conduct various types of performance testing including load testing (simulating expected user loads), stress testing (pushing systems beyond normal capacity), endurance testing (verifying performance over extended periods), spike testing (sudden increases in load), volume testing (large amounts of data), scalability testing (ability to scale with increased load), and frontend performance testing (analyzing client-side performance metrics like page load time, time to interactive, and Core Web Vitals).",
      },
      {
        question: "How do you determine the appropriate performance testing scenarios?",
        answer:
          "We determine testing scenarios based on several factors: your business requirements and SLAs; analysis of real user behavior and traffic patterns; critical user journeys and business transactions; peak load expectations; growth projections; and system architecture. We work closely with your team to identify the most important scenarios that align with your business goals and user expectations.",
      },
      {
        question: "What metrics do you focus on during performance audits?",
        answer:
          "We focus on key metrics including response time (average, percentiles, and maximum), throughput (transactions per second), error rate, resource utilization (CPU, memory, disk I/O, network), database performance metrics, frontend metrics (TTFB, FCP, LCP, CLS, TTI), concurrent user capacity, and business-specific KPIs. We tailor our focus based on your specific application type and performance goals.",
      },
      {
        question: "How do you approach performance optimization after identifying issues?",
        answer:
          "Our optimization approach follows a systematic process: we prioritize issues based on impact and effort; address low-hanging fruit first; implement optimizations in controlled phases; verify improvements through comparative testing; and document best practices for future development. Common optimizations include code refactoring, caching strategies, database query optimization, frontend asset optimization, infrastructure scaling, and architecture improvements.",
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
