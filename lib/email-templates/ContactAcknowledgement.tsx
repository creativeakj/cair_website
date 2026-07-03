import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export function ContactAcknowledgement({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for reaching out to CAIR</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", color: "#18213b" }}>Thank you, {name}.</Heading>
          <Text style={{ color: "#333333", lineHeight: "1.6" }}>
            We&apos;ve received your message and the CAIR Executive Secretariat will be in touch
            shortly. In the meantime, feel free to explore our latest publications and news.
          </Text>
          <Text style={{ color: "#888888", fontSize: "12px", marginTop: "24px" }}>
            Center for African International Relations
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactAcknowledgement;
