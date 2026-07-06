"use client";

import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchInput } from "@/components/sections/SearchInput";
import { NewsCard } from "@/components/sections/NewsCard";
import type { NewsArticleDTO } from "@/lib/services/news";

const ALL = "all";

export function NewsBrowser({ articles }: { articles: NewsArticleDTO[] }) {
  const [category, setCategory] = useState(ALL);
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles],
  );

  const filtered = articles.filter((a) => {
    if (category !== ALL && a.category !== category) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      if (!a.title.toLowerCase().includes(q) && !a.excerpt.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-4">
        <div className="w-full max-w-xs">
          <SearchInput placeholder="Search news…" onValueChange={setSearch} />
        </div>
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
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {articles.length === 0 ? "No news articles yet. Check back soon." : "No articles match your search."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
