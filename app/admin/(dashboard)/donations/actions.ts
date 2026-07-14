"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { markDonationEnquiryRead, deleteDonationEnquiry } from "@/lib/services/donation-enquiries";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function markDonationEnquiryReadAction(id: string, isRead: boolean) {
  await requireAdmin();
  await markDonationEnquiryRead(id, isRead);
  revalidatePath("/admin/donations");
}

export async function deleteDonationEnquiryAction(id: string) {
  await requireAdmin();
  await deleteDonationEnquiry(id);
  revalidatePath("/admin/donations");
}
