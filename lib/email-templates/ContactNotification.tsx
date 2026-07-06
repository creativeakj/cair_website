import { EmailButton, EmailField, EmailLayout, EmailQuote } from "@/lib/email-templates/EmailLayout";

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
    <EmailLayout preview={`New contact form submission from ${name}`} heading="New contact submission">
      <EmailField label="Name" value={name} />
      <EmailField label="Email" value={email} />
      <EmailField label="Subject" value={subject} />
      <EmailField label="Source page" value={sourcePage} />
      <EmailQuote>{message}</EmailQuote>
      <EmailButton href={`mailto:${email}`}>Reply to {name}</EmailButton>
    </EmailLayout>
  );
}

export default ContactNotification;
