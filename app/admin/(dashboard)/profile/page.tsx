import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { ProfileAdminClient } from "@/components/admin/ProfileAdminClient";
import { getAdminUserById } from "@/lib/services/admin-users";

async function ProfileData() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const admin = await getAdminUserById(session.user.id);
  if (!admin) return null;

  return <ProfileAdminClient admin={admin} />;
}

export default function AdminProfilePage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <ProfileData />
    </Suspense>
  );
}
