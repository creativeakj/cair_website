import { EmailButton, EmailField, EmailLayout } from "@/lib/email-templates/EmailLayout";

export function SubscriberNotification({ email, source }: { email: string; source?: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <EmailLayout preview={`New newsletter subscriber: ${email}`} heading="New newsletter subscriber">
      <EmailField label="Email" value={email} />
      {source ? <EmailField label="Source" value={source} /> : null}
      <EmailButton href={`${siteUrl}/admin/subscribers`}>View subscribers</EmailButton>
    </EmailLayout>
  );
}

export default SubscriberNotification;
