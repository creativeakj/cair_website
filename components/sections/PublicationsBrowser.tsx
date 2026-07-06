"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PublicationCard } from "@/components/sections/PublicationCard";
import type { PublicationDTO } from "@/lib/services/publications";

const ALL = "all";

export function PublicationsBrowser({ publications }: { publications: PublicationDTO[] }) {
  const [category, setCategory] = useState(ALL);
  const [year, setYear] = useState(ALL);

  const categories = useMemo(
    () => Array.from(new Set(publications.map((p) => p.category))).sort(),
    [publications],
  );
  const years = useMemo(
    () =>
      Array.from(new Set(publications.map((p) => new Date(p.published_date).getFullYear())))
        .sort((a, b) => b - a),
    [publications],
  );

  const filtered = publications.filter((p) => {
    if (category !== ALL && p.category !== category) return false;
    if (year !== ALL && new Date(p.published_date).getFullYear() !== Number(year)) return false;
    return true;
  });

  const featured = publications.find((p) => p.is_featured);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {featured && category === ALL && year === ALL && (
        <Link
          href={`/publications/${featured.slug}`}
          className="mb-10 flex flex-col gap-3 rounded-sm border border-[var(--gold)]/60 bg-[var(--secondary)] p-8 transition-colors hover:border-[var(--gold)] md:flex-row md:items-center md:justify-between"
        >
          <div>
            <span className="eyebrow">Featured Publication</span>
            <h3 className="mt-2 font-display text-2xl text-[var(--forest-deep)] md:text-3xl">{featured.title}</h3>
            <p className="mt-2 max-w-2xl text-sm text-foreground/70">{featured.summary}</p>
          </div>
          <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">Read →</span>
        </Link>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {publications.length === 0
            ? "No publications yet. Check back soon."
            : "No publications match those filters."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PublicationCard key={p.id} publication={p} />
          ))}
        </div>
      )}
    </div>
  );
}
