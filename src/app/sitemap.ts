import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { projects } from "@/lib/work";
import { site } from "@/lib/site";

/**
 * Static sitemap covering every indexable route.
 * Priorities reflect how much each page matters commercially.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // A deterministic date keeps the sitemap fully static (no request-time work).
  const lastModified = new Date(site.facts.contentUpdated);

  const core: MetadataRoute.Sitemap = [
    { url: "/", priority: 1, changeFrequency: "weekly" },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" },
    { url: "/solutions", priority: 0.9, changeFrequency: "monthly" },
    { url: "/work", priority: 0.8, changeFrequency: "monthly" },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ].map((entry) => ({
    url: `${site.url}${entry.url}`,
    lastModified,
    changeFrequency: entry.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: entry.priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...core, ...serviceRoutes, ...workRoutes];
}
