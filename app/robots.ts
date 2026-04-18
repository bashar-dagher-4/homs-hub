import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/ar/", "/en/"],
      disallow: ["/ar/dashboard/", "/en/dashboard/"],
    },
    sitemap: "https://homs-hub.vercel.app/sitemap.xml",
  }
}