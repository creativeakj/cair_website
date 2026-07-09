import { Suspense } from "react";
import { EventRegistrationsAdminClient } from "@/components/admin/EventRegistrationsAdminClient";
import { getEventRegistrationsAdmin } from "@/lib/services/event-registrations";

async function EventRegistrationsData() {
  const registrations = await getEventRegistrationsAdmin();
  return <EventRegistrationsAdminClient registrations={registrations} />;
}

export default function AdminEventRegistrationsPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <EventRegistrationsData />
    </Suspense>
  );
}
