import Link from "next/link";
import type { NewsArticleDTO } from "@/lib/services/news";

export function FeaturedArticle({ article }: { article: NewsArticleDTO }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group grid gap-6 overflow-hidden rounded-sm border border-[var(--gold)]/60 bg-[var(--forest-deep)] p-8 text-[var(--primary-foreground)] transition-colors hover:border-[var(--gold)] md:grid-cols-[1fr_auto] md:items-center md:p-12"
    >
      <div>
        <span className="eyebrow text-[var(--gold)]">Featured · {article.category}</span>
        <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{article.title}</h2>
        <p className="mt-3 max-w-2xl text-white/80">{article.excerpt}</p>
        {article.published_at && (
          <p className="mt-4 text-sm text-white/60">
            {new Date(article.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
      <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-[var(--gold)] transition-transform group-hover:translate-x-1">
        Read the story →
      </span>
    </Link>
  );
}
