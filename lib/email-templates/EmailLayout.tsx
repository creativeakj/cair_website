import { Body, Container, Head, Html, Img, Link, Preview, Section, Text } from "@react-email/components";
import type { ReactNode } from "react";

export const emailColors = {
  navy: "#18213b",
  gold: "#b08a2e",
  teal: "#0f7a7a",
  text: "#374151",
  muted: "#6b7280",
  border: "#e5e7eb",
  panel: "#f8fafc",
};

const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_SERIF = "Georgia, 'Times New Roman', serif";

// Hosted on Cloudinary (not the site's own domain) so the logo loads in
// recipients' inboxes regardless of where/whether the site is deployed.
const LOGO_URL =
  "https://res.cloudinary.com/edlmvvfq/image/upload/w_360/v1783370762/cair/site-assets/cair-logo-email.jpg";

export function EmailLayout({
  preview,
  heading,
  children,
}: {
  preview: string;
  heading?: string;
  children: ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: "32px 16px", backgroundColor: "#eef2f6", fontFamily: FONT_SANS }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px 10px 0 0",
              padding: "28px 32px 20px",
              textAlign: "center" as const,
              borderBottom: `3px solid ${emailColors.gold}`,
            }}
          >
            <Img
              src={LOGO_URL}
              alt="CAIR — Center for African International Relations"
              width="180"
              height="61"
              style={{ display: "inline-block", margin: "0 auto" }}
            />
          </Section>

          <Section
            style={{
              backgroundColor: "#ffffff",
              borderLeft: `1px solid ${emailColors.border}`,
              borderRight: `1px solid ${emailColors.border}`,
              padding: "36px 32px",
            }}
          >
            {heading && (
              <Text
                style={{
                  margin: "0 0 16px",
                  fontFamily: FONT_SERIF,
                  fontSize: "22px",
                  lineHeight: 1.3,
                  color: emailColors.navy,
                  fontWeight: 700,
                }}
              >
                {heading}
              </Text>
            )}
            {children}
          </Section>

          <Section
            style={{
              backgroundColor: emailColors.panel,
              border: `1px solid ${emailColors.border}`,
              borderRadius: "0 0 10px 10px",
              padding: "22px 32px",
              textAlign: "center" as const,
            }}
          >
            <Text style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: 600, color: emailColors.navy }}>
              Center for African International Relations
            </Text>
            <Text style={{ margin: 0, fontSize: "12px", color: emailColors.muted }}>
              <Link href={siteUrl} style={{ color: emailColors.teal, textDecoration: "none" }}>
                {siteUrl.replace(/^https?:\/\//, "")}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        marginTop: "20px",
        padding: "12px 26px",
        backgroundColor: emailColors.gold,
        color: emailColors.navy,
        fontSize: "13px",
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
        textDecoration: "none",
        borderRadius: "4px",
      }}
    >
      {children}
    </Link>
  );
}

export function EmailField({ label, value }: { label: string; value: string }) {
  return (
    <Text style={{ margin: "0 0 6px", fontSize: "14px", lineHeight: 1.6, color: emailColors.text }}>
      <strong style={{ color: emailColors.navy }}>{label}:</strong> {value}
    </Text>
  );
}

export function EmailQuote({ children }: { children: ReactNode }) {
  return (
    <Section
      style={{
        backgroundColor: emailColors.panel,
        borderLeft: `3px solid ${emailColors.gold}`,
        padding: "14px 18px",
        margin: "16px 0 0",
      }}
    >
      <Text style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: emailColors.text, whiteSpace: "pre-wrap" as const }}>
        {children}
      </Text>
    </Section>
  );
}

export function EmailParagraph({ children }: { children: ReactNode }) {
  return (
    <Text style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: 1.65, color: emailColors.text }}>
      {children}
    </Text>
  );
}
