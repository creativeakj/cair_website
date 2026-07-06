import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";
import { getPrograms } from "@/lib/services/programs";

export const metadata: Metadata = {
  title: "Programs & Thematic Units",
  description: "CAIR's thematic units span diplomacy, trade, peace and security, education, and research.",
  openGraph: {
    title: "Programs & Thematic Units — CAIR",
    description: "Specialized units delivering CAIR's substantive work across Africa–America relations.",
  },
};

export default async function Programs() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title={<>Five thematic units. <span className="text-[var(--gold)]">One agenda.</span></>}
        lede="CAIR delivers its mission through specialized units that translate the Constitution's objectives into research, convenings, and partnerships."
      />

      <Section>
        <div className="space-y-px bg-border">
          {programs.map((program) => (
            <article key={program.id} className="grid gap-8 bg-background p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-4">
                <div className="font-display text-5xl text-[var(--gold)]">
                  0{program.number}
                </div>
                <h2 className="mt-2 font-display text-3xl text-[var(--forest-deep)]">{program.title}</h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-foreground/80">{program.description}</p>
              </div>
              <div className="md:col-span-3">
                <div className="eyebrow">Signature Work</div>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground/75">
                  {program.signature_work.map((it) => (
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
