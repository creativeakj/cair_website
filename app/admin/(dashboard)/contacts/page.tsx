import { Suspense } from "react";
import { ContactsAdminClient } from "@/components/admin/ContactsAdminClient";
import { getContactsAdmin } from "@/lib/services/contacts";

async function ContactsData() {
  const contacts = await getContactsAdmin();
  return <ContactsAdminClient contacts={contacts} />;
}

export default function AdminContactsPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
      <ContactsData />
    </Suspense>
  );
}
