import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Contact the Center for African International Relations — headquarters in Lansing, Michigan; regional hub in Abuja, Nigeria.",
  openGraph: {
    title: "Contact CAIR",
    description: "Get in touch with the Center for African International Relations.",
  },
};

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow={<T path="contact.eyebrow" />}
        title={
          <>
            <T path="contact.titleStart" /> <span className="text-[var(--gold-ink)]"><T path="contact.titleEmphasis" /></span>
          </>
        }
        lede={<T path="contact.lede" />}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="bg-[var(--secondary)] p-10">
            <div className="eyebrow">
              <T path="contact.headquarters" />
            </div>
            <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)]">United States</h2>
            <address className="mt-5 not-italic leading-relaxed text-foreground/80">
              Center for African International Relations
              <br />
              713 North Chestnut Street
              <br />
              Lansing, MI 48906
              <br />
              United States of America
            </address>
          </div>
          <div className="bg-[var(--secondary)] p-10">
            <div className="eyebrow">
              <T path="contact.regionalHub" />
            </div>
            <h2 className="mt-3 font-display text-3xl text-[var(--forest-deep)]">Nigeria</h2>
            <address className="mt-5 not-italic leading-relaxed text-foreground/80">
              Center for African International Relations
              <br />
              Abuja, Federal Capital Territory
              <br />
              Federal Republic of Nigeria
            </address>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">
              <T path="contact.sendMessage" />
            </span>
            <h2 className="mt-3 font-display text-4xl text-[var(--forest-deep)]">
              We welcome partners and inquiries from across Africa, America, and allied nations.
            </h2>
            <p className="mt-5 text-foreground/75">
              Official languages are English and French. Translation can be arranged on request.
            </p>
          </div>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
