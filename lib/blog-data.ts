export type BlogSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type BlogAuthor = {
  name: string
  role: string
  bio: string
  sameAs?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  image: string
  date: string
  publishedAt: string
  updatedAt: string
  author: string
  readTime: string
  excerpt: string
  tags: string[]
  sections: BlogSection[]
}

export const blogAuthors: Record<string, BlogAuthor> = {
  "Ajay Kumar": {
    name: "Ajay Kumar",
    role: "AI/ML & Full Static Developer",
    bio: "Ajay combines static web engineering with AI/ML implementation to deliver fast, intelligent user experiences.",
  },
  "Anusha Agarwal": {
    name: "Anusha Agarwal",
    role: "Cybersecurity Expert",
    bio: "Anusha ensures systems and products are secure, compliant, and resilient with expertise in ethical hacking, cloud security, and threat analysis.",
  },
  "Arshpreet Singh": {
    name: "Arshpreet Singh",
    role: "Python & Django Backend Expert",
    bio: "Arshpreet builds stable backend systems with Django, API architecture, and database-driven workflows for scalable products.",
    sameAs: ["https://www.linkedin.com/in/arshpreet-singh-4a7b7a192/"],
  },
  "Manpreet Singh": {
    name: "Manpreet Singh",
    role: "Python, Django, DevOps & Docker Expert",
    bio: "Manpreet focuses on production deployment architecture with Python, Django, Docker, and DevOps automation best practices.",
    sameAs: ["https://www.linkedin.com/in/er-manpreet-singh-0a5a7a192/"],
  },
  "Rajeev Kumar": {
    name: "Rajeev Kumar",
    role: "Project Manager",
    bio: "Rajeev coordinates client communication, timelines, and resource allocation so product teams can move quickly without losing delivery discipline.",
  },
  "Ritika Sharma": {
    name: "Ritika Sharma",
    role: "Creative Director",
    bio: "Ritika shapes user experience, storytelling, and interface direction so product delivery stays aligned with customer expectations.",
  },
}

export const blogPosts: BlogPost[] = [
  {
    slug: "llm-evaluation-frameworks-for-production-teams",
    title: "LLM Evaluation Frameworks for Production Teams: What to Measure Beyond Demo Quality",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1400&q=80",
    date: "March 24, 2026",
    publishedAt: "2026-03-24T00:00:00.000Z",
    updatedAt: "2026-03-24T00:00:00.000Z",
    author: "Ajay Kumar",
    readTime: "9 min read",
    excerpt:
      "A practical evaluation stack for LLM features covering answer quality, task completion, latency, cost, and risk before production rollout.",
    tags: ["LLM", "Evaluation", "AI Quality"],
    sections: [
      {
        heading: "Demo Wins Rarely Predict Production Reliability",
        paragraphs: [
          "LLM features usually look strongest in curated demos. Real users introduce ambiguous prompts, broken context, missing data, and higher stakes that expose weaknesses quickly.",
          "Teams need an evaluation system that reflects operating reality instead of relying on subjective approval after a few internal tests.",
        ],
      },
      {
        heading: "Measure the Full Product Outcome",
        paragraphs: [
          "The right framework combines model metrics with business metrics. Accuracy matters, but so do time-to-answer, escalation rate, and whether the workflow actually finishes faster.",
        ],
        bullets: [
          "Track groundedness and citation quality for knowledge workflows.",
          "Measure task completion rate, not only response fluency.",
          "Set cost ceilings by request type and fallback path.",
          "Review unsafe or low-confidence outputs in a weekly failure analysis loop.",
        ],
      },
      {
        heading: "Evaluation Should Stay in the Delivery Cycle",
        paragraphs: [
          "The most resilient teams treat evaluation like testing: versioned, repeatable, and connected to release decisions.",
          "That discipline helps AI product quality improve with each iteration instead of drifting after launch.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-for-operations-with-human-approval",
    title: "AI Agents for Operations: Where Automation Helps and Where Human Approval Still Matters",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    date: "March 17, 2026",
    publishedAt: "2026-03-17T00:00:00.000Z",
    updatedAt: "2026-03-17T00:00:00.000Z",
    author: "Arshpreet Singh",
    readTime: "8 min read",
    excerpt:
      "How to scope AI agents for internal operations without handing over approvals, customer communication, or risky workflow changes too early.",
    tags: ["AI Agents", "Automation", "Operations"],
    sections: [
      {
        heading: "Start With Bounded Workflows",
        paragraphs: [
          "Agentic systems are most useful when tasks have clear goals, narrow tools, and observable checkpoints. The goal is to reduce repetitive work, not to create unsupervised autonomy everywhere.",
          "Internal workflows such as triage, document preparation, and status summarization are often safer starting points than customer-facing decisions.",
        ],
      },
      {
        heading: "Define Approval Boundaries Early",
        paragraphs: [
          "The handoff between agent and human should be explicit. Teams get into trouble when the approval model is implied rather than designed.",
        ],
        bullets: [
          "Require human sign-off for financial, legal, or customer-impacting actions.",
          "Log tool usage, retrieved context, and final outputs for auditability.",
          "Use role-based permissions so agents cannot exceed workflow intent.",
          "Design fallback flows for missing data, contradictory instructions, and timeout conditions.",
        ],
      },
      {
        heading: "Good Operations Design Beats Maximum Autonomy",
        paragraphs: [
          "The strongest agent rollouts improve cycle time and consistency while preserving accountability. That usually means partial automation with excellent escalation design, not full autonomy on day one.",
        ],
      },
    ],
  },
  {
    slug: "rag-architecture-patterns-that-earn-user-trust",
    title: "RAG Architecture Patterns That Earn User Trust in Knowledge-Heavy Products",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    date: "March 10, 2026",
    publishedAt: "2026-03-10T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z",
    author: "Manpreet Singh",
    readTime: "10 min read",
    excerpt:
      "A guide to retrieval architecture, chunking, ranking, and citation design for RAG systems that need to be trusted by real users.",
    tags: ["RAG", "LLM", "Knowledge Systems"],
    sections: [
      {
        heading: "Trust Comes From Retrieval Quality",
        paragraphs: [
          "Users stop trusting knowledge assistants when answers sound polished but cite weak or outdated sources. Retrieval quality is the foundation of product trust, not a secondary optimization.",
          "That means teams should invest early in source hygiene, chunking strategy, metadata structure, and query rewriting rather than focusing only on prompt phrasing.",
        ],
      },
      {
        heading: "Architecture Decisions That Matter Most",
        paragraphs: [
          "A reliable RAG stack depends on how content is prepared, retrieved, ranked, and rendered back to the user.",
        ],
        bullets: [
          "Chunk by meaning and document structure, not by arbitrary token counts alone.",
          "Store source metadata so users can inspect recency, owner, and document type.",
          "Rerank top results before generation when corpus quality is uneven.",
          "Expose citations inline so answers can be verified quickly.",
        ],
      },
      {
        heading: "Design for Missing Answers Too",
        paragraphs: [
          "Good RAG experiences also know when not to answer. If retrieval confidence is weak, the interface should ask for clarification, suggest source filters, or route to human support.",
        ],
      },
    ],
  },
  {
    slug: "nextjs-performance-playbook",
    title: "Next.js Performance Playbook: 12 Practical Wins for Fast Product Teams",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    date: "March 03, 2026",
    publishedAt: "2026-03-03T00:00:00.000Z",
    updatedAt: "2026-03-03T00:00:00.000Z",
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
    publishedAt: "2026-02-26T00:00:00.000Z",
    updatedAt: "2026-02-26T00:00:00.000Z",
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
    publishedAt: "2026-02-19T00:00:00.000Z",
    updatedAt: "2026-02-19T00:00:00.000Z",
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
    publishedAt: "2026-02-11T00:00:00.000Z",
    updatedAt: "2026-02-11T00:00:00.000Z",
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
    publishedAt: "2026-02-04T00:00:00.000Z",
    updatedAt: "2026-02-04T00:00:00.000Z",
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
    publishedAt: "2026-01-29T00:00:00.000Z",
    updatedAt: "2026-01-29T00:00:00.000Z",
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

export function getBlogAuthor(name: string) {
  return blogAuthors[name]
}
