import Link from "next/link";

export type RelatedItem = {
  slug: string;
  title: string;
  meta: string;
};

export function RelatedItems({
  heading,
  basePath,
  items,
}: {
  heading: string;
  basePath: string;
  items: RelatedItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="border-t border-border pt-10">
      <h2 className="mb-6 font-display text-2xl text-[var(--forest-deep)]">{heading}</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="group block rounded-sm border border-border bg-card p-5 transition-colors hover:border-[var(--accent)]"
          >
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.meta}</div>
            <div className="mt-2 font-display text-lg leading-snug text-[var(--forest-deep)] group-hover:text-[var(--accent)]">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
