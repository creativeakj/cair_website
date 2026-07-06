import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeSchema } from "@/lib/validation/subscribe";
import { subscribersCollection } from "@/lib/db/collections";
import { sendEmail } from "@/lib/email";
import { NewsletterWelcome } from "@/lib/email-templates/NewsletterWelcome";

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
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      await sendEmail({
        to: email,
        subject: "Welcome to CAIR",
        react: NewsletterWelcome({ siteUrl }),
      });
    } catch (error) {
      // The subscriber is already saved; a failed welcome email shouldn't fail the request.
      console.error("[subscribe] failed to send welcome email:", error);
    }
  }

  return NextResponse.json({ success: true });
}
