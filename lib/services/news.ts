import { cacheLife, cacheTag, updateTag } from "next/cache";
import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { newsArticlesCollection } from "@/lib/db/collections";
import type { NewsArticle, NewsArticleStatus } from "@/types/news-article";

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

export async function getAllNewsArticlesAdmin(): Promise<NewsArticleDTO[]> {
  await connection();
  const collection = await newsArticlesCollection();
  const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function getNewsArticleById(id: string): Promise<NewsArticleDTO | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await newsArticlesCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toDTO(doc) : null;
}

export type NewsArticleInput = {
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  featured_image_url?: string;
  author_id?: string;
  category: string;
  tags: string[];
  status: NewsArticleStatus;
  is_featured: boolean;
};

export async function createNewsArticle(input: NewsArticleInput): Promise<string> {
  const collection = await newsArticlesCollection();
  const now = new Date();
  const result = await collection.insertOne({
    ...input,
    author_id: input.author_id ? new ObjectId(input.author_id) : undefined,
    published_at: input.status === "published" ? now : undefined,
    created_at: now,
    updated_at: now,
  });
  updateTag("news");
  return result.insertedId.toString();
}

export async function updateNewsArticle(id: string, input: NewsArticleInput): Promise<boolean> {
  const collection = await newsArticlesCollection();
  const existing = await collection.findOne({ _id: new ObjectId(id) });
  const wasPublished = existing?.status === "published";
  const willBePublished = input.status === "published";

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...input,
        author_id: input.author_id ? new ObjectId(input.author_id) : undefined,
        updated_at: new Date(),
        ...(!wasPublished && willBePublished ? { published_at: new Date() } : {}),
      },
    },
  );
  updateTag("news");
  return result.matchedCount > 0;
}

export async function deleteNewsArticle(id: string): Promise<boolean> {
  const collection = await newsArticlesCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  updateTag("news");
  return result.deletedCount > 0;
}
