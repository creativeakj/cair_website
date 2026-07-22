import { EmailButton, EmailField, EmailLayout, EmailQuote } from "@/lib/email-templates/EmailLayout";
import { getSiteUrl } from "@/lib/utils";

export function EventRegistrationNotification({
  eventTitle,
  name,
  email,
  organization,
  message,
}: {
  eventTitle: string;
  name: string;
  email: string;
  organization?: string;
  message?: string;
}) {
  const siteUrl = getSiteUrl();

  return (
    <EmailLayout preview={`New registration for ${eventTitle}`} eyebrow="New registration" heading={eventTitle}>
      <EmailField label="Name" value={name} />
      <EmailField label="Email" value={email} />
      {organization ? <EmailField label="Organization" value={organization} /> : null}
      {message ? <EmailQuote>{message}</EmailQuote> : null}
      <EmailButton href={`${siteUrl}/admin/event-registrations`}>View registrations</EmailButton>
    </EmailLayout>
  );
}

export default EventRegistrationNotification;
