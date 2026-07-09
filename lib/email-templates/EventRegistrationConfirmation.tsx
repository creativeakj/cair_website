import { EmailButton, EmailField, EmailLayout, EmailParagraph } from "@/lib/email-templates/EmailLayout";

export function EventRegistrationConfirmation({
  name,
  eventTitle,
  eventDate,
  location,
  meetingLink,
}: {
  name: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  meetingLink?: string;
}) {
  return (
    <EmailLayout preview={`You're registered for ${eventTitle}`} eyebrow="Registration confirmed" heading={eventTitle}>
      <EmailParagraph>
        Thank you, {name} — you&apos;re registered. Here are the details:
      </EmailParagraph>
      <EmailField label="Date" value={eventDate} />
      <EmailField label="Location" value={location} />
      {meetingLink ? (
        <>
          <EmailParagraph>Join using the link below when the event begins.</EmailParagraph>
          <EmailButton href={meetingLink}>Join the meeting</EmailButton>
        </>
      ) : (
        <EmailParagraph>We look forward to seeing you there.</EmailParagraph>
      )}
    </EmailLayout>
  );
}

export default EventRegistrationConfirmation;
