import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devpath-hub.vercel.app";

// Public, crawlable pages. Authenticated areas (dashboard) are intentionally
// excluded — see robots.ts.
const ROUTES = [
  "",
  "/about",
  "/tech",
  "/blog",
  "/challenges",
  "/pricing",
  "/contact",
  "/sandbox",
  "/ai-help",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
