import { Suspense } from "react";
import { DonationsAdminClient } from "@/components/admin/DonationsAdminClient";
import { getDonationEnquiriesAdmin } from "@/lib/services/donation-enquiries";

async function DonationsData() {
  const enquiries = await getDonationEnquiriesAdmin();
  return <DonationsAdminClient enquiries={enquiries} />;
}

export default function AdminDonationsPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <DonationsData />
    </Suspense>
  );
}
