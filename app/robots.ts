import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://rayonweb.com",
    sitemap: "https://rayonweb.com/sitemap.xml",
  }
}
