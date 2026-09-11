import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Temporary hiring campaign — deliberately kept out of search results.
        // This is an indexing hint only; the admin dashboard is protected by
        // authentication, never by robots.txt.
        disallow: ["/interview-drive", "/interview-drive-admin"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/interview-drive", "/interview-drive-admin"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/interview-drive", "/interview-drive-admin"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/interview-drive", "/interview-drive-admin"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/interview-drive", "/interview-drive-admin"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/interview-drive", "/interview-drive-admin"],
      }
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

