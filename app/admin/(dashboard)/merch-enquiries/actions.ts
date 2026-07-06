"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { markMerchEnquiryRead, deleteMerchEnquiry } from "@/lib/services/merch-enquiries";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function markMerchEnquiryReadAction(id: string, isRead: boolean) {
  await requireAdmin();
  await markMerchEnquiryRead(id, isRead);
  revalidatePath("/admin/merch-enquiries");
}

export async function deleteMerchEnquiryAction(id: string) {
  await requireAdmin();
  await deleteMerchEnquiry(id);
  revalidatePath("/admin/merch-enquiries");
}
