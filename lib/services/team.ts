import { cacheLife, cacheTag } from "next/cache";
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

  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return null;

  const collection = await teamMembersCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  const { _id, ...rest } = doc;
  return { id: _id!.toString(), ...rest };
}
