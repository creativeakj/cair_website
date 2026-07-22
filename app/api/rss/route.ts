import { getPublishedNewsArticles } from "@/lib/services/news";
import { buildNewsRssFeed } from "@/lib/rss";
import { getSiteUrl } from "@/lib/utils";

export async function GET() {
  const articles = (await getPublishedNewsArticles()).slice(0, 20);
  const siteUrl = getSiteUrl();
  const xml = buildNewsRssFeed(articles, siteUrl);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
