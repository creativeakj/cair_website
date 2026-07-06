import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { subscribersCollection } from "@/lib/db/collections";
import type { Subscriber } from "@/types/subscriber";

export type SubscriberDTO = Omit<Subscriber, "_id" | "subscribed_at"> & { id: string; subscribed_at: string };

function toDTO(doc: Subscriber): SubscriberDTO {
  const { _id, subscribed_at, ...rest } = doc;
  return { id: _id!.toString(), subscribed_at: subscribed_at.toISOString(), ...rest };
}

export async function getSubscribersAdmin(): Promise<SubscriberDTO[]> {
  await connection();
  const collection = await subscribersCollection();
  const docs = await collection.find({}).sort({ subscribed_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const collection = await subscribersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
