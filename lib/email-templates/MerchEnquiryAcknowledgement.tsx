import { EmailButton, EmailLayout, EmailParagraph } from "@/lib/email-templates/EmailLayout";

export function MerchEnquiryAcknowledgement({ name, productName }: { name: string; productName: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <EmailLayout preview={`We've received your enquiry about ${productName}`} heading={`Thank you, ${name}.`}>
      <EmailParagraph>
        We&apos;ve received your enquiry about <strong>{productName}</strong> and the
        CAIR team will follow up with you shortly.
      </EmailParagraph>
      <EmailButton href={`${siteUrl}/merch`}>Browse merch</EmailButton>
    </EmailLayout>
  );
}

export default MerchEnquiryAcknowledgement;
