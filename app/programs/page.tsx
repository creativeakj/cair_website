import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Programs & Thematic Units",
  description: "CAIR's thematic units span diplomacy, trade, peace and security, education, and research.",
  openGraph: {
    title: "Programs & Thematic Units — CAIR",
    description: "Specialized units delivering CAIR's substantive work across Africa–America relations.",
  },
};

const UNITS = [
  ["Diplomacy & Governance", "Convene heads of mission, parliamentarians, and policy makers. Strengthen democratic institutions through structured dialogue and exchange.", ["Track-II dialogues", "Policy roundtables", "Governance fellowships"]],
  ["Trade & Investment", "Open pathways for inclusive commerce and capital flows between African and American markets, and with allied nations.", ["Investor convenings", "Market intelligence", "Public-private partnerships"]],
  ["Peace & Security", "Support cooperation on conflict prevention, post-conflict recovery, and regional stability across the Atlantic basin.", ["Track-II mediation", "Security forums", "Research briefings"]],
  ["Education & Cultural Exchange", "Advance scholarly mobility, cultural understanding, and shared educational programs that bind communities together.", ["Visiting fellows", "Cultural festivals", "Curriculum exchange"]],
  ["Research & Policy", "Independent, evidence-led analysis to inform decision makers and the public on the issues shaping Africa–America relations.", ["Policy papers", "Annual outlooks", "Data dashboards"]],
];

export default function Programs() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title={<>Five thematic units. <span className="text-[var(--gold)]">One agenda.</span></>}
        lede="CAIR delivers its mission through specialized units that translate the Constitution's objectives into research, convenings, and partnerships."
      />

      <Section>
        <div className="space-y-px bg-border">
          {UNITS.map(([title, desc, items], i) => (
            <article key={title as string} className="grid gap-8 bg-background p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-4">
                <div className="font-display text-5xl text-[var(--gold)]">0{i + 1}</div>
                <h2 className="mt-2 font-display text-3xl text-[var(--forest-deep)]">{title}</h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-foreground/80">{desc}</p>
              </div>
              <div className="md:col-span-3">
                <div className="eyebrow">Signature Work</div>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground/75">
                  {(items as string[]).map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-px w-3 bg-[var(--gold)]" />{it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
