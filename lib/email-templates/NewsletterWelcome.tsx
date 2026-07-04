import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export function NewsletterWelcome({ siteUrl }: { siteUrl: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the CAIR mailing list</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", color: "#18213b" }}>Welcome to CAIR.</Heading>
          <Text style={{ color: "#333333", lineHeight: "1.6" }}>
            Thank you for subscribing. You&apos;ll now receive updates on new research
            publications, news, and upcoming events from the Center for African
            International Relations.
          </Text>
          <Text style={{ color: "#333333", lineHeight: "1.6" }}>
            Explore the latest at{" "}
            <a href={`${siteUrl}/news`} style={{ color: "#0f7a7a" }}>
              {siteUrl}/news
            </a>{" "}
            and{" "}
            <a href={`${siteUrl}/publications`} style={{ color: "#0f7a7a" }}>
              {siteUrl}/publications
            </a>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterWelcome;
