import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { merchEnquiriesCollection } from "@/lib/db/collections";
import type { MerchEnquiry } from "@/types/merch-enquiry";

export type MerchEnquiryDTO = Omit<MerchEnquiry, "_id" | "created_at"> & {
  id: string;
  created_at: string;
};

function toDTO(doc: MerchEnquiry): MerchEnquiryDTO {
  const { _id, created_at, ...rest } = doc;
  return { id: _id!.toString(), created_at: created_at.toISOString(), ...rest };
}

export async function recordMerchEnquiry(input: {
  product_slug: string;
  product_name: string;
  name: string;
  email: string;
  message?: string;
}): Promise<void> {
  const collection = await merchEnquiriesCollection();
  await collection.insertOne({ ...input, created_at: new Date(), is_read: false });
}

export async function getMerchEnquiriesAdmin(): Promise<MerchEnquiryDTO[]> {
  await connection();
  const collection = await merchEnquiriesCollection();
  const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function markMerchEnquiryRead(id: string, isRead: boolean): Promise<boolean> {
  const collection = await merchEnquiriesCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { is_read: isRead } });
  return result.matchedCount > 0;
}

export async function deleteMerchEnquiry(id: string): Promise<boolean> {
  const collection = await merchEnquiriesCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
