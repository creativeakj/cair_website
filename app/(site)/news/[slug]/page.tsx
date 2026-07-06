import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, Section } from "@/components/PageHeader";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { ShareButtons } from "@/components/sections/ShareButtons";
import { RelatedItems } from "@/components/sections/RelatedItems";
import {
  getPublishedNewsArticleBySlug,
  getPublishedNewsArticles,
  getRelatedNewsArticles,
} from "@/lib/services/news";
import { getTeamMemberById } from "@/lib/services/team";

export async function generateStaticParams() {
  const articles = await getPublishedNewsArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedNewsArticleBySlug(slug);
  if (!article) notFound();

  const [related, author] = await Promise.all([
    getRelatedNewsArticles(slug, article.category),
    article.author_id ? getTeamMemberById(article.author_id) : Promise.resolve(null),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${siteUrl}/news/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: author ? { "@type": "Person", name: author.name } : undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    image: article.featured_image_url,
    publisher: { "@type": "Organization", name: "Center for African International Relations" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        lede={article.excerpt}
      />
      <Section className="max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-8">
          <div className="text-sm text-foreground/70">
            {author && <span className="font-medium text-[var(--forest-deep)]">{author.name}</span>}
            {author && <span className="mx-2">·</span>}
            {article.published_at &&
              new Date(article.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
          </div>
          <ShareButtons url={url} title={article.title} />
        </div>

        <ArticleBody html={article.body_html} />

        <div className="mt-16">
          <RelatedItems
            heading="Related Articles"
            basePath="/news"
            items={related.map((a) => ({ slug: a.slug, title: a.title, meta: a.category }))}
          />
        </div>
      </Section>
    </>
  );
}
