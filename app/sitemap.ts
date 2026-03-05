import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rayonweb.com"

  // Main pages
  const mainRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/careers",
    "/training",
    "/training/courses",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/sitemap",
    "/security"
  ]

  // Service pages
  const serviceRoutes = [
    "/services/web-development",
    "/services/app-development",
    "/services/devops-cloud",
    "/services/ui-ux-design",
    "/services/lms-integration",
    "/services/qa-automation",
    "/services/ai-ml",
  ]

  // Web development sub-pages
  const webDevRoutes = [
    "/services/web-development/custom-website-design",
    "/services/web-development/ecommerce-solutions",
    "/services/web-development/cms-integration",
  ]

  // App development sub-pages
  const appDevRoutes = [
    "/services/app-development/mobile-apps",
    "/services/app-development/progressive-web-apps",
    "/services/app-development/cross-platform-apps",
  ]

  // DevOps sub-pages
  const devOpsRoutes = [
    "/services/devops-cloud/cloud-setup",
    "/services/devops-cloud/ci-cd-pipelines",
    "/services/devops-cloud/docker-kubernetes",
  ]

  // UI/UX design sub-pages
  const uiUxRoutes = [
    "/services/ui-ux-design/wireframes-prototyping",
    "/services/ui-ux-design/web-mobile-design",
    "/services/ui-ux-design/design-systems",
  ]

  // LMS integration sub-pages
  const lmsRoutes = [
    "/services/lms-integration/custom-lms",
    "/services/lms-integration/payment-integration",
    "/services/lms-integration/crm-api-integration",
  ]

  // QA automation sub-pages
  const qaRoutes = [
    "/services/qa-automation/manual-testing",
    "/services/qa-automation/automated-ci-tests",
    "/services/qa-automation/performance-audits",
  ]

  // AI/ML sub-pages
  const aiMlRoutes = [
    "/services/ai-ml/hugging-face-models",
    "/services/ai-ml/llm-development",
    "/services/ai-ml/custom-model-training",
    "/services/ai-ml/predictive-analytics",
    "/services/ai-ml/ai-integration",
    "/services/ai-ml/computer-vision",
    "/services/ai-ml/conversational-ai",
    "/services/ai-ml/mlops-model-monitoring",
  ]

  // Combine all routes
  const allRoutes = [
    ...mainRoutes,
    ...serviceRoutes,
    ...webDevRoutes,
    ...appDevRoutes,
    ...devOpsRoutes,
    ...uiUxRoutes,
    ...lmsRoutes,
    ...qaRoutes,
    ...aiMlRoutes,
  ]

  // Create sitemap entries
  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }))
}
