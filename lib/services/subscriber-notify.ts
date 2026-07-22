import { subscribersCollection } from "@/lib/db/collections";
import { sendBatchEmails } from "@/lib/email";
import { ContentNotification } from "@/lib/email-templates/ContentNotification";
import { getSiteUrl } from "@/lib/utils";

export async function notifySubscribers(input: {
  kind: "event" | "news" | "publication";
  title: string;
  description: string;
  path: string;
}): Promise<number> {
  const collection = await subscribersCollection();
  const subscribers = await collection.find({ status: "active" }).toArray();
  if (subscribers.length === 0) return 0;

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${input.path}`;

  const emails = subscribers.map((s) => ({
    to: s.email,
    subject: `${input.title} — CAIR`,
    react: ContentNotification({ kind: input.kind, title: input.title, description: input.description, url }),
  }));

  const { sent } = await sendBatchEmails(emails);
  return sent;
}
