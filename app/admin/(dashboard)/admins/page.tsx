import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { AdminsAdminClient } from "@/components/admin/AdminsAdminClient";
import { getAdminUsers } from "@/lib/services/admin-users";

async function AdminsData() {
  const [session, admins] = await Promise.all([auth(), getAdminUsers()]);
  return <AdminsAdminClient admins={admins} currentAdminId={session?.user?.id ?? ""} />;
}

export default function AdminAdminsPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <AdminsData />
    </Suspense>
  );
}
