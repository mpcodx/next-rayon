export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  image: string
  overview: string[]
  challenges: string[]
  approach: string[]
  solution: string[]
  outcomes: string[]
  techStack: string[]
  services: { name: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform Modernization",
    category: "Web Development",
    summary:
      "Conversion-focused commerce platform with faster product discovery, streamlined checkout, and flexible merchandising workflows.",
    image: "/projects/p1.png?height=600&width=800",
    overview: [
      "A retail brand needed a modern storefront that could scale a growing catalog, support seasonal launches, and reduce friction in the checkout flow.",
      "We partnered on a full rebuild that prioritized speed, clarity, and operational flexibility for the merchandising team.",
    ],
    challenges: [
      "Product pages loaded slowly during peak traffic, creating drop-offs at discovery.",
      "Promo logic was inconsistent across channels, leading to customer confusion.",
      "Content updates required engineering effort, slowing marketing launches.",
    ],
    approach: [
      "Mapped the end-to-end shopper journey and identified the highest impact drop-off points.",
      "Defined performance budgets and information architecture before interface work began.",
      "Aligned merchandising, marketing, and engineering on a shared release cadence.",
    ],
    solution: [
      "Implemented a headless storefront with a structured CMS for fast content updates.",
      "Built a simplified, multi-step checkout with clear pricing and trust signals.",
      "Instrumented analytics to track funnel performance and merchandising performance.",
    ],
    outcomes: [
      "Faster page rendering across product and category templates.",
      "Cleaner product discovery and more predictable promo experiences.",
      "Merchandising teams can launch campaigns without engineering bottlenecks.",
    ],
    techStack: ["Next.js", "Headless CMS", "TypeScript", "Payments API", "Analytics"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "quizzes-platform",
    title: "Interactive Quizzes Platform",
    category: "UI/UX Design",
    summary:
      "Engaging quizzes experience with flexible content authoring, tiered plans, and personalized result flows.",
    image: "/projects/p8.png?height=600&width=800",
    overview: [
      "A fast-growing content brand wanted to turn quizzes into a core acquisition and engagement channel.",
      "We designed a product experience that balanced speed to publish with a premium, shareable user journey.",
    ],
    challenges: [
      "Legacy templates limited content creativity and personalization.",
      "Results pages lacked clear next steps, lowering conversions.",
      "The team needed a way to iterate on quizzes without developer support.",
    ],
    approach: [
      "Designed a modular quiz builder focused on fast iteration and A/B testing.",
      "Created a branded design system to keep templates consistent and flexible.",
      "Defined conversion paths from quiz results into subscriptions and content bundles.",
    ],
    solution: [
      "Delivered a reusable quiz framework with configurable layouts and logic.",
      "Built outcome screens that connect quiz results with personalized recommendations.",
      "Streamlined publishing workflows with roles, approvals, and content previews.",
    ],
    outcomes: [
      "Improved completion rates through clearer flow and progress cues.",
      "More consistent brand experience across all quizzes.",
      "Faster time from idea to live quiz content.",
    ],
    techStack: ["Design System", "Component Library", "Content Workflow", "Analytics"],
    services: [
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "AI & Machine Learning", href: "/services/ai-ml" },
    ],
  },
  {
    slug: "learning-management-system",
    title: "Learning Management System",
    category: "LMS & Integration",
    summary:
      "Custom LMS enabling cohort delivery, payments, learner tracking, and integrations with CRM and analytics.",
    image: "/projects/p6.png?height=600&width=800",
    overview: [
      "A training provider needed a unified platform to host courses, manage cohorts, and simplify billing.",
      "We delivered a custom LMS that integrates sales, learning, and reporting workflows in one system.",
    ],
    challenges: [
      "Student data lived across multiple tools, making reporting slow and unreliable.",
      "Manual billing steps caused delays and inconsistent learner access.",
      "Course teams needed better visibility into learner progress and outcomes.",
    ],
    approach: [
      "Mapped operational workflows across sales, delivery, and support teams.",
      "Designed role-based dashboards that match daily responsibilities.",
      "Planned integrations early to avoid duplicated data entry and reporting gaps.",
    ],
    solution: [
      "Built a course platform with cohort management, progress tracking, and messaging.",
      "Integrated payments, CRM sync, and reporting for unified learner profiles.",
      "Added analytics for engagement, completion, and cohort health.",
    ],
    outcomes: [
      "Cleaner handoff between sales and delivery teams.",
      "More consistent learner access and course scheduling.",
      "Actionable insights for instructors and program managers.",
    ],
    techStack: ["Next.js", "CRM Integration", "Payment Gateway", "Analytics", "Role-based Access"],
    services: [
      { name: "LMS Integration", href: "/services/lms-integration" },
      { name: "DevOps & Cloud", href: "/services/devops-cloud" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
]

export const featuredProjects = projects.slice(0, 3)

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
