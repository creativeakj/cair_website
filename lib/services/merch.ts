import { cacheLife, cacheTag } from "next/cache";
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
