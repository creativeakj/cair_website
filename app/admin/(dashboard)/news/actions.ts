"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { newsArticleSchema, type NewsArticleFormValues } from "@/lib/validation/news-article";
import { createNewsArticle, updateNewsArticle, deleteNewsArticle } from "@/lib/services/news";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createNewsArticleAction(input: NewsArticleFormValues) {
  await requireAdmin();
  const data = newsArticleSchema.parse(input);
  await createNewsArticle({
    ...data,
    featured_image_url: data.featured_image_url || undefined,
    author_id: data.author_id || undefined,
  });
  revalidatePath("/admin/news");
}

export async function updateNewsArticleAction(id: string, input: NewsArticleFormValues) {
  await requireAdmin();
  const data = newsArticleSchema.parse(input);
  await updateNewsArticle(id, {
    ...data,
    featured_image_url: data.featured_image_url || undefined,
    author_id: data.author_id || undefined,
  });
  revalidatePath("/admin/news");
}

export async function deleteNewsArticleAction(id: string) {
  await requireAdmin();
  await deleteNewsArticle(id);
  revalidatePath("/admin/news");
}
