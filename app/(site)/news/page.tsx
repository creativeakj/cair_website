import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";
import { FeaturedArticle } from "@/components/sections/FeaturedArticle";
import { NewsBrowser } from "@/components/sections/NewsBrowser";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { getFeaturedNewsArticle, getPublishedNewsArticles } from "@/lib/services/news";

export const metadata: Metadata = {
  alternates: { canonical: "/news" },
  title: "News & Insights",
  description: "Announcements, press releases, and editorial content from the Center for African International Relations.",
  openGraph: {
    title: "News & Insights — CAIR",
    description: "Announcements, press releases, and editorial content from CAIR.",
  },
};

export default async function NewsPage() {
  const [featured, articles] = await Promise.all([
    getFeaturedNewsArticle(),
    getPublishedNewsArticles(),
  ]);

  const rest = featured ? articles.filter((a) => a.slug !== featured.slug) : articles;

  return (
    <>
      <PageHeader
        eyebrow="News & Insights"
        title={<>Dispatches from <span className="text-[var(--gold-ink)]">the Center.</span></>}
        lede="Announcements, press releases, and editorial content from CAIR's programs and partners."
      />
      <Section>
        {featured && (
          <div className="mb-14">
            <FeaturedArticle article={featured} />
          </div>
        )}
        <NewsBrowser articles={rest} />
      </Section>
      <section className="bg-[var(--forest-deep)] text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <span className="eyebrow text-[var(--gold)]">Stay informed</span>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">
            Get new publications, news, and events in your inbox.
          </h2>
          <div className="mx-auto mt-6 max-w-sm">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
