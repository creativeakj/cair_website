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
