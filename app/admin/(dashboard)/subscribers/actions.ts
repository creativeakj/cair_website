"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { deleteSubscriber } from "@/lib/services/subscribers";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function deleteSubscriberAction(id: string) {
  await requireAdmin();
  await deleteSubscriber(id);
  revalidatePath("/admin/subscribers");
}
