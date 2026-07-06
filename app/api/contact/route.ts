import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/validation/contact";
import { contactsCollection } from "@/lib/db/collections";
import { sendEmail, internalNotificationAddress } from "@/lib/email";
import { ContactAcknowledgement } from "@/lib/email-templates/ContactAcknowledgement";
import { ContactNotification } from "@/lib/email-templates/ContactNotification";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: z.prettifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { name, email, subject, message, source_page } = parsed.data;

  try {
    const contacts = await contactsCollection();
    await contacts.insertOne({
      name,
      email,
      subject,
      message,
      source_page,
      created_at: new Date(),
      is_read: false,
    });
  } catch (error) {
    console.error("[contact] failed to record submission:", error);
    return NextResponse.json({ success: false, error: "Could not send your message" }, { status: 500 });
  }

  try {
    await Promise.all([
      sendEmail({
        to: email,
        subject: "We've received your message — CAIR",
        react: ContactAcknowledgement({ name }),
      }),
      sendEmail({
        to: internalNotificationAddress(),
        subject: `New contact form submission: ${subject}`,
        react: ContactNotification({ name, email, subject, message, sourcePage: source_page }),
      }),
    ]);
  } catch (error) {
    // The submission is already saved; a failed email shouldn't fail the request.
    console.error("[contact] failed to send notification emails:", error);
  }

  return NextResponse.json({ success: true });
}
