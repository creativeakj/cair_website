import type { MetadataRoute } from "next";
import { getPublications } from "@/lib/services/publications";
import { getPublishedNewsArticles } from "@/lib/services/news";
import { getEvents } from "@/lib/services/events";

const STATIC_ROUTES = [
  "",
  "/about",
  "/team",
  "/programs",
  "/publications",
  "/news",
  "/events",
  "/membership",
  "/merch",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const [publications, news, events] = await Promise.all([
    getPublications(),
    getPublishedNewsArticles(),
    getEvents(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const publicationEntries: MetadataRoute.Sitemap = publications.map((p) => ({
    url: `${siteUrl}/publications/${p.slug}`,
    lastModified: p.published_date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((a) => ({
    url: `${siteUrl}/news/${a.slug}`,
    lastModified: a.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${siteUrl}/events/${e.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...publicationEntries, ...newsEntries, ...eventEntries];
}
