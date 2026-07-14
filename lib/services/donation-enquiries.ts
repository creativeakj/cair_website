import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { donationEnquiriesCollection } from "@/lib/db/collections";
import type { DonationEnquiry } from "@/types/donation-enquiry";

export type DonationEnquiryDTO = Omit<DonationEnquiry, "_id" | "created_at"> & {
  id: string;
  created_at: string;
};

function toDTO(doc: DonationEnquiry): DonationEnquiryDTO {
  const { _id, created_at, ...rest } = doc;
  return { id: _id!.toString(), created_at: created_at.toISOString(), ...rest };
}

export async function recordDonationEnquiry(input: {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  amount?: string;
  message?: string;
}): Promise<void> {
  const collection = await donationEnquiriesCollection();
  await collection.insertOne({ ...input, created_at: new Date(), is_read: false });
}

export async function getDonationEnquiriesAdmin(): Promise<DonationEnquiryDTO[]> {
  await connection();
  const collection = await donationEnquiriesCollection();
  const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function markDonationEnquiryRead(id: string, isRead: boolean): Promise<boolean> {
  const collection = await donationEnquiriesCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { is_read: isRead } });
  return result.matchedCount > 0;
}

export async function deleteDonationEnquiry(id: string): Promise<boolean> {
  const collection = await donationEnquiriesCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
