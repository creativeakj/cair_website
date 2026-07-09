"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { deleteEventRegistration } from "@/lib/services/event-registrations";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function deleteEventRegistrationAction(id: string) {
  await requireAdmin();
  await deleteEventRegistration(id);
  revalidatePath("/admin/event-registrations");
}
