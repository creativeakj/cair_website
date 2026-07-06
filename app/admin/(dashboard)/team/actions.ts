"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { teamMemberSchema, type TeamMemberFormValues } from "@/lib/validation/team-member";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/services/team";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createTeamMemberAction(input: TeamMemberFormValues) {
  await requireAdmin();
  const data = teamMemberSchema.parse(input);
  await createTeamMember({ ...data, photo_url: data.photo_url || undefined });
  revalidatePath("/admin/team");
}

export async function updateTeamMemberAction(id: string, input: TeamMemberFormValues) {
  await requireAdmin();
  const data = teamMemberSchema.parse(input);
  await updateTeamMember(id, { ...data, photo_url: data.photo_url || undefined });
  revalidatePath("/admin/team");
}

export async function deleteTeamMemberAction(id: string) {
  await requireAdmin();
  await deleteTeamMember(id);
  revalidatePath("/admin/team");
}
