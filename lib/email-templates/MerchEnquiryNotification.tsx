import { EmailButton, EmailField, EmailLayout, EmailQuote } from "@/lib/email-templates/EmailLayout";

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
    <EmailLayout preview={`New merch enquiry: ${productName}`} heading="New merch enquiry">
      <EmailField label="Product" value={productName} />
      <EmailField label="Name" value={name} />
      <EmailField label="Email" value={email} />
      {message ? <EmailQuote>{message}</EmailQuote> : null}
      <EmailButton href={`mailto:${email}`}>Reply to {name}</EmailButton>
    </EmailLayout>
  );
}

export default MerchEnquiryNotification;
