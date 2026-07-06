import { Suspense } from "react";
import { MerchEnquiriesAdminClient } from "@/components/admin/MerchEnquiriesAdminClient";
import { getMerchEnquiriesAdmin } from "@/lib/services/merch-enquiries";

async function MerchEnquiriesData() {
  const enquiries = await getMerchEnquiriesAdmin();
  return <MerchEnquiriesAdminClient enquiries={enquiries} />;
}

export default function AdminMerchEnquiriesPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <MerchEnquiriesData />
    </Suspense>
  );
}
