import { blogPosts } from "@/lib/blog-data"

const baseUrl = "https://rayonweb.com"

const staticRoutes = [
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
  "/security",
  "/services/web-development",
  "/services/app-development",
  "/services/devops-cloud",
  "/services/ui-ux-design",
  "/services/lms-integration",
  "/services/qa-automation",
  "/services/ai-ml",
  "/services/web-development/custom-website-design",
  "/services/web-development/ecommerce-solutions",
  "/services/web-development/cms-integration",
  "/services/app-development/mobile-apps",
  "/services/app-development/progressive-web-apps",
  "/services/app-development/cross-platform-apps",
  "/services/devops-cloud/cloud-setup",
  "/services/devops-cloud/ci-cd-pipelines",
  "/services/devops-cloud/docker-kubernetes",
  "/services/ui-ux-design/wireframes-prototyping",
  "/services/ui-ux-design/web-mobile-design",
  "/services/ui-ux-design/design-systems",
  "/services/lms-integration/custom-lms",
  "/services/lms-integration/payment-integration",
  "/services/lms-integration/crm-api-integration",
  "/services/qa-automation/manual-testing",
  "/services/qa-automation/automated-ci-tests",
  "/services/qa-automation/performance-audits",
  "/services/ai-ml/hugging-face-models",
  "/services/ai-ml/llm-development",
  "/services/ai-ml/custom-model-training",
  "/services/ai-ml/predictive-analytics",
  "/services/ai-ml/ai-integration",
  "/services/ai-ml/computer-vision",
  "/services/ai-ml/conversational-ai",
  "/services/ai-ml/mlops-model-monitoring",
]

const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`)

export function GET() {
  const now = new Date().toISOString()
  const allRoutes = [...staticRoutes, ...blogRoutes]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const priority = route === "" ? "1.0" : route.startsWith("/blog/") ? "0.7" : "0.8"
    return `<url><loc>${baseUrl}${route}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
  })
  .join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  })
}
