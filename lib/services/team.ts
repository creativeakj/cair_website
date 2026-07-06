import { cacheLife, cacheTag, updateTag } from "next/cache";
import { connection } from "next/server";
import { ObjectId } from "mongodb";
import { teamMembersCollection } from "@/lib/db/collections";
import type { TeamMember } from "@/types/team-member";

export type TeamMemberDTO = Omit<TeamMember, "_id"> & { id: string };

export async function getActiveTeamMembers(): Promise<TeamMemberDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("team");

  const collection = await teamMembersCollection();
  const docs = await collection
    .find({ is_active: true })
    .sort({ display_order: 1 })
    .toArray();

  return docs.map(({ _id, ...rest }) => ({ id: _id!.toString(), ...rest }));
}

export async function getTeamMemberById(id: string): Promise<TeamMemberDTO | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("team");

  if (!ObjectId.isValid(id)) return null;

  const collection = await teamMembersCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  const { _id, ...rest } = doc;
  return { id: _id!.toString(), ...rest };
}

export async function getAllTeamMembersAdmin(): Promise<TeamMemberDTO[]> {
  await connection();
  const collection = await teamMembersCollection();
  const docs = await collection.find({}).sort({ display_order: 1 }).toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id!.toString(), ...rest }));
}

export type TeamMemberInput = {
  slug: string;
  name: string;
  title: string;
  department: string;
  bio: string;
  photo_url?: string;
  display_order: number;
  is_active: boolean;
};

export async function createTeamMember(input: TeamMemberInput): Promise<string> {
  const collection = await teamMembersCollection();
  const result = await collection.insertOne({ ...input });
  updateTag("team");
  return result.insertedId.toString();
}

export async function updateTeamMember(id: string, input: TeamMemberInput): Promise<boolean> {
  const collection = await teamMembersCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: input });
  updateTag("team");
  return result.matchedCount > 0;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const collection = await teamMembersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  updateTag("team");
  return result.deletedCount > 0;
}
