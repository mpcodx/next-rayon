export type BlogSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  image: string
  date: string
  author: string
  readTime: string
  excerpt: string
  tags: string[]
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-performance-playbook",
    title: "Next.js Performance Playbook: 12 Practical Wins for Fast Product Teams",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    date: "March 03, 2026",
    author: "Manpreet Singh",
    readTime: "8 min read",
    excerpt:
      "A practical checklist for improving Core Web Vitals, route transitions, and API throughput in modern Next.js applications.",
    tags: ["Next.js", "Performance", "Frontend Architecture"],
    sections: [
      {
        heading: "Start With What Users Feel",
        paragraphs: [
          "Performance work should start from user journeys, not generic audits. Measure page load, first interaction, and route transitions on your most-used screens.",
          "Teams usually gain more by fixing three slow templates than by touching every route at once.",
        ],
      },
      {
        heading: "Build a Repeatable Optimization Loop",
        paragraphs: [
          "Treat optimization as a weekly loop: measure, prioritize, fix, and verify. Keep the same dashboards so regressions are visible immediately.",
        ],
        bullets: [
          "Ship compressed responsive images with accurate `sizes`.",
          "Avoid waterfall fetches on server components.",
          "Split expensive client bundles by route intent.",
          "Cache API responses at the edge where possible.",
        ],
      },
      {
        heading: "Protect Performance in CI",
        paragraphs: [
          "Once you improve metrics, lock them with budgets. Performance should fail builds the same way tests fail builds.",
          "This keeps fast experiences from being undone during feature rush cycles.",
        ],
      },
    ],
  },
  {
    slug: "react-native-release-checklist",
    title: "React Native Release Checklist: From Prototype to Stable App Store Build",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80",
    date: "February 26, 2026",
    author: "Ritika Sharma",
    readTime: "7 min read",
    excerpt:
      "A release checklist for teams shipping cross-platform apps with fewer crashes, better startup time, and cleaner observability.",
    tags: ["React Native", "Mobile Engineering", "Release Management"],
    sections: [
      {
        heading: "Stability First, Features Second",
        paragraphs: [
          "Shipping mobile software means working with unpredictable networks, device memory limits, and background interruptions. Reliability matters as much as feature depth.",
        ],
      },
      {
        heading: "Release Discipline That Scales",
        paragraphs: [
          "Create one release checklist used by engineering, design, QA, and product. Shared release ownership reduces late surprises.",
        ],
        bullets: [
          "Crash-free session threshold before release.",
          "Versioned feature flags for risky UI changes.",
          "Offline and low-connectivity validation.",
          "Post-release monitoring window with rollback owner.",
        ],
      },
    ],
  },
  {
    slug: "devops-roadmap-for-growing-startups",
    title: "DevOps Roadmap for Growing Startups: What to Automate at Each Stage",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    date: "February 19, 2026",
    author: "Ajay Kumar",
    readTime: "9 min read",
    excerpt:
      "A staged DevOps roadmap for startups moving from manual deploys to predictable, auditable infrastructure.",
    tags: ["DevOps", "Cloud", "CI/CD"],
    sections: [
      {
        heading: "Automation Should Follow Risk",
        paragraphs: [
          "Do not automate everything from day one. Start with the places where human error is expensive: deployments, secrets, and backups.",
        ],
      },
      {
        heading: "Three Milestones",
        paragraphs: [
          "Most teams can sequence their DevOps journey in three milestones without over-engineering.",
        ],
        bullets: [
          "Milestone 1: Standardized environments and basic CI.",
          "Milestone 2: Safer deployments with preview and rollback.",
          "Milestone 3: Observability, SLOs, and cost controls.",
        ],
      },
    ],
  },
  {
    slug: "design-systems-that-dont-slow-teams",
    title: "Design Systems That Don't Slow Teams: Governance, Tokens, and Adoption",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1400&q=80",
    date: "February 11, 2026",
    author: "Anusha Agarwal",
    readTime: "6 min read",
    excerpt:
      "How to build a design system that improves consistency without adding friction for engineering and product teams.",
    tags: ["Design System", "UI/UX", "Product Design"],
    sections: [
      {
        heading: "A Design System Is a Product",
        paragraphs: [
          "Treat your system like an internal product with roadmap, documentation, and clear versioning. Without product ownership, component libraries drift quickly.",
        ],
      },
      {
        heading: "What Makes Adoption Work",
        paragraphs: [
          "Adoption grows when designers and engineers can move faster with the system than without it.",
        ],
        bullets: [
          "Token-driven theming across web and mobile.",
          "Usage docs with copy-paste examples.",
          "Accessibility checks in component CI.",
        ],
      },
    ],
  },
  {
    slug: "ai-integration-without-product-chaos",
    title: "AI Integration Without Product Chaos: Guardrails for Real Business Value",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    date: "February 04, 2026",
    author: "Arshpreet Singh",
    readTime: "8 min read",
    excerpt:
      "A framework for integrating AI features in production products while controlling risk, cost, and user trust.",
    tags: ["AI", "LLM", "Product Strategy"],
    sections: [
      {
        heading: "Focus on One High-Value Workflow",
        paragraphs: [
          "The strongest AI launches improve one measurable workflow first. Broad AI rollouts without a core use case create support and trust issues.",
        ],
      },
      {
        heading: "Guardrails to Add Early",
        paragraphs: [
          "Guardrails should be part of architecture, not a late patch.",
        ],
        bullets: [
          "Prompt and response logging with sensitive-data controls.",
          "Fallbacks for low-confidence responses.",
          "Human review paths for high-impact actions.",
          "Cost caps and model routing by request type.",
        ],
      },
    ],
  },
  {
    slug: "engineering-pricing-models-for-service-businesses",
    title: "Engineering Pricing Models for Service Businesses: Scope, Risk, and Margin",
    category: "Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    date: "January 29, 2026",
    author: "Rajeev Kumar",
    readTime: "7 min read",
    excerpt:
      "How to choose fixed bid, retainer, or sprint-based pricing models based on delivery risk and requirement clarity.",
    tags: ["Business", "Delivery", "Pricing"],
    sections: [
      {
        heading: "Choose Model by Uncertainty",
        paragraphs: [
          "Pricing should follow requirement clarity. Fixed bids work for stable scope; retainers and sprint pricing work better when discovery is still active.",
        ],
      },
      {
        heading: "Protect Delivery Quality",
        paragraphs: [
          "The right contract structure protects both margin and quality. Ambiguous scope under fixed timelines almost always creates delivery debt.",
        ],
      },
    ],
  },
]

export const blogCategories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
