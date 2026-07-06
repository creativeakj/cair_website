"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { markContactRead, deleteContact } from "@/lib/services/contacts";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function markContactReadAction(id: string, isRead: boolean) {
  await requireAdmin();
  await markContactRead(id, isRead);
  revalidatePath("/admin/contacts");
}

export async function deleteContactAction(id: string) {
  await requireAdmin();
  await deleteContact(id);
  revalidatePath("/admin/contacts");
}
