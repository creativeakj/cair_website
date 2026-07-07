"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { newAdminSchema, type NewAdminFormValues } from "@/lib/validation/admin-user";
import { createAdminUser, deleteAdminUser } from "@/lib/services/admin-users";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session;
}

export async function createAdminAction(input: NewAdminFormValues) {
  await requireAdmin();
  const data = newAdminSchema.parse(input);
  await createAdminUser(data);
  revalidatePath("/admin/admins");
}

export async function deleteAdminAction(id: string) {
  const session = await requireAdmin();
  if (session.user.id === id) throw new Error("You cannot delete your own account");
  await deleteAdminUser(id);
  revalidatePath("/admin/admins");
}
