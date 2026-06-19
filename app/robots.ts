import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devpath-hub.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep authenticated/app surfaces and API routes out of the index.
      disallow: ["/dashboard", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
