import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/qa-automation/manual-testing")

export default function ManualTestingPage() {
  const serviceData = {
    title: "Manual Testing",
    description:
      "Thorough manual testing by experienced QA professionals to ensure functionality, usability, and user experience.",
    parentService: "QA & Automation",
    parentServiceLink: "/services/qa-automation",
    color: "from-green-500 to-emerald-500",
    features: [
      {
        title: "Functional Testing",
        description: "Comprehensive testing of all features and functions to ensure they work as expected.",
      },
      {
        title: "Usability Testing",
        description: "Evaluation of the user interface and experience to ensure intuitive and efficient interactions.",
      },
      {
        title: "Exploratory Testing",
        description: "Unscripted testing to discover unexpected issues and edge cases that automated tests might miss.",
      },
      {
        title: "Regression Testing",
        description: "Verification that new changes don't negatively impact existing functionality.",
      },
    ],
    process: [
      {
        title: "Test Planning",
        description: "We develop comprehensive test plans and strategies based on your project requirements.",
      },
      {
        title: "Test Case Development",
        description: "We create detailed test cases covering all aspects of your application.",
      },
      {
        title: "Test Execution",
        description: "Our experienced QA professionals execute test cases and document results.",
      },
      {
        title: "Defect Reporting",
        description:
          "We provide detailed bug reports with steps to reproduce, expected vs. actual results, and severity ratings.",
      },
      {
        title: "Regression Testing",
        description: "We perform regression testing after fixes to ensure no new issues are introduced.",
      },
    ],
    technologies: [
      "JIRA",
      "TestRail",
      "Zephyr",
      "Bugzilla",
      "Postman",
      "Charles Proxy",
      "BrowserStack",
      "LambdaTest",
      "Trello",
    ],
    faqs: [
      {
        question: "Why is manual testing still important in the age of automation?",
        answer:
          "Manual testing remains crucial because it brings human intuition, creativity, and adaptability that automated tests can't replicate. Manual testers can evaluate subjective aspects like user experience, visual design, and intuitiveness. They can perform exploratory testing to discover unexpected issues, adapt to changing requirements quickly, and provide valuable feedback on usability. The most effective QA strategy combines both manual and automated testing approaches.",
      },
      {
        question: "What types of manual testing do you perform?",
        answer:
          "We perform various types of manual testing including functional testing (verifying features work as expected), usability testing (evaluating user experience), exploratory testing (discovering unexpected issues), regression testing (ensuring new changes don't break existing functionality), compatibility testing (checking performance across browsers and devices), accessibility testing (verifying usability for people with disabilities), and localization testing (validating international adaptations). We tailor our testing approach to your specific project needs.",
      },
      {
        question: "How do you document and report issues found during manual testing?",
        answer:
          "We use a structured approach to document issues, including detailed bug reports with severity and priority ratings, steps to reproduce, expected vs. actual results, screenshots or videos demonstrating the issue, environment details, and any relevant logs or data. We typically use issue tracking systems like JIRA or TestRail to manage the reporting process, ensuring clear communication with your development team and providing metrics on testing progress and quality.",
      },
      {
        question: "How do you prioritize what to test manually vs. automate?",
        answer:
          "We prioritize manual testing for areas requiring human judgment such as UI/UX evaluation, exploratory testing of new features, complex scenarios that are difficult to automate, and infrequently changing functionality. We recommend automation for repetitive tasks, regression testing, data-driven tests, performance testing, and high-risk critical paths. Our goal is to create an optimal balance that maximizes test coverage and efficiency while minimizing costs.",
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
