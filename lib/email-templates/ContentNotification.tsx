import { EmailButton, EmailLayout, EmailParagraph } from "@/lib/email-templates/EmailLayout";

const COPY = {
  event: { eyebrow: "New event", cta: "View event details" },
  news: { eyebrow: "New article", cta: "Read the full article" },
  publication: { eyebrow: "New publication", cta: "View publication" },
} as const;

export function ContentNotification({
  kind,
  title,
  description,
  url,
}: {
  kind: "event" | "news" | "publication";
  title: string;
  description: string;
  url: string;
}) {
  const copy = COPY[kind];

  return (
    <EmailLayout preview={`${copy.eyebrow}: ${title}`} eyebrow={copy.eyebrow} heading={title}>
      <EmailParagraph>{description}</EmailParagraph>
      <EmailButton href={url}>{copy.cta}</EmailButton>
    </EmailLayout>
  );
}

export default ContentNotification;
