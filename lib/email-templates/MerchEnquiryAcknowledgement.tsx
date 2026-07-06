import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export function MerchEnquiryAcknowledgement({ name, productName }: { name: string; productName: string }) {
  return (
    <Html>
      <Head />
      <Preview>We&apos;ve received your enquiry about {productName}</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", color: "#18213b" }}>Thank you, {name}.</Heading>
          <Text style={{ color: "#333333", lineHeight: "1.6" }}>
            We&apos;ve received your enquiry about <strong>{productName}</strong> and the CAIR
            team will follow up with you shortly.
          </Text>
          <Text style={{ color: "#888888", fontSize: "12px", marginTop: "24px" }}>
            Center for African International Relations
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default MerchEnquiryAcknowledgement;
