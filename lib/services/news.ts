import { cacheLife, cacheTag } from "next/cache";
import { newsArticlesCollection } from "@/lib/db/collections";
import type { NewsArticle } from "@/types/news-article";

export type NewsArticleDTO = Omit<NewsArticle, "_id" | "author_id" | "published_at" | "created_at" | "updated_at"> & {
  id: string;
  author_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
};

function toDTO(doc: NewsArticle): NewsArticleDTO {
  const { _id, author_id, published_at, created_at, updated_at, ...rest } = doc;
  return {
    id: _id!.toString(),
    author_id: author_id?.toString(),
    published_at: published_at?.toISOString(),
    created_at: created_at.toISOString(),
    updated_at: updated_at.toISOString(),
    ...rest,
  };
}

export async function getPublishedNewsArticles(filters?: {
  category?: string;
  tag?: string;
}): Promise<NewsArticleDTO[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");

  const query: Record<string, unknown> = { status: "published" };
  if (filters?.category) query.category = filters.category;
  if (filters?.tag) query.tags = filters.tag;

  const collection = await newsArticlesCollection();
  const docs = await collection.find(query).sort({ published_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function getFeaturedNewsArticle(): Promise<NewsArticleDTO | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");

  const collection = await newsArticlesCollection();
  const doc = await collection.findOne({ status: "published", is_featured: true }, { sort: { published_at: -1 } });
  return doc ? toDTO(doc) : null;
}

export async function getPublishedNewsArticleBySlug(slug: string): Promise<NewsArticleDTO | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");
  cacheTag(`news:${slug}`);

  const collection = await newsArticlesCollection();
  const doc = await collection.findOne({ slug, status: "published" });
  return doc ? toDTO(doc) : null;
}

export async function getRelatedNewsArticles(slug: string, category: string, limit = 3): Promise<NewsArticleDTO[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");

  const collection = await newsArticlesCollection();
  const docs = await collection
    .find({ status: "published", category, slug: { $ne: slug } })
    .sort({ published_at: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toDTO);
}
