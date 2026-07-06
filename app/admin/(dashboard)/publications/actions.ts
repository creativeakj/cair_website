"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { publicationSchema, type PublicationFormValues } from "@/lib/validation/publication";
import {
  createPublication,
  updatePublication,
  deletePublication,
} from "@/lib/services/publications";
import { sanitizeRichText } from "@/lib/sanitize-html";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createPublicationAction(input: PublicationFormValues) {
  await requireAdmin();
  const data = publicationSchema.parse(input);
  await createPublication({
    ...data,
    abstract: sanitizeRichText(data.abstract),
    cover_image_url: data.cover_image_url || undefined,
  });
  revalidatePath("/admin/publications");
}

export async function updatePublicationAction(id: string, input: PublicationFormValues) {
  await requireAdmin();
  const data = publicationSchema.parse(input);
  await updatePublication(id, {
    ...data,
    abstract: sanitizeRichText(data.abstract),
    cover_image_url: data.cover_image_url || undefined,
  });
  revalidatePath("/admin/publications");
}

export async function deletePublicationAction(id: string) {
  await requireAdmin();
  await deletePublication(id);
  revalidatePath("/admin/publications");
}
