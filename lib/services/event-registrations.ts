import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { eventRegistrationsCollection } from "@/lib/db/collections";
import type { EventRegistration } from "@/types/event-registration";

export type EventRegistrationDTO = Omit<EventRegistration, "_id" | "created_at"> & {
  id: string;
  created_at: string;
};

function toDTO(doc: EventRegistration): EventRegistrationDTO {
  const { _id, created_at, ...rest } = doc;
  return { id: _id!.toString(), created_at: created_at.toISOString(), ...rest };
}

export async function recordEventRegistration(input: {
  event_id: string;
  event_slug: string;
  event_title: string;
  name: string;
  email: string;
  organization?: string;
  message?: string;
}): Promise<void> {
  const collection = await eventRegistrationsCollection();
  await collection.insertOne({ ...input, created_at: new Date() });
}

export async function getEventRegistrationsAdmin(): Promise<EventRegistrationDTO[]> {
  await connection();
  const collection = await eventRegistrationsCollection();
  const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function deleteEventRegistration(id: string): Promise<boolean> {
  const collection = await eventRegistrationsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
