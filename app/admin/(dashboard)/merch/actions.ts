"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { merchItemSchema, type MerchItemFormValues } from "@/lib/validation/merch-item";
import { createMerchItem, updateMerchItem, deleteMerchItem } from "@/lib/services/merch";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createMerchItemAction(input: MerchItemFormValues) {
  await requireAdmin();
  const data = merchItemSchema.parse(input);
  await createMerchItem(data);
  revalidatePath("/admin/merch");
}

export async function updateMerchItemAction(id: string, input: MerchItemFormValues) {
  await requireAdmin();
  const data = merchItemSchema.parse(input);
  await updateMerchItem(id, data);
  revalidatePath("/admin/merch");
}

export async function deleteMerchItemAction(id: string) {
  await requireAdmin();
  await deleteMerchItem(id);
  revalidatePath("/admin/merch");
}
