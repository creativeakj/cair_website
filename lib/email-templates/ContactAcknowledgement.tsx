import { EmailButton, EmailLayout, EmailParagraph } from "@/lib/email-templates/EmailLayout";
import { getSiteUrl } from "@/lib/utils";

export function ContactAcknowledgement({ name }: { name: string }) {
  const siteUrl = getSiteUrl();

  return (
    <EmailLayout preview="Thank you for reaching out to CAIR" heading={`Thank you, ${name}.`}>
      <EmailParagraph>
        We&apos;ve received your message and the CAIR Executive Secretariat will be in
        touch shortly. In the meantime, feel free to explore our latest research and
        news.
      </EmailParagraph>
      <EmailButton href={`${siteUrl}/publications`}>Explore publications</EmailButton>
    </EmailLayout>
  );
}

export default ContactAcknowledgement;
