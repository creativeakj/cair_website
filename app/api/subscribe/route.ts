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
  const subscribers = await subscribersCollection();

  const existing = await subscribers.findOne({ email });
  if (existing) {
    if (existing.status === "unsubscribed") {
      await subscribers.updateOne({ email }, { $set: { status: "active" } });
    }
    return NextResponse.json({ success: true });
  }

  await subscribers.insertOne({
    email,
    status: "active",
    subscribed_at: new Date(),
    source,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  await sendEmail({
    to: email,
    subject: "Welcome to CAIR",
    react: NewsletterWelcome({ siteUrl }),
  });

  return NextResponse.json({ success: true });
}
