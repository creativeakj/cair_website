import { EmailButton, EmailField, EmailLayout, EmailQuote } from "@/lib/email-templates/EmailLayout";
import { getSiteUrl } from "@/lib/utils";

export function DonationEnquiryNotification({
  name,
  email,
  phone,
  organization,
  amount,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  amount?: string;
  message?: string;
}) {
  const siteUrl = getSiteUrl();

  return (
    <EmailLayout preview={`New donation enquiry from ${name}`} eyebrow="New donation enquiry" heading={name}>
      <EmailField label="Email" value={email} />
      <EmailField label="Phone" value={phone} />
      {organization ? <EmailField label="Organization" value={organization} /> : null}
      {amount ? <EmailField label="Intended amount" value={amount} /> : null}
      {message ? <EmailQuote>{message}</EmailQuote> : null}
      <EmailButton href={`${siteUrl}/admin/donations`}>View donation enquiries</EmailButton>
    </EmailLayout>
  );
}

export default DonationEnquiryNotification;
