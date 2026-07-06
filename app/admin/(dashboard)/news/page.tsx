import { Suspense } from "react";
import { NewsAdminClient } from "@/components/admin/NewsAdminClient";
import { getAllNewsArticlesAdmin } from "@/lib/services/news";
import { getActiveTeamMembers } from "@/lib/services/team";

async function NewsData() {
  const [articles, teamMembers] = await Promise.all([
    getAllNewsArticlesAdmin(),
    getActiveTeamMembers(),
  ]);

  return <NewsAdminClient articles={articles} teamMembers={teamMembers} />;
}

export default function AdminNewsPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <NewsData />
    </Suspense>
  );
}
