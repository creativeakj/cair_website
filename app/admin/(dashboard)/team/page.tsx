import { Suspense } from "react";
import { TeamAdminClient } from "@/components/admin/TeamAdminClient";
import { getAllTeamMembersAdmin } from "@/lib/services/team";

async function TeamData() {
  const members = await getAllTeamMembersAdmin();
  return <TeamAdminClient members={members} />;
}

export default function AdminTeamPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <TeamData />
    </Suspense>
  );
}
