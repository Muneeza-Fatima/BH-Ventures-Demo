import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/lib/seo";

/* All public pages. URLs end in "/" to match trailingSlash: true. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["/", 1, "weekly"],
    ["/about/", 0.8, "monthly"],
    ["/ventures/", 0.9, "monthly"],
    ["/services/", 0.8, "monthly"],
    ["/portfolio/", 0.8, "monthly"],
    ["/insights/", 0.7, "weekly"],
    ["/careers/", 0.6, "monthly"],
    ["/contact/", 0.7, "yearly"],
    ["/privacy/", 0.3, "yearly"],
    ["/terms/", 0.3, "yearly"],
    ["/disclaimer/", 0.3, "yearly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/ventures/${s.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/portfolio/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
