import { Suspense } from "react";
import { SubscribersAdminClient } from "@/components/admin/SubscribersAdminClient";
import { getSubscribersAdmin } from "@/lib/services/subscribers";

async function SubscribersData() {
  const subscribers = await getSubscribersAdmin();
  return <SubscribersAdminClient subscribers={subscribers} />;
}

export default function AdminSubscribersPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <SubscribersData />
    </Suspense>
  );
}
