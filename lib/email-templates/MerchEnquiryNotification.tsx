import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export function MerchEnquiryNotification({
  productName,
  name,
  email,
  message,
}: {
  productName: string;
  name: string;
  email: string;
  message?: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>New merch enquiry: {productName}</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", color: "#18213b" }}>New merch enquiry</Heading>
          <Text style={{ color: "#333333" }}>
            <strong>Product:</strong> {productName}
            <br />
            <strong>Name:</strong> {name}
            <br />
            <strong>Email:</strong> {email}
          </Text>
          {message ? <Text style={{ color: "#333333", lineHeight: "1.6" }}>{message}</Text> : null}
        </Container>
      </Body>
    </Html>
  );
}

export default MerchEnquiryNotification;
