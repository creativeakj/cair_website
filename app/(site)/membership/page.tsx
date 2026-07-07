import type { Metadata } from "next";
import Link from "next/link";
import { Vote, Users, BookOpenCheck, Landmark } from "lucide-react";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Membership",
  description: "Become a member of CAIR. Four categories: institutional, individual, associate, and honorary.",
  openGraph: {
    title: "Membership — CAIR",
    description: "Join a global network advancing African–American international relations.",
  },
};

const BENEFITS = [
  { icon: Vote, title: "A voice that counts", desc: "Voting rights in the General Assembly on constitutional and strategic matters." },
  { icon: Users, title: "A global network", desc: "Direct access to diplomats, scholars, and institutions across Africa, America, and allied nations." },
  { icon: BookOpenCheck, title: "Research access", desc: "Early access to CAIR publications, working papers, and policy briefings." },
  { icon: Landmark, title: "A governance path", desc: "Eligibility to serve on the Board, Advisory Council, or a thematic unit." },
] as const;

const TIERS = [
  ["Institutional", "For organizations", "Universities, think tanks, NGOs, corporations, and government-affiliated entities aligned with CAIR's mission.", ["Voting in General Assembly", "Eligible for governance", "Institutional convenings"]],
  ["Individual", "For professionals", "Diplomats, academics, professionals, and civil society leaders working on Africa–America issues.", ["Voting rights", "Program participation", "Research access"]],
  ["Associate", "Early career", "Students, early-career professionals, and affiliates with a demonstrated interest in African–American relations.", ["Program participation", "Mentorship pathways", "Fellow eligibility"]],
  ["Honorary", "By invitation", "Distinguished individuals invited by the Board for outstanding contributions to the field.", ["Lifetime recognition", "Advisory engagement", "Non-voting"]],
];

export default function Membership() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title={<>Join a network shaping <span className="text-[var(--gold-ink)]">Africa–America</span> relations.</>}
        lede="Membership of CAIR is open to institutions and individuals committed to the Center's mission, values, and Constitution."
      />

      <Section className="border-b border-border">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <Icon className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.5} />
              <div className="mt-3 font-display text-lg text-[var(--forest-deep)]">{title}</div>
              <p className="mt-2 text-sm text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {TIERS.map(([name, audience, desc, perks]) => (
            <div key={name as string} className="bg-background p-10">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-3xl text-[var(--forest-deep)]">{name}</h2>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--gold-ink)]">{audience}</span>
              </div>
              <p className="mt-4 text-foreground/75">{desc}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-foreground/80">
                {(perks as string[]).map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow">Obligations</span>
            <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)]">
              Members uphold CAIR&apos;s values, contribute dues where applicable, and abide by the Constitution and By-Laws.
            </h2>
          </div>
          <div className="bg-[var(--forest-deep)] p-10 text-[var(--primary-foreground)]">
            <div className="eyebrow text-[var(--gold)]">Apply</div>
            <h3 className="mt-3 font-display text-3xl">Begin your membership.</h3>
            <p className="mt-3 text-white/75">
              Reach out to the Executive Secretariat to request the membership
              application and learn about current opportunities.
            </p>
            <Link href="/contact" className="mt-6 inline-block rounded-sm bg-[var(--gold)] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--forest-deep)]">
              Contact the Secretariat
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
