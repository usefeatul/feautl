import type { MetadataRoute } from "next"
import { SITE_URL } from "@/config/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}