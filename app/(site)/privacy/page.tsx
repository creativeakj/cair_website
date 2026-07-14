import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Center for African International Relations collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="Last updated July 2026. This page explains what information we collect through cairglobal.org and how we use it."
      />
      <Section className="max-w-3xl">
        <div className="prose-cair max-w-none">
          <p>
            The Center for African International Relations (&quot;CAIR&quot;, &quot;we&quot;, &quot;us&quot;) respects
            your privacy. This policy covers the information collected through cairglobal.org and how it is used,
            stored, and protected.
          </p>

          <h2>Information we collect</h2>
          <p>We collect information you provide directly to us, specifically when you:</p>
          <ul>
            <li>Submit the contact form (name, email, organization, subject, message)</li>
            <li>Subscribe to our newsletter (email address)</li>
            <li>Register for an event (name, email, organization, any message you add)</li>
            <li>Enquire about merchandise (name, email, message)</li>
          </ul>
          <p>
            We do not require account creation to use the public site, and we do not knowingly collect payment or
            financial information — merchandise is enquiry-based, not a checkout.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your enquiry, registration, or message</li>
            <li>To send newsletter updates, if you subscribed, and to email you event details you registered for</li>
            <li>To understand overall site usage (see Analytics below)</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2>Analytics</h2>
          <p>
            We use Google Analytics (GA4) to understand aggregate visitor trends — such as which pages are viewed and
            general visitor geography — so we can improve the site. This data is not used to identify you personally.
            You can opt out of Google Analytics tracking using a browser extension such as the{" "}
            <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </Link>
            .
          </p>

          <h2>Third-party services</h2>
          <p>We rely on the following third-party services to operate the site, each of which processes data on our behalf:</p>
          <ul>
            <li>Cloudinary — hosts uploaded images (team photos, event banners, publication covers)</li>
            <li>Resend — delivers transactional emails (confirmations, notifications, newsletter)</li>
            <li>MongoDB Atlas — stores site content and submissions</li>
            <li>Vercel — hosts the website</li>
          </ul>

          <h2>Data retention</h2>
          <p>
            We retain contact, registration, and enquiry records for as long as reasonably necessary to respond to
            you and maintain our records, or until you ask us to delete them.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us to access, correct, or delete the personal information we hold about you, or to
            unsubscribe from the newsletter at any time, by contacting us using the details below.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>This site is not directed at children under 13, and we do not knowingly collect information from them.</p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The &quot;last updated&quot; date above reflects the most
            recent revision.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy can be sent via our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
