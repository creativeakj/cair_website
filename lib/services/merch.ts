import { cacheLife, cacheTag, updateTag } from "next/cache";
import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { merchItemsCollection } from "@/lib/db/collections";
import type { MerchItem } from "@/types/merch-item";

export type MerchItemDTO = Omit<MerchItem, "_id"> & { id: string };

export async function getAvailableMerchItems(): Promise<MerchItemDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("merch");

  const collection = await merchItemsCollection();
  const docs = await collection
    .find({ is_available: true })
    .sort({ display_order: 1 })
    .toArray();

  return docs.map(({ _id, ...rest }) => ({ id: _id!.toString(), ...rest }));
}

export async function getAllMerchItemsAdmin(): Promise<MerchItemDTO[]> {
  await connection();
  const collection = await merchItemsCollection();
  const docs = await collection.find({}).sort({ display_order: 1 }).toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id!.toString(), ...rest }));
}

export async function getMerchItemById(id: string): Promise<MerchItemDTO | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await merchItemsCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id!.toString(), ...rest };
}

export type MerchItemInput = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image_url: string[];
  is_available: boolean;
  display_order: number;
};

export async function createMerchItem(input: MerchItemInput): Promise<string> {
  const collection = await merchItemsCollection();
  const result = await collection.insertOne({ ...input });
  updateTag("merch");
  return result.insertedId.toString();
}

export async function updateMerchItem(id: string, input: MerchItemInput): Promise<boolean> {
  const collection = await merchItemsCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: input });
  updateTag("merch");
  return result.matchedCount > 0;
}

export async function deleteMerchItem(id: string): Promise<boolean> {
  const collection = await merchItemsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  updateTag("merch");
  return result.deletedCount > 0;
}
