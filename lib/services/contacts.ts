import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { contactsCollection } from "@/lib/db/collections";
import type { Contact } from "@/types/contact";

export type ContactDTO = Omit<Contact, "_id" | "created_at"> & { id: string; created_at: string };

function toDTO(doc: Contact): ContactDTO {
  const { _id, created_at, ...rest } = doc;
  return { id: _id!.toString(), created_at: created_at.toISOString(), ...rest };
}

export async function getContactsAdmin(): Promise<ContactDTO[]> {
  await connection();
  const collection = await contactsCollection();
  const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
  return docs.map(toDTO);
}

export async function markContactRead(id: string, isRead: boolean): Promise<boolean> {
  const collection = await contactsCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { is_read: isRead } });
  return result.matchedCount > 0;
}

export async function deleteContact(id: string): Promise<boolean> {
  const collection = await contactsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
