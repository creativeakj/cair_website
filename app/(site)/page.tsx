import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Handshake, TrendingUp, ShieldCheck, GraduationCap, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EventCard } from "@/components/sections/EventCard";
import { PublicationCard } from "@/components/sections/PublicationCard";
import { NewsCard } from "@/components/sections/NewsCard";
import { getEvents } from "@/lib/services/events";
import { getPublications } from "@/lib/services/publications";
import { getPublishedNewsArticles } from "@/lib/services/news";
import { getActiveTeamMembers } from "@/lib/services/team";
import { cloudinaryFill } from "@/lib/utils";

const PLACEHOLDER_PHOTO = "/images/team/placeholder.jpg";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Fostering strong, mutually beneficial relations between Africa and America through diplomacy, research, advocacy, and partnerships.",
  openGraph: {
    title: "CAIR — Center for African International Relations",
    description: "Advancing peace, prosperity, and shared global values between Africa and America.",
  },
};

const PILLARS = [
  {
    icon: Handshake,
    title: "Diplomacy & Governance",
    desc: "Convening heads of mission, parliamentarians, and policy makers to strengthen democratic institutions.",
  },
  {
    icon: TrendingUp,
    title: "Trade & Investment",
    desc: "Opening pathways for inclusive commerce and capital flows across African and American markets.",
  },
  {
    icon: ShieldCheck,
    title: "Peace & Security",
    desc: "Supporting conflict prevention, post-conflict recovery, and regional stability across the Atlantic basin.",
  },
  {
    icon: GraduationCap,
    title: "Education & Exchange",
    desc: "Advancing scholarly mobility, cultural understanding, and shared educational programs.",
  },
  {
    icon: BookOpen,
    title: "Research & Policy",
    desc: "Producing independent, evidence-led analysis to inform decision makers and the public.",
  },
] as const;

const PLACES = [
  { src: "/images/place-kilimanjaro.jpg", name: "Mount Kilimanjaro", country: "Tanzania", h: "md:mt-10" },
  { src: "/images/place-victoria-falls.jpg", name: "Victoria Falls", country: "Zambia · Zimbabwe", h: "" },
  { src: "/images/place-zanzibar.jpg", name: "Zanzibar Coast", country: "Tanzania", h: "md:mt-16" },
  { src: "/images/place-marrakech.jpg", name: "Marrakech", country: "Morocco", h: "md:mt-4" },
];

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Center for African International Relations",
  alternateName: "CAIR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "A non-governmental, non-profit, non-partisan center advancing dialogue, research, and partnership between Africa and America.",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "713 North Chestnut Street",
      addressLocality: "Lansing",
      addressRegion: "MI",
      postalCode: "48906",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
  ],
};

export default async function Home() {
  const [events, publications, news, teamMembers] = await Promise.all([
    getEvents(),
    getPublications(),
    getPublishedNewsArticles(),
    getActiveTeamMembers(),
  ]);
  const upcomingEvents = events.filter((e) => e.status !== "past").slice(0, 3);
  const latestPublications = publications.slice(0, 3);
  const latestNews = news.slice(0, 3);
  const leadership = teamMembers.filter((m) => m.department === "Executive").slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="African leaders in dialogue"
          fill
          priority
          sizes="100vw"
          className="-z-10 animate-[heroZoom_18s_ease-out_forwards] object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--forest-deep)]/95 via-[var(--forest-deep)]/75 to-[var(--forest-deep)]/30" />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-[var(--gold)]/20 blur-3xl animate-[float_9s_ease-in-out_infinite]" />
        <div aria-hidden className="pointer-events-none absolute right-10 bottom-10 -z-10 h-96 w-96 rounded-full bg-[var(--accent)]/25 blur-3xl animate-[float_11s_ease-in-out_infinite_reverse]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-32 md:py-44">
          <div className="max-w-3xl text-[var(--primary-foreground)]">
            <div className="flex items-center gap-3 opacity-0 [animation:fade-in_0.7s_ease-out_0.1s_forwards]">
              <span className="gold-rule" />
              <span className="eyebrow text-[var(--gold)]">Africa · America · Allied Nations</span>
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl opacity-0 [animation:fade-in_0.9s_ease-out_0.3s_forwards]">
              Building bridges
              <br />
              <span className="bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_6s_linear_infinite]">
                between continents.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 opacity-0 [animation:fade-in_0.9s_ease-out_0.55s_forwards]">
              The Center for African International Relations advances dialogue,
              research, and partnership for a future shaped by peace, prosperity,
              and shared global values.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 opacity-0 [animation:fade-in_0.9s_ease-out_0.8s_forwards]">
              <Link href="/about" className="rounded-sm bg-[var(--gold)] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--forest-deep)] shadow-lg shadow-[var(--gold)]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--gold)]/30">
                Our Mission
              </Link>
              <Link href="/membership" className="rounded-sm border border-white/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
          <div className="h-10 w-px animate-[scrollCue_2.4s_ease-in-out_infinite] bg-white/60" />
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Vision</span>
            <h2 className="mt-4 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
              A leading hub for African–American cooperation.
            </h2>
            <p className="mt-5 text-foreground/70">
              Five thematic units translate that vision into research, convenings,
              and partnerships on the ground.
            </p>
            <Link
              href="/programs"
              className="mt-6 inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-sm font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]"
            >
              See all programs →
            </Link>
          </div>
          <div className="md:col-span-8 md:pt-3">
            <p className="text-lg leading-relaxed text-foreground/80">
              CAIR fosters strong, mutually beneficial relations between Africa and
              America while advancing peace, prosperity, and shared global values —
              through diplomatic engagement, trade promotion, research, leadership
              development, and cultural exchange.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="border-t border-[var(--gold)]/60 pt-4">
                  <Icon className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.5} />
                  <div className="mt-3 font-display text-xl text-[var(--forest-deep)]">{title}</div>
                  <p className="mt-2 text-sm text-foreground/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="bg-[var(--secondary)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-xl">
            <Image src="/images/dialogue.jpg" alt="Diplomatic dialogue" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <span className="eyebrow">Mission</span>
            <h2 className="mt-4 font-display text-3xl text-[var(--forest-deep)] md:text-5xl">
              Dialogue. Research. Advocacy. Partnership.
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              We promote engagement that strengthens African–American relations,
              enhances cooperation with allied nations, and creates pathways for
              sustainable development, democratic governance, and international
              collaboration.
            </p>
            <Link href="/programs" className="mt-8 inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-sm font-medium uppercase tracking-[0.18em] text-[var(--forest-deep)]">
              Explore our programs →
            </Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP QUOTE */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="gold-rule mx-auto mb-6 block" />
          <blockquote className="font-display text-2xl leading-snug text-[var(--forest-deep)] md:text-3xl">
            &ldquo;CAIR exists because the relationship between Africa and America
            deserves institutions, not just conversations — bodies that convene,
            research, and hold the work together long after the headlines move on.&rdquo;
          </blockquote>
          <div className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-[var(--gold-ink)]">
            Olatunbosun Williams
          </div>
          <div className="text-sm text-foreground/60">Chairman &amp; President, CAIR</div>
        </div>
      </section>

      {/* BEAUTIFUL PLACES */}
      <section className="relative overflow-hidden bg-[var(--forest-deep)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow text-[var(--gold)]">A Continent of Wonder</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">
                The Africa we work for.
              </h2>
              <p className="mt-4 max-w-xl text-white/70">
                From the snows of Kilimanjaro to the medinas of Marrakech — the
                landscapes, cities, and cultures that shape every conversation.
              </p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {PLACES.map((p) => (
              <figure
                key={p.name}
                className={`group relative overflow-hidden rounded-sm ${p.h}`}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-[var(--forest-deep)]/30 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <div className="font-display text-lg md:text-xl">{p.name}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">{p.country}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">By the Numbers</span>
          <h2 className="mt-4 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
            An institution built for the long term.
          </h2>
        </div>
        <div className="grid gap-10 border-y border-border py-12 sm:grid-cols-2 md:grid-cols-5">
          {[
            ["2", "Headquarters", "Lansing, MI · Abuja"],
            ["5", "Thematic Units", "Diplomacy to Research"],
            ["40%+", "Women & Youth", "Board representation"],
            ["7+", "Countries", "Represented on our council"],
            ["3-yr", "Board Terms", "Renewable under the Constitution"],
          ].map(([n, t, d]) => (
            <div key={t}>
              <div className="font-display text-5xl text-[var(--forest-deep)]">{n}</div>
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--gold-ink)]">{t}</div>
              <div className="mt-1 text-sm text-foreground/70">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP STRIP */}
      <section className="bg-[var(--secondary)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Leadership</span>
              <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
                The officers of the Center
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-sm font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]"
            >
              Meet the full team →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {leadership.map((m) => (
              <div key={m.id} className="bg-background p-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={cloudinaryFill(m.photo_url || PLACEHOLDER_PHOTO, 256, 256)} alt={m.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="mt-4 font-display text-lg text-[var(--forest-deep)]">{m.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-[var(--forest-deep)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="eyebrow mb-8 text-center text-[var(--gold)] md:text-left">
            In collaboration with
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <div className="flex items-center gap-3 rounded-sm bg-white/95 px-5 py-3">
              <Image src="/images/partners/tum-logo.jpg" alt="The Unifiers Movement (TUM)" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--forest-deep)]">
                The Unifiers Movement
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-sm bg-white/95 px-5 py-3">
              <Image src="/images/partners/gaba-logo.jpg" alt="GABA Foundation" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--forest-deep)]">
                GABA Foundation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      {upcomingEvents.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Convenings</span>
              <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
                Upcoming events
              </h2>
            </div>
            <div className="flex gap-6">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-sm font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]"
              >
                View all events →
              </Link>
              <Link
                href="/events#past"
                className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground hover:border-[var(--gold)] hover:text-[var(--forest-deep)]"
              >
                Past events →
              </Link>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      {/* PUBLICATIONS */}
      {latestPublications.length > 0 && (
        <section className="bg-[var(--secondary)]">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">Research</span>
                <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
                  Latest publications
                </h2>
              </div>
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-sm font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]"
              >
                View all publications →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPublications.map((p) => (
                <PublicationCard key={p.id} publication={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWS */}
      {latestNews.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
                Latest news
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-sm font-medium uppercase tracking-[0.16em] text-[var(--forest-deep)]"
            >
              View all news →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latestNews.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-10">
          <span className="eyebrow">Frequently Asked</span>
          <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
            Common questions about CAIR
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="affiliation">
            <AccordionTrigger className="font-display text-lg text-[var(--forest-deep)]">
              Is CAIR affiliated with any government?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/75">
              No. CAIR is a non-governmental, non-profit, non-partisan organization,
              registered independently in the United States and the Federal Republic
              of Nigeria. It does not represent or receive direction from any
              government or political party.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="funding">
            <AccordionTrigger className="font-display text-lg text-[var(--forest-deep)]">
              How is CAIR funded?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/75">
              As a non-profit, CAIR is funded through membership dues, institutional
              partnerships, and program-specific grants. All proceeds are applied to
              the Center&apos;s mission and objectives — there is no private benefit,
              and finances are subject to an independent annual audit presented to
              the General Assembly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="partner">
            <AccordionTrigger className="font-display text-lg text-[var(--forest-deep)]">
              How can my organization partner with CAIR?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/75">
              Institutions can engage as institutional members, event co-conveners,
              or research partners. Reach out through the{" "}
              <Link href="/contact" className="underline underline-offset-2 hover:text-[var(--forest-deep)]">
                Contact
              </Link>{" "}
              page and the Executive Secretariat will route your inquiry to the
              relevant thematic unit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="membership">
            <AccordionTrigger className="font-display text-lg text-[var(--forest-deep)]">
              How do I become a member?
            </AccordionTrigger>
            <AccordionContent className="text-foreground/75">
              CAIR offers institutional, individual, associate, and honorary
              membership categories. Visit the{" "}
              <Link href="/membership" className="underline underline-offset-2 hover:text-[var(--forest-deep)]">
                Membership
              </Link>{" "}
              page for details on each tier, then contact the Executive
              Secretariat to request an application.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <Image src="/images/africa-city.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[var(--forest-deep)]/85" />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center text-[var(--primary-foreground)]">
          <span className="eyebrow text-[var(--gold)]">Join the Center</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Shape the next chapter of <span className="text-[var(--gold)]">Africa–America</span> relations.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            CAIR welcomes institutions, professionals, scholars, and emerging
            leaders committed to advancing dialogue, cooperation, and shared prosperity.
          </p>
          <Link href="/membership" className="mt-10 inline-block rounded-sm bg-[var(--gold)] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--forest-deep)]">
            Become a Member
          </Link>
        </div>
      </section>
    </>
  );
}
