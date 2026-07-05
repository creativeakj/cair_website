import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { EventDTO } from "@/lib/services/events";

const TYPE_LABEL: Record<EventDTO["type"], string> = {
  "in-person": "In-person",
  virtual: "Virtual",
  hybrid: "Hybrid",
};

function formatDate(iso: string, endIso?: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  if (endIso) {
    const end = new Date(endIso);
    if (end.toDateString() !== d.toDateString()) {
      const endDate = end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      return `${date} – ${endDate}`;
    }
  }
  return `${date} · ${time}`;
}

export function EventCard({ event }: { event: EventDTO }) {
  return (
    <article className="group flex flex-col rounded-sm border border-border bg-card p-7 transition-colors hover:border-[var(--accent)]">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-sm bg-[var(--forest-deep)] px-2 py-1 font-medium uppercase tracking-wider text-[var(--primary-foreground)]">
          {TYPE_LABEL[event.type]}
        </span>
        <Badge variant="outline" className="border-[var(--gold)] text-[var(--forest-deep)]">
          {event.category}
        </Badge>
        {event.status === "registration-open" && (
          <span className="rounded-sm bg-[var(--accent)] px-2 py-1 font-medium uppercase tracking-wider text-[var(--accent-foreground)]">
            Registration open
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-2xl text-[var(--forest-deep)]">
        <Link href={`/events/${event.slug}`} className="hover:text-[var(--accent)]">
          {event.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-foreground/70">{formatDate(event.event_date, event.end_date)}</p>
      <p className="mt-1 text-sm text-foreground/60">{event.location}</p>
      <p className="mt-4 text-foreground/80">{event.description}</p>

      <div className="mt-6 flex items-center gap-4">
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--forest)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--forest-deep)]"
        >
          Details
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export { formatDate };
