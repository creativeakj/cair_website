import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { NewsArticleDTO } from "@/lib/services/news";

export function NewsCard({ article }: { article: NewsArticleDTO }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-[var(--accent)]"
    >
      {article.featured_image_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.featured_image_url}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[var(--secondary)] p-5">
        <Badge variant="outline" className="border-[var(--gold)] text-[var(--forest-deep)]">
          {article.category}
        </Badge>
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {article.published_at &&
            new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl leading-snug text-[var(--forest-deep)] group-hover:text-[var(--accent)]">
          {article.title}
        </h3>
        <p className="text-sm text-foreground/70">{article.excerpt}</p>
        <div className="mt-auto pt-3 text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Read →</div>
      </div>
    </Link>
  );
}
