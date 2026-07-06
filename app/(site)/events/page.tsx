import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader, Section } from "@/components/PageHeader";
import { EventCard, formatDate, previewText } from "@/components/sections/EventCard";
import { EventCountdown } from "@/components/sections/EventCountdown";
import { getEvents } from "@/lib/services/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming CAIR forums, dialogues, and convenings advancing Africa–America relations.",
  openGraph: {
    title: "Events — CAIR",
    description: "Upcoming CAIR forums, dialogues, and convenings advancing Africa–America relations.",
  },
};

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = events.filter((e) => e.status !== "past");
  const past = events.filter((e) => e.status === "past");
  const featured = events.find((e) => e.is_featured) ?? upcoming[0];

  return (
    <>
      <PageHeader
        eyebrow="Convenings"
        title="Events & Dialogues"
        lede="Forums, briefings, and fellowships that bring African and American leaders into the same room — physically and virtually."
      />

      {featured && (
        <Section>
          <div className="overflow-hidden rounded-sm border border-border bg-[var(--forest-deep)] text-[var(--primary-foreground)]">
            {featured.image_url && (
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image src={featured.image_url} alt={featured.title} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] to-transparent" />
              </div>
            )}
            <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
              <div>
                <span className="eyebrow text-[var(--gold)]">Featured</span>
                <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{featured.title}</h2>
                <p className="mt-3 text-white/80">{previewText(featured.description, 220)}</p>
                <p className="mt-4 text-sm text-white/70">{formatDate(featured.event_date, featured.end_date)}</p>
                <p className="text-sm text-white/70">{featured.location}</p>

                {featured.partner_logos.length > 0 && (
                  <div className="mt-6">
                    <div className="eyebrow mb-3 text-[var(--gold)]">In collaboration with</div>
                    <div className="flex flex-wrap items-center gap-4">
                      {featured.partner_logos.map((logo) => (
                        <div key={logo} className="flex items-center gap-3 rounded-sm bg-white/95 px-4 py-2">
                          <Image src={logo} alt="Partner logo" width={40} height={40} className="h-8 w-8 object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/events/${featured.slug}`}
                  className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[var(--gold)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--forest-deep)] transition-transform hover:translate-y-[-1px]"
                >
                  View details <span aria-hidden>→</span>
                </Link>
              </div>

              <EventCountdown eventDate={featured.event_date} />
            </div>
          </div>
        </Section>
      )}

      <Section>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl text-[var(--forest-deep)] md:text-4xl">Upcoming</h2>
          <span className="text-sm text-muted-foreground">{upcoming.length} scheduled</span>
        </div>
        {upcoming.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No upcoming events at this time. Check back soon
            {past.length > 0 ? " — browse past convenings below." : "."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </Section>

      {past.length > 0 && (
        <Section id="past" className="border-t border-border pt-16">
          <h2 className="mb-8 font-display text-2xl text-[var(--forest-deep)] md:text-3xl">Past convenings</h2>
          <ul className="divide-y divide-border">
            {past.map((e) => (
              <li key={e.id} className="grid gap-2 py-5 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8">
                <div>
                  <Link href={`/events/${e.slug}`} className="font-display text-lg text-[var(--forest-deep)] hover:text-[var(--accent)]">
                    {e.title}
                  </Link>
                  <div className="text-sm text-muted-foreground">{e.location}</div>
                </div>
                <div className="text-sm text-foreground/70">{formatDate(e.event_date)}</div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{e.category}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
