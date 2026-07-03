import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export function ContactNotification({
  name,
  email,
  subject,
  message,
  sourcePage,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  sourcePage: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", color: "#18213b" }}>New contact submission</Heading>
          <Text style={{ color: "#333333" }}>
            <strong>Name:</strong> {name}
            <br />
            <strong>Email:</strong> {email}
            <br />
            <strong>Subject:</strong> {subject}
            <br />
            <strong>Source page:</strong> {sourcePage}
          </Text>
          <Text style={{ color: "#333333", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotification;
