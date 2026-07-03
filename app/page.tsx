import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Fostering strong, mutually beneficial relations between Africa and America through diplomacy, research, advocacy, and partnerships.",
  openGraph: {
    title: "CAIR — Center for African International Relations",
    description: "Advancing peace, prosperity, and shared global values between Africa and America.",
  },
};

const PLACES = [
  { src: "/images/place-kilimanjaro.jpg", name: "Mount Kilimanjaro", country: "Tanzania", h: "md:mt-10" },
  { src: "/images/place-victoria-falls.jpg", name: "Victoria Falls", country: "Zambia · Zimbabwe", h: "" },
  { src: "/images/place-zanzibar.jpg", name: "Zanzibar Coast", country: "Tanzania", h: "md:mt-16" },
  { src: "/images/place-marrakech.jpg", name: "Marrakech", country: "Morocco", h: "md:mt-4" },
];

export default function Home() {
  return (
    <>
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
              <span className="eyebrow">Africa · America · Allied Nations</span>
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
          </div>
          <div className="md:col-span-8 md:pt-3">
            <p className="text-lg leading-relaxed text-foreground/80">
              CAIR fosters strong, mutually beneficial relations between Africa and
              America while advancing peace, prosperity, and shared global values —
              through diplomatic engagement, trade promotion, research, leadership
              development, and cultural exchange.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                ["Diplomacy", "Convening leaders and policy makers across continents."],
                ["Trade & Investment", "Opening pathways for sustainable economic growth."],
                ["Research & Policy", "Independent, evidence-led analysis."],
                ["Capacity & Exchange", "Building leadership, education, and cultural bridges."],
              ].map(([title, desc]) => (
                <div key={title} className="border-t border-[var(--gold)]/60 pt-4">
                  <div className="font-display text-xl text-[var(--forest-deep)]">{title}</div>
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

      {/* BEAUTIFUL PLACES */}
      <section className="relative overflow-hidden bg-[var(--forest-deep)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">A Continent of Wonder</span>
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
        <div className="grid gap-10 border-y border-border py-12 md:grid-cols-4">
          {[
            ["2", "Headquarters", "Washington D.C. · Abuja"],
            ["5", "Thematic Units", "Diplomacy to Climate"],
            ["40%+", "Women & Youth", "Board representation"],
            ["∞", "Global Network", "Africa · America · Allies"],
          ].map(([n, t, d]) => (
            <div key={t}>
              <div className="font-display text-5xl text-[var(--forest-deep)]">{n}</div>
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--gold)]">{t}</div>
              <div className="mt-1 text-sm text-foreground/70">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <Image src="/images/africa-city.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[var(--forest-deep)]/85" />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center text-[var(--primary-foreground)]">
          <span className="eyebrow">Join the Center</span>
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
