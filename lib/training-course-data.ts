export type TrainingCourse = {
  slug: string
  title: string
  description: string
  duration: string
  level: string
  format: string
  projects: string
  skills: string[]
  popular?: boolean
}

export type TrainingCourseCategory = {
  key: "web" | "mobile" | "devops" | "design" | "ai"
  label: string
  summary: string
  items: TrainingCourse[]
}

export const trainingCourseCategories: TrainingCourseCategory[] = [
  {
    key: "web",
    label: "Web Development",
    summary: "Production-focused web engineering from frontend fundamentals to full-stack architecture.",
    items: [
      {
        slug: "full-stack-web-development-bootcamp",
        title: "Full-Stack Web Development Bootcamp",
        description:
          "End-to-end web development covering React, Next.js, Node.js, APIs, databases, auth, deployment, and team workflows.",
        duration: "12 weeks",
        level: "Beginner to Intermediate",
        format: "Live online + weekend labs",
        projects: "4 capstone-grade projects",
        skills: ["React", "Next.js", "Node.js", "REST APIs", "PostgreSQL"],
        popular: true,
      },
      {
        slug: "react-nextjs-production-development",
        title: "React & Next.js Production Development",
        description:
          "Build scalable React and Next.js applications with advanced routing, server rendering, state strategy, and performance tuning.",
        duration: "6 weeks",
        level: "Intermediate",
        format: "Live evening cohort",
        projects: "2 production-style builds",
        skills: ["SSR/ISR", "App Router", "Performance", "Testing", "SEO"],
      },
      {
        slug: "mean-mern-stack-development",
        title: "MEAN & MERN Stack Development",
        description:
          "Master MongoDB, Express, Angular/React, and Node.js to build complete business applications with authentication and dashboards.",
        duration: "8 weeks",
        level: "Intermediate to Advanced",
        format: "Live online + mentorship",
        projects: "3 industry workflow projects",
        skills: ["MongoDB", "Express", "Angular", "React", "Node.js"],
        popular: true,
      },
      {
        slug: "static-web-jamstack-development",
        title: "Static Web & Jamstack Development",
        description:
          "Create fast, secure, SEO-first static sites and headless CMS workflows for landing pages, portfolios, and business sites.",
        duration: "4 weeks",
        level: "Beginner to Intermediate",
        format: "Weekend intensive",
        projects: "2 deploy-ready static sites",
        skills: ["Jamstack", "Headless CMS", "Netlify/Vercel", "Accessibility", "SEO"],
      },
    ],
  },
  {
    key: "mobile",
    label: "Mobile Apps",
    summary: "Cross-platform and native mobile development with practical deployment workflows.",
    items: [
      {
        slug: "react-native-mobile-development",
        title: "Mobile App Development with React Native",
        description:
          "Develop modern cross-platform mobile apps with native APIs, reusable architecture, and app release strategies.",
        duration: "10 weeks",
        level: "Intermediate",
        format: "Live online + mobile labs",
        projects: "3 mobile product builds",
        skills: ["React Native", "Navigation", "State", "Native Modules", "Play Store/App Store"],
        popular: true,
      },
      {
        slug: "ios-development-with-swift",
        title: "iOS Development with Swift",
        description:
          "Learn Swift and iOS architecture to build polished native iPhone applications and ship them confidently.",
        duration: "8 weeks",
        level: "Beginner to Intermediate",
        format: "Live online",
        projects: "2 iOS app case studies",
        skills: ["Swift", "SwiftUI", "Core Data", "UIKit", "App Lifecycle"],
      },
      {
        slug: "flutter-development-masterclass",
        title: "Flutter Development Masterclass",
        description:
          "Build high-quality Flutter apps for Android and iOS with robust UI systems and reusable component patterns.",
        duration: "8 weeks",
        level: "Intermediate",
        format: "Live evening cohort",
        projects: "2 full mobile apps",
        skills: ["Flutter", "Dart", "State Management", "Animations", "API Integration"],
      },
    ],
  },
  {
    key: "devops",
    label: "DevOps & Cloud",
    summary: "Operational excellence for CI/CD, cloud infrastructure, reliability, and platform engineering.",
    items: [
      {
        slug: "devops-engineering-certification",
        title: "DevOps Engineering Certification",
        description:
          "Implement CI/CD, observability, release pipelines, and automation strategies used by high-performing engineering teams.",
        duration: "10 weeks",
        level: "Intermediate to Advanced",
        format: "Live + guided labs",
        projects: "3 deployment pipeline projects",
        skills: ["CI/CD", "GitHub Actions", "Infra as Code", "Monitoring", "Release Strategy"],
        popular: true,
      },
      {
        slug: "cloud-architecture-on-aws",
        title: "Cloud Architecture on AWS",
        description:
          "Design scalable and fault-tolerant cloud systems with security and cost-optimization best practices.",
        duration: "8 weeks",
        level: "Intermediate to Advanced",
        format: "Live online",
        projects: "2 cloud architecture blueprints",
        skills: ["AWS", "VPC", "Compute", "Serverless", "Cost Optimization"],
        popular: true,
      },
      {
        slug: "docker-kubernetes-fundamentals",
        title: "Docker & Kubernetes Fundamentals",
        description:
          "Containerize applications and orchestrate production workloads using Kubernetes, with practical reliability patterns.",
        duration: "6 weeks",
        level: "Intermediate",
        format: "Live weekend cohort",
        projects: "2 orchestration labs",
        skills: ["Docker", "Kubernetes", "Helm", "Service Mesh Basics", "Troubleshooting"],
      },
    ],
  },
  {
    key: "design",
    label: "UI/UX Design",
    summary: "Product design programs focused on user journeys, interface systems, and handoff quality.",
    items: [
      {
        slug: "ui-ux-design-bootcamp",
        title: "UI/UX Design Bootcamp",
        description:
          "Comprehensive design training from user research to wireframes, prototypes, and polished interface systems.",
        duration: "8 weeks",
        level: "Beginner to Intermediate",
        format: "Live studio sessions",
        projects: "3 portfolio-ready case studies",
        skills: ["Research", "Wireframes", "Prototyping", "Usability", "Design Systems"],
        popular: true,
      },
      {
        slug: "advanced-ui-design-with-figma",
        title: "Advanced UI Design with Figma",
        description:
          "Advanced visual design and component architecture in Figma with professional collaboration and handoff standards.",
        duration: "6 weeks",
        level: "Intermediate",
        format: "Live online",
        projects: "2 advanced interface kits",
        skills: ["Figma", "Auto Layout", "Components", "Interaction Design", "Handoff"],
      },
      {
        slug: "design-systems-workshop",
        title: "Design Systems Workshop",
        description:
          "Create maintainable design systems that scale across teams, platforms, and product modules.",
        duration: "4 weeks",
        level: "Intermediate to Advanced",
        format: "Workshop sprint",
        projects: "1 scalable design system",
        skills: ["Token Strategy", "Documentation", "Governance", "Component Libraries", "Adoption"],
        popular: true,
      },
    ],
  },
  {
    key: "ai",
    label: "AI & Machine Learning",
    summary: "Applied AI programs across ML foundations, LLM systems, and computer vision workflows.",
    items: [
      {
        slug: "ml-ai-fundamentals",
        title: "Machine Learning & AI Fundamentals",
        description:
          "Core machine learning concepts, model evaluation, and practical AI implementation patterns for real-world problems.",
        duration: "10 weeks",
        level: "Intermediate",
        format: "Live online + exercises",
        projects: "3 practical ML mini-projects",
        skills: ["Supervised Learning", "Model Metrics", "Feature Engineering", "Data Pipelines", "Deployment Basics"],
        popular: true,
      },
      {
        slug: "llm-development-with-langchain",
        title: "LLM Development with LangChain",
        description:
          "Build advanced LLM applications with prompt engineering, RAG pipelines, agents, and production safety strategies.",
        duration: "8 weeks",
        level: "Intermediate to Advanced",
        format: "Live online + labs",
        projects: "2 LLM application builds",
        skills: ["LangChain", "RAG", "Prompt Engineering", "Vector DB", "Agent Workflows"],
        popular: true,
      },
      {
        slug: "hugging-face-models-applications",
        title: "Hugging Face Models & Applications",
        description:
          "Use and fine-tune Hugging Face models for NLP and vision tasks, then deploy performant inference workflows.",
        duration: "6 weeks",
        level: "Intermediate",
        format: "Live online",
        projects: "2 model deployment labs",
        skills: ["Transformers", "Fine-tuning", "Inference", "Pipelines", "Evaluation"],
      },
      {
        slug: "computer-vision-image-recognition",
        title: "Computer Vision & Image Recognition",
        description:
          "Train and deploy vision models for classification, detection, and segmentation with real-time use cases.",
        duration: "8 weeks",
        level: "Intermediate to Advanced",
        format: "Live online + coding labs",
        projects: "2 computer vision projects",
        skills: ["CNNs", "Transfer Learning", "Detection", "Segmentation", "Real-time Inference"],
        popular: true,
      },
    ],
  },
]

export const trainingContactDetails = {
  email: "info@rayonweb.com",
  phone: "+1 (123) 456-7890",
  location: "Mohali, Punjab",
}
