import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cloudinaryFill } from "@/lib/utils";
import type { PublicationDTO } from "@/lib/services/publications";

export function PublicationCard({ publication }: { publication: PublicationDTO }) {
  const year = new Date(publication.published_date).getFullYear();

  return (
    <Link
      href={`/publications/${publication.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-[var(--accent)]"
    >
      {publication.cover_image_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={cloudinaryFill(publication.cover_image_url, 800, 450)}
            alt={publication.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[var(--secondary)] p-5">
        <Badge variant="outline" className="border-[var(--gold)] text-[var(--forest-deep)]">
          {publication.category}
        </Badge>
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{year}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl leading-snug text-[var(--forest-deep)] group-hover:text-[var(--accent)]">
          {publication.title}
        </h3>
        <p className="text-sm text-foreground/70">{publication.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted-foreground">
          <span>{publication.authors.join(", ")}</span>
          <span className="uppercase tracking-[0.16em] text-[var(--gold-ink)]">Read →</span>
        </div>
      </div>
    </Link>
  );
}
