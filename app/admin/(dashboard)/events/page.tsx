import { EventsAdminClient } from "@/components/admin/EventsAdminClient";
import { getEvents } from "@/lib/services/events";

export default async function AdminEventsPage() {
  const events = await getEvents();
  return <EventsAdminClient events={events} />;
}
