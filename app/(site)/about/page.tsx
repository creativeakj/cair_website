import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About — Vision, Mission & Objectives",
  description: "Learn about CAIR's vision, mission, and the objectives guiding African–American international relations.",
  openGraph: {
    title: "About CAIR",
    description: "Vision, mission, and objectives of the Center for African International Relations.",
  },
};

const OBJECTIVES = [
  ["Diplomatic Engagement", "Facilitate sustained dialogue between African and American institutions, leaders, and civil society."],
  ["Trade & Investment", "Promote mutually beneficial commerce, investment flows, and inclusive economic growth."],
  ["Research & Policy Advocacy", "Conduct independent research and translate it into actionable policy recommendations."],
  ["Leadership & Capacity", "Build leadership pipelines and strengthen institutional capacity across sectors."],
  ["Education & Culture", "Advance educational, scholarly, and cultural exchange across the Atlantic."],
  ["Peace, Security & Climate", "Support cooperation on peace, security, and the shared climate agenda."],
];

const ORGANS = [
  ["General Assembly", "The supreme governing body composed of all registered members. Approves constitutional amendments, elects the Board, and reviews annual reports."],
  ["Board of Directors", "9–15 members from Africa, the U.S., and allied nations, with at least 40% women and youth. Sets strategic direction; 3-year renewable term."],
  ["Executive Secretariat", "Administrative and operational arm led by an Executive Director. Implements programs, manages staff, and liaises with stakeholders."],
  ["Advisory Council", "Subject-matter experts and strategic partners providing technical expertise and networking support on a voluntary basis."],
  ["Thematic Units", "Specialized units delivering CAIR's substantive work across diplomacy, trade, peace, education, and research."],
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow={<T path="about.eyebrow" />}
        title={
          <>
            <T path="about.titleStart" /> <span className="text-[var(--gold-ink)]"><T path="about.titleEmphasis" /></span>{" "}
            <T path="about.titleEnd" />
          </>
        }
        lede={<T path="about.lede" />}
      />

      <Section>
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <span className="eyebrow">Vision</span>
            <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)]">
              To be a leading hub fostering strong, mutually beneficial relations between Africa and America.
            </h2>
            <p className="mt-5 text-foreground/75">
              We work to advance peace, prosperity, and shared global values — through
              convening, research, advocacy, and partnership across continents.
            </p>
          </div>
          <div>
            <span className="eyebrow">Mission</span>
            <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)]">
              To promote dialogue, research, advocacy, and partnerships that strengthen African–American relations.
            </h2>
            <p className="mt-5 text-foreground/75">
              CAIR enhances cooperation with allied nations and creates pathways for
              sustainable development, democratic governance, and international collaboration.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Objectives</span>
            <h2 className="mt-4 font-display text-4xl text-[var(--forest-deep)]">
              Six commitments that guide our work.
            </h2>
          </div>
          <div className="md:col-span-8 grid gap-8 sm:grid-cols-2">
            {OBJECTIVES.map(([t, d], i) => (
              <div key={t} className="border-t border-[var(--gold)]/60 pt-5">
                <div className="text-xs font-medium text-[var(--gold-ink)]">0{i + 1}</div>
                <div className="mt-1 font-display text-xl text-[var(--forest-deep)]">{t}</div>
                <p className="mt-2 text-sm text-foreground/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">Governance</span>
            <h2 className="mt-4 font-display text-4xl text-[var(--forest-deep)]">
              Five organs. One mandate.
            </h2>
            <p className="mt-5 text-foreground/75">
              CAIR is governed through a structure designed for accountability,
              inclusivity, and strategic clarity — anchored in transparency and
              the principles of the Constitution.
            </p>
          </div>
          <div className="md:col-span-8 space-y-px bg-border">
            {ORGANS.map(([t, d], i) => (
              <div key={t} className="bg-background p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-[var(--gold-ink)]">0{i + 1}</span>
                  <h3 className="font-display text-xl text-[var(--forest-deep)]">{t}</h3>
                </div>
                <p className="mt-2 text-sm text-foreground/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Non-Profit", "All proceeds applied to mission and objectives. No private benefit."],
            ["Inclusive", "At least 40% women and youth representation on the Board of Directors."],
            ["Transparent", "Independent annual audit presented to the General Assembly."],
          ].map(([t, d]) => (
            <div key={t} className="bg-[var(--secondary)] p-8">
              <div className="font-display text-2xl text-[var(--forest-deep)]">{t}</div>
              <p className="mt-3 text-sm text-foreground/75">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
