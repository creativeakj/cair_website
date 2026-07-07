"use server";

import { auth } from "@/lib/auth";
import {
  adminProfileSchema,
  adminPasswordSchema,
  type AdminProfileFormValues,
  type AdminPasswordFormValues,
} from "@/lib/validation/admin-user";
import { updateAdminProfile, changeAdminPassword } from "@/lib/services/admin-users";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session;
}

export async function updateProfileAction(input: AdminProfileFormValues) {
  const session = await requireAdmin();
  const data = adminProfileSchema.parse(input);
  await updateAdminProfile(session.user.id, data);
}

export async function changePasswordAction(input: AdminPasswordFormValues) {
  const session = await requireAdmin();
  const data = adminPasswordSchema.parse(input);
  await changeAdminPassword(session.user.id, data);
}
