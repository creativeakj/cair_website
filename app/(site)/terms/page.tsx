import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service",
  description: "The terms governing your use of the Center for African International Relations website.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        lede="Last updated July 2026. Please read these terms before using cairglobal.org."
      />
      <Section className="max-w-3xl">
        <div className="prose-cair max-w-none">
          <p>
            These terms govern your use of cairglobal.org, operated by the Center for African International
            Relations (&quot;CAIR&quot;, &quot;we&quot;, &quot;us&quot;), a non-governmental, non-profit,
            non-partisan organization registered in the United States and the Federal Republic of Nigeria. By using
            this site, you agree to these terms.
          </p>

          <h2>Use of the site</h2>
          <p>
            You may browse, read, and download publications from this site for personal, educational, or
            non-commercial research use. You agree not to misuse the site — including attempting unauthorized
            access, disrupting service, or scraping content for commercial redistribution.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless otherwise noted, text, publications, graphics, and the CAIR name and mark are the property of
            CAIR or its licensors. You may quote or cite our publications with appropriate attribution; you may not
            republish them in full without permission.
          </p>

          <h2>Submissions</h2>
          <p>
            Information you submit through our contact form, newsletter signup, event registration, or merchandise
            enquiry is handled as described in our{" "}
            <a href="/privacy">Privacy Policy</a>. You are responsible for the accuracy of the information you
            provide.
          </p>

          <h2>Merchandise enquiries</h2>
          <p>
            The Merch page is enquiry-based, not a storefront — submitting an enquiry does not create a purchase or
            payment obligation. Pricing, availability, and fulfillment are arranged directly with our team.
          </p>

          <h2>Events and registration</h2>
          <p>
            Registering for an event through this site does not guarantee entry where capacity, eligibility, or
            venue restrictions apply. Event details, including meeting links for virtual or hybrid sessions, are
            provided in good faith and may change; we will make reasonable efforts to notify registrants of changes.
          </p>

          <h2>External links</h2>
          <p>
            This site may link to third-party websites (including partner organizations) that we do not control. We
            are not responsible for their content or practices.
          </p>

          <h2>Disclaimer</h2>
          <p>
            This site and its content are provided &quot;as is&quot; without warranties of any kind, express or
            implied. We do not guarantee the site will be uninterrupted, secure, or error-free.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, CAIR is not liable for any indirect, incidental, or
            consequential damages arising from your use of this site.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws applicable to CAIR&apos;s registered jurisdictions in the United
            States (Michigan) and the Federal Republic of Nigeria, as applicable.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may revise these terms from time to time. Continued use of the site after changes are posted
            constitutes acceptance of the revised terms.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these terms can be sent via our <a href="/contact">Contact page</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
