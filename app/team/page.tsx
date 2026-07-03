import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Team & Leadership",
  description: "Meet the founding leadership, board, and advisors guiding the Center for African International Relations.",
  openGraph: {
    title: "Team & Leadership — CAIR",
    description: "Founders, board, and advisors of the Center for African International Relations.",
  },
};

type Person = {
  name: string;
  role: string;
  bio: string;
  location: string;
  focus: string[];
  accent?: "forest" | "gold" | "accent";
};

const LEADERSHIP: Person[] = [
  {
    name: "Mr. Olatunbosun Williams",
    role: "Chairman & President",
    location: "Lansing, MI · Abuja, NG",
    bio: "Founder of CAIR. Two decades of work across diaspora policy, civic infrastructure, and Africa–America institution-building.",
    focus: ["Strategy", "Policy", "Partnerships"],
    accent: "forest",
  },
  {
    name: "Dr. Echo Emmanuel Ogbenjuwa",
    role: "Vice Chairman",
    location: "Washington, D.C.",
    bio: "Academic and practitioner bridging governance research with on-the-ground diplomatic engagement across West and Central Africa.",
    focus: ["Governance", "Research", "Diplomacy"],
    accent: "accent",
  },
  {
    name: "Mrs. Echo Mary Ocholongwa",
    role: "Secretary",
    location: "Abuja, Nigeria",
    bio: "Operations and institutional design lead, responsible for the constitutional integrity and member-facing programs of CAIR.",
    focus: ["Operations", "Membership", "Programs"],
    accent: "gold",
  },
  {
    name: "Ambassador Omolara Williams",
    role: "Treasurer",
    location: "Lansing, Michigan",
    bio: "Career diplomat with deep financial stewardship experience across multilateral institutions and pan-African initiatives.",
    focus: ["Finance", "Diplomacy", "Stewardship"],
    accent: "forest",
  },
];

const ADVISORS: Pick<Person, "name" | "role" | "location">[] = [
  { name: "Prof. Ade Okonkwo", role: "Senior Advisor · Trade & AfCFTA", location: "Accra, Ghana" },
  { name: "Hon. Linda Carter", role: "Senior Advisor · U.S. Policy", location: "Detroit, Michigan" },
  { name: "Dr. Kwame Asante", role: "Fellow · Peace & Security", location: "Nairobi, Kenya" },
  { name: "Ms. Aïcha Diallo", role: "Fellow · Youth Diplomacy", location: "Dakar, Senegal" },
  { name: "Dr. Samuel Mensah", role: "Fellow · Research & Publications", location: "Boston, Massachusetts" },
  { name: "Mrs. Zainab Bello", role: "Advisor · Diaspora Engagement", location: "London, UK" },
];

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Hon\.|Ambassador)\s+/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

const accentStyles: Record<NonNullable<Person["accent"]>, string> = {
  forest: "bg-[var(--forest-deep)] text-[var(--primary-foreground)]",
  gold: "bg-[var(--gold)] text-[var(--forest-deep)]",
  accent: "bg-[var(--accent)] text-[var(--accent-foreground)]",
};

export default function TeamPage() {
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
            ["4", "Founding officers"],
            ["12+", "Board & advisors"],
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
          {LEADERSHIP.map((p, i) => {
            const span = i % 3 === 0 ? "md:col-span-4" : "md:col-span-2";
            return (
              <article
                key={p.name}
                className={`group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-[2px] hover:border-[var(--accent)] hover:shadow-lg ${span}`}
              >
                <div className={`flex items-center gap-5 p-7 ${accentStyles[p.accent ?? "forest"]}`}>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-background/15 font-display text-2xl backdrop-blur">
                    {initials(p.name)}
                  </div>
                  <div>
                    <div className="font-display text-xl leading-tight md:text-2xl">{p.name}</div>
                    <div className="text-xs uppercase tracking-[0.18em] opacity-80">{p.role}</div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7">
                  <p className="text-foreground/80">{p.bio}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.location}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.focus.map((f) => (
                        <span key={f} className="rounded-sm bg-secondary px-2 py-1 text-[10px] uppercase tracking-wider text-secondary-foreground">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
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
          {ADVISORS.map((a) => (
            <li
              key={a.name}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-5 transition-colors hover:bg-background"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background font-display text-sm text-[var(--forest-deep)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                {initials(a.name)}
              </div>
              <div>
                <div className="font-display text-lg text-[var(--forest-deep)]">{a.name}</div>
                <div className="text-sm text-foreground/70">{a.role}</div>
              </div>
              <span className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground md:inline">
                {a.location}
              </span>
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
