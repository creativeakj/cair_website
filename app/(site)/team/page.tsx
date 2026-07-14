import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/PageHeader";
import { getActiveTeamMembers } from "@/lib/services/team";
import { TeamGrid, TeamList } from "@/components/sections/TeamGrid";

export const metadata: Metadata = {
  title: "Team & Leadership",
  description: "Meet the founding leadership, board, and advisors guiding the Center for African International Relations.",
  openGraph: {
    title: "Team & Leadership — CAIR",
    description: "Founders, board, and advisors of the Center for African International Relations.",
  },
};

const TUM_DEPARTMENT = "TUM Collaboration";

export default async function TeamPage() {
  const members = await getActiveTeamMembers();
  const leadership = members.filter((m) => m.department === "Executive");
  const tumOfficers = members.filter((m) => m.department === TUM_DEPARTMENT);
  const advisors = members.filter((m) => m.department !== "Executive" && m.department !== TUM_DEPARTMENT);

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

        <TeamGrid members={leadership} />
      </Section>

      {tumOfficers.length > 0 && (
        <Section className="border-t border-border">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">In Collaboration with TUM</div>
              <h2 className="mt-2 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
                Officers of the Collaboration
              </h2>
            </div>
            <p className="max-w-md text-sm text-foreground/70">
              Leaders from The Unifiers Movement (TUM) who co-convene programs and dialogues alongside CAIR&apos;s
              own officers.
            </p>
          </div>

          <TeamGrid members={tumOfficers} />
        </Section>
      )}

      <Section className="bg-secondary/40">
        <div className="mb-10">
          <div className="eyebrow">Advisors & Fellows</div>
          <h2 className="mt-2 font-display text-3xl text-[var(--forest-deep)] md:text-4xl">
            A standing council across continents
          </h2>
        </div>

        <TeamList members={advisors} />
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
