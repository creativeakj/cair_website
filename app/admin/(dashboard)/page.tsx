import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublications } from "@/lib/services/publications";
import { getAllNewsArticlesAdmin } from "@/lib/services/news";
import { getEvents } from "@/lib/services/events";
import { getAllTeamMembersAdmin } from "@/lib/services/team";
import { getAllMerchItemsAdmin } from "@/lib/services/merch";
import { getContactsAdmin } from "@/lib/services/contacts";
import { getSubscribersAdmin } from "@/lib/services/subscribers";
import { getMerchEnquiriesAdmin } from "@/lib/services/merch-enquiries";
import { getEventRegistrationsAdmin } from "@/lib/services/event-registrations";

async function DashboardData() {
  const [publications, news, events, team, merch, contacts, subscribers, merchEnquiries, eventRegistrations] =
    await Promise.all([
      getPublications(),
      getAllNewsArticlesAdmin(),
      getEvents(),
      getAllTeamMembersAdmin(),
      getAllMerchItemsAdmin(),
      getContactsAdmin(),
      getSubscribersAdmin(),
      getMerchEnquiriesAdmin(),
      getEventRegistrationsAdmin(),
    ]);

  const unreadContacts = contacts.filter((c) => !c.is_read).length;
  const unreadEnquiries = merchEnquiries.filter((e) => !e.is_read).length;

  const cards = [
    { href: "/admin/publications", label: "Publications", count: publications.length },
    { href: "/admin/news", label: "News Articles", count: news.length },
    { href: "/admin/events", label: "Events", count: events.length },
    { href: "/admin/event-registrations", label: "Event Registrations", count: eventRegistrations.length },
    { href: "/admin/team", label: "Team Members", count: team.length },
    { href: "/admin/merch", label: "Merch Items", count: merch.length },
    { href: "/admin/merch-enquiries", label: "Merch Enquiries", count: merchEnquiries.length, badge: unreadEnquiries },
    { href: "/admin/contacts", label: "Contact Messages", count: contacts.length, badge: unreadContacts },
    { href: "/admin/subscribers", label: "Subscribers", count: subscribers.length },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <Link key={c.href} href={c.href}>
          <Card className="transition-colors hover:border-[var(--accent)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              {!!c.badge && (
                <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--accent-foreground)]">
                  {c.badge} new
                </span>
              )}
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl text-[var(--forest-deep)]">{c.count}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-2 font-display text-2xl text-[var(--forest-deep)]">Dashboard</h1>
      <p className="mb-8 text-sm text-muted-foreground">Overview of CAIR&apos;s content.</p>

      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
        <DashboardData />
      </Suspense>
    </div>
  );
}
