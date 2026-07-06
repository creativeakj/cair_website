import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export function SubscriberNotification({ email, source }: { email: string; source?: string }) {
  return (
    <Html>
      <Head />
      <Preview>New newsletter subscriber: {email}</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f5" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", color: "#18213b" }}>New newsletter subscriber</Heading>
          <Text style={{ color: "#333333" }}>
            <strong>Email:</strong> {email}
            {source ? (
              <>
                <br />
                <strong>Source:</strong> {source}
              </>
            ) : null}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default SubscriberNotification;
