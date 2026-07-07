import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";
import { PublicationsBrowser } from "@/components/sections/PublicationsBrowser";
import { getPublications } from "@/lib/services/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research, policy briefs, reports, and data digests from the Center for African International Relations.",
  openGraph: {
    title: "Publications — CAIR",
    description: "Independent, evidence-led analysis from CAIR's Research Unit, fellows, and advisors.",
  },
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      <PageHeader
        eyebrow="Research & Publications"
        title={<>Evidence for <span className="text-[var(--gold-ink)]">every conversation.</span></>}
        lede="Policy briefs, annual reports, and data digests from CAIR's Research Unit, fellows, and advisors — free to read and download."
      />
      <Section>
        <PublicationsBrowser publications={publications} />
      </Section>
    </>
  );
}
