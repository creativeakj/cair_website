import { connection } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { adminUsersCollection } from "@/lib/db/collections";

export type AdminUserDTO = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

function toDTO(doc: { _id?: ObjectId; name: string; email: string; created_at: Date }): AdminUserDTO {
  return {
    id: doc._id!.toString(),
    name: doc.name,
    email: doc.email,
    created_at: doc.created_at.toISOString(),
  };
}

export async function getAdminUsers(): Promise<AdminUserDTO[]> {
  await connection();
  const collection = await adminUsersCollection();
  const docs = await collection.find({}).sort({ created_at: 1 }).toArray();
  return docs.map(toDTO);
}

export async function getAdminUserById(id: string): Promise<AdminUserDTO | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await adminUsersCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toDTO(doc) : null;
}

export async function createAdminUser(input: { name: string; email: string; password: string }): Promise<string> {
  const collection = await adminUsersCollection();
  const email = input.email.toLowerCase().trim();

  const existing = await collection.findOne({ email });
  if (existing) throw new Error("An admin with that email already exists");

  const password_hash = await bcrypt.hash(input.password, 10);
  const result = await collection.insertOne({
    name: input.name.trim(),
    email,
    password_hash,
    created_at: new Date(),
  });
  return result.insertedId.toString();
}

export async function deleteAdminUser(id: string): Promise<void> {
  const collection = await adminUsersCollection();

  const count = await collection.countDocuments();
  if (count <= 1) throw new Error("At least one admin account must remain");

  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function updateAdminProfile(
  id: string,
  input: { name: string; email: string },
): Promise<void> {
  const collection = await adminUsersCollection();
  const email = input.email.toLowerCase().trim();

  const existing = await collection.findOne({ email, _id: { $ne: new ObjectId(id) } });
  if (existing) throw new Error("Another admin already uses that email");

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { name: input.name.trim(), email } });
}

export async function changeAdminPassword(
  id: string,
  input: { currentPassword: string; newPassword: string },
): Promise<void> {
  const collection = await adminUsersCollection();
  const user = await collection.findOne({ _id: new ObjectId(id) });
  if (!user) throw new Error("Admin not found");

  const valid = await bcrypt.compare(input.currentPassword, user.password_hash);
  if (!valid) throw new Error("Current password is incorrect");

  const password_hash = await bcrypt.hash(input.newPassword, 10);
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { password_hash } });
}
