import type { NewsArticleDTO } from "@/lib/services/news";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildNewsRssFeed(articles: NewsArticleDTO[], siteUrl: string): string {
  const items = articles
    .map((a) => {
      const link = `${siteUrl}/news/${a.slug}`;
      const pubDate = a.published_at ? new Date(a.published_at).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(a.category)}</category>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CAIR News &amp; Insights</title>
    <link>${siteUrl}/news</link>
    <description>Announcements, press releases, and editorial content from the Center for African International Relations.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;
}
