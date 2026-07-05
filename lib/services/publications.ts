import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { publicationsCollection } from "@/lib/db/collections";
import type { Publication } from "@/types/publication";

export type PublicationDTO = Omit<Publication, "_id" | "published_date" | "created_at"> & {
  id: string;
  published_date: string;
  created_at: string;
};

function toDTO(doc: Publication): PublicationDTO {
  const { _id, published_date, created_at, ...rest } = doc;
  return {
    id: _id!.toString(),
    published_date: published_date.toISOString(),
    created_at: created_at.toISOString(),
    ...rest,
  };
}

export async function getPublications(filters?: {
  category?: string;
  year?: number;
}): Promise<PublicationDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("publications");

  const query: Record<string, unknown> = {};
  if (filters?.category) query.category = filters.category;
  if (filters?.year) query.year = filters.year;

  const collection = await publicationsCollection();
  const docs = await collection.find(query).sort({ published_date: -1 }).toArray();
  return docs.map(toDTO);
}

export async function getPublicationBySlug(slug: string): Promise<PublicationDTO | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("publications");
  cacheTag(`publication:${slug}`);

  const collection = await publicationsCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toDTO(doc) : null;
}

export async function getRelatedPublications(slug: string, category: string, limit = 3): Promise<PublicationDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("publications");

  const collection = await publicationsCollection();
  const query: Record<string, unknown> = { category, slug: { $ne: slug } };
  const docs = await collection
    .find(query)
    .sort({ published_date: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toDTO);
}

export async function incrementDownloadCount(slug: string): Promise<boolean> {
  const collection = await publicationsCollection();
  const result = await collection.updateOne({ slug }, { $inc: { download_count: 1 } });
  if (result.matchedCount > 0) {
    revalidateTag(`publication:${slug}`, "max");
    return true;
  }
  return false;
}
