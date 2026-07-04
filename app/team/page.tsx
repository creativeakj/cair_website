import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/PageHeader";
import { getActiveTeamMembers } from "@/lib/services/team";

export const metadata: Metadata = {
  title: "Team & Leadership",
  description: "Meet the founding leadership, board, and advisors guiding the Center for African International Relations.",
  openGraph: {
    title: "Team & Leadership — CAIR",
    description: "Founders, board, and advisors of the Center for African International Relations.",
  },
};

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Hon\.|Ambassador)\s+/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

const ACCENTS = [
  "bg-[var(--forest-deep)] text-[var(--primary-foreground)]",
  "bg-[var(--accent)] text-[var(--accent-foreground)]",
  "bg-[var(--gold)] text-[var(--forest-deep)]",
];

export default async function TeamPage() {
  const members = await getActiveTeamMembers();
  const leadership = members.filter((m) => m.department === "Executive");
  const advisors = members.filter((m) => m.department !== "Executive");

  return (
    <>
      <PageHeader
        eyebrow="The People"
        title={
          <>
            Conveners of a <span className="text-[var(--accent)]">new diplomacy.</span>
          </>
        }
        lede="A founding team that moves between Lansing and Lagos, between policy halls and community rooms — building the institutional muscle behind CAIR's mandate."
      />

      <Section className="border-y border-border py-10">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            [String(leadership.length), "Founding officers"],
            [`${advisors.length}+`, "Board & advisors"],
            ["2", "Headquarters"],
            ["7", "Countries represented"],
          ].map(([num, label]) => (
            <div key={label}>
              <dt className="font-display text-4xl text-[var(--forest-deep)] md:text-5xl">{num}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Founding Leadership</div>
            <h2 className="mt-2 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
              The officers of the Center
            </h2>
          </div>
          <p className="max-w-md text-sm text-foreground/70">
            Elected under the CAIR Constitution to a renewable three-year term. Each officer leads a portfolio aligned with the Center&apos;s five thematic units.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-6 md:auto-rows-[minmax(260px,auto)]">
          {leadership.map((p, i) => {
            const span = i % 3 === 0 ? "md:col-span-4" : "md:col-span-2";
            return (
              <article
                key={p.id}
                className={`group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-[2px] hover:border-[var(--accent)] hover:shadow-lg ${span}`}
              >
                <div className={`flex items-center gap-5 p-7 ${ACCENTS[i % ACCENTS.length]}`}>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-background/15 font-display text-2xl backdrop-blur">
                    {initials(p.name)}
                  </div>
                  <div>
                    <div className="font-display text-xl leading-tight md:text-2xl">{p.name}</div>
                    <div className="text-xs uppercase tracking-[0.18em] opacity-80">{p.title}</div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7">
                  <p className="text-foreground/80">{p.bio}</p>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100"
                />
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="mb-10">
          <div className="eyebrow">Advisors & Fellows</div>
          <h2 className="mt-2 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
            A standing council across continents
          </h2>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {advisors.map((a) => (
            <li
              key={a.id}
              className="group grid grid-cols-[auto_1fr] items-center gap-6 py-5 transition-colors hover:bg-background"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background font-display text-sm text-[var(--forest-deep)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                {initials(a.name)}
              </div>
              <div>
                <div className="font-display text-lg text-[var(--forest-deep)]">{a.name}</div>
                <div className="text-sm text-foreground/70">{a.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid items-center gap-6 rounded-sm border border-border bg-[var(--forest-deep)] p-10 text-[var(--primary-foreground)] md:grid-cols-[1fr_auto] md:p-14">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">Open call</div>
            <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
              We are still building the team. Walk with us.
            </h2>
            <p className="mt-3 max-w-xl text-[var(--primary-foreground)]/80">
              CAIR welcomes practitioners, scholars, and diaspora leaders to join as members, fellows, or partner organizations.
            </p>
          </div>
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 rounded-sm bg-[var(--gold)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--forest-deep)] transition-transform hover:translate-y-[-1px]"
          >
            Become a member
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
