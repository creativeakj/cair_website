import { EmailButton, EmailLayout, EmailParagraph } from "@/lib/email-templates/EmailLayout";

export function NewsletterWelcome({ siteUrl }: { siteUrl: string }) {
  return (
    <EmailLayout preview="Welcome to the CAIR mailing list" heading="Welcome to CAIR.">
      <EmailParagraph>
        Thank you for subscribing. You&apos;ll now receive updates on new research
        publications, news, and upcoming events from the Center for African
        International Relations.
      </EmailParagraph>
      <EmailButton href={`${siteUrl}/news`}>Read the latest news</EmailButton>
    </EmailLayout>
  );
}

export default NewsletterWelcome;
