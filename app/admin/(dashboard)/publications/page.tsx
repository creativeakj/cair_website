import { PublicationsAdminClient } from "@/components/admin/PublicationsAdminClient";
import { getPublications } from "@/lib/services/publications";

export default async function AdminPublicationsPage() {
  const publications = await getPublications();
  return <PublicationsAdminClient publications={publications} />;
}
