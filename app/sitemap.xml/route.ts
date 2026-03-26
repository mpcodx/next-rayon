import { blogPosts } from "@/lib/blog-data"
import { projects } from "@/lib/projects-data"
import { SITEMAP_PATHS, SITE_URL } from "@/lib/seo"

const staticRoutes = [...SITEMAP_PATHS]

const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`)
const projectRoutes = projects.map((project) => `/projects/${project.slug}`)

export function GET() {
  const now = new Date().toISOString()
  const allRoutes = [...new Set([...staticRoutes, ...blogRoutes, ...projectRoutes])]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const priority = route === "/" ? "1.0" : route.startsWith("/blog/") ? "0.7" : "0.8"
    return `<url><loc>${SITE_URL}${route}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
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
