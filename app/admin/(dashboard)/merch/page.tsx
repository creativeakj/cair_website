import { Suspense } from "react";
import { MerchAdminClient } from "@/components/admin/MerchAdminClient";
import { getAllMerchItemsAdmin } from "@/lib/services/merch";

async function MerchData() {
  const items = await getAllMerchItemsAdmin();
  return <MerchAdminClient items={items} />;
}

export default function AdminMerchPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <MerchData />
    </Suspense>
  );
}
