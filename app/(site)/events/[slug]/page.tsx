import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader, Section } from "@/components/PageHeader";
import { EventCountdown } from "@/components/sections/EventCountdown";
import { EventRegistrationModal } from "@/components/sections/EventRegistrationModal";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { formatDate, previewText } from "@/components/sections/EventCard";
import { getEventBySlug, getEvents } from "@/lib/services/events";
import { cloudinaryFill } from "@/lib/utils";

export async function generateStaticParams() {
  const events = await getEvents();
  if (events.length === 0) return [{ slug: "_placeholder" }];
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const description = previewText(event.description, 160);
  return {
    title: event.title,
    description,
    openGraph: {
      title: event.title,
      description,
      type: "article",
      images: event.image_url ? [cloudinaryFill(event.image_url, 1200, 630)] : undefined,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.event_date,
    endDate: event.end_date ?? event.event_date,
    location: { "@type": "Place", name: event.location },
    organizer: { "@type": "Organization", name: "Center for African International Relations" },
    eventAttendanceMode:
      event.type === "virtual"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : event.type === "hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow={event.category}
        title={event.title}
        lede={previewText(event.description, 220)}
      />
      {event.image_url && (
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image src={cloudinaryFill(event.image_url, 1600, 686)} alt={event.title} fill sizes="100vw" priority className="object-cover" />
        </div>
      )}
      <Section className="max-w-4xl">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="border-b border-border pb-6">
              <div className="text-sm text-foreground/70">{formatDate(event.event_date, event.end_date)}</div>
              <div className="mt-1 text-sm text-foreground/70">{event.location}</div>
            </div>
            <div className="mt-6">
              <ArticleBody html={event.description} />
            </div>

            {event.partner_logos.length > 0 && (
              <div className="mt-8">
                <div className="eyebrow mb-3">In collaboration with</div>
                <div className="flex flex-wrap items-center gap-4">
                  {event.partner_logos.map((logo) => (
                    <div key={logo} className="flex items-center gap-3 rounded-sm border border-border bg-[var(--secondary)] px-4 py-2">
                      <Image src={logo} alt="Partner logo" width={40} height={40} className="h-8 w-8 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.status !== "past" && (
              <EventRegistrationModal
                eventSlug={event.slug}
                eventTitle={event.title}
                triggerClassName="mt-8 inline-flex items-center gap-2 rounded-sm bg-[var(--forest)] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--primary-foreground)] hover:bg-[var(--forest-deep)]"
              />
            )}
          </div>

          {event.status !== "past" && (
            <div className="rounded-sm bg-[var(--forest-deep)] p-6 text-[var(--primary-foreground)]">
              <EventCountdown eventDate={event.event_date} />
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
