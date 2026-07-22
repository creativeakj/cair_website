import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeSchema } from "@/lib/validation/subscribe";
import { subscribersCollection } from "@/lib/db/collections";
import { sendEmail, internalNotificationAddress } from "@/lib/email";
import { NewsletterWelcome } from "@/lib/email-templates/NewsletterWelcome";
import { SubscriberNotification } from "@/lib/email-templates/SubscriberNotification";
import { getSiteUrl } from "@/lib/utils";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: z.prettifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { email, source } = parsed.data;

  let isNewSubscriber = true;
  try {
    const subscribers = await subscribersCollection();

    const existing = await subscribers.findOne({ email });
    if (existing) {
      isNewSubscriber = existing.status === "unsubscribed";
      if (isNewSubscriber) {
        await subscribers.updateOne({ email }, { $set: { status: "active" } });
      }
    } else {
      await subscribers.insertOne({
        email,
        status: "active",
        subscribed_at: new Date(),
        source,
      });
    }
  } catch (error) {
    console.error("[subscribe] failed to record subscriber:", error);
    return NextResponse.json({ success: false, error: "Could not subscribe" }, { status: 500 });
  }

  if (isNewSubscriber) {
    try {
      const siteUrl = getSiteUrl();
      await Promise.all([
        sendEmail({
          to: email,
          subject: "Welcome to CAIR",
          react: NewsletterWelcome({ siteUrl }),
        }),
        sendEmail({
          to: internalNotificationAddress(),
          subject: `New newsletter subscriber: ${email}`,
          react: SubscriberNotification({ email, source }),
        }),
      ]);
    } catch (error) {
      // The subscriber is already saved; a failed email shouldn't fail the request.
      console.error("[subscribe] failed to send emails:", error);
    }
  }

  return NextResponse.json({ success: true });
}
