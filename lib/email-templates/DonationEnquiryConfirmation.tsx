import { EmailLayout, EmailParagraph } from "@/lib/email-templates/EmailLayout";

export function DonationEnquiryConfirmation({ name }: { name: string }) {
  return (
    <EmailLayout preview="Thank you for your interest in supporting CAIR" heading={`Thank you, ${name}.`}>
      <EmailParagraph>
        We&apos;ve received your interest in supporting the Center for African International Relations. A
        member of our team will reach out to you shortly with details on how to complete your gift.
      </EmailParagraph>
      <EmailParagraph>
        Your generosity helps advance dialogue, research, and partnership between Africa and America — thank
        you for standing with us.
      </EmailParagraph>
    </EmailLayout>
  );
}

export default DonationEnquiryConfirmation;
