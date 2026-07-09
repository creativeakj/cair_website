import { NextResponse } from "next/server";
import { z } from "zod";
import { eventRegistrationSchema } from "@/lib/validation/event-registration";
import { getEventBySlug } from "@/lib/services/events";
import { recordEventRegistration } from "@/lib/services/event-registrations";
import { sendEmail, internalNotificationAddress } from "@/lib/email";
import { EventRegistrationConfirmation } from "@/lib/email-templates/EventRegistrationConfirmation";
import { EventRegistrationNotification } from "@/lib/email-templates/EventRegistrationNotification";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = eventRegistrationSchema.safeParse({ ...(body as object), event_slug: slug });
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: z.prettifyError(parsed.error) }, { status: 400 });
  }

  const event = await getEventBySlug(slug);
  if (!event) {
    return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
  }

  const { name, email, organization, message } = parsed.data;

  try {
    await recordEventRegistration({
      event_id: event.id,
      event_slug: event.slug,
      event_title: event.title,
      name,
      email,
      organization,
      message,
    });
  } catch (error) {
    console.error("[events/register] failed to record registration:", error);
    return NextResponse.json({ success: false, error: "Could not save registration" }, { status: 500 });
  }

  const eventDate = new Date(event.event_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  try {
    await Promise.all([
      sendEmail({
        to: email,
        subject: `You're registered: ${event.title}`,
        react: EventRegistrationConfirmation({
          name,
          eventTitle: event.title,
          eventDate,
          location: event.location,
          meetingLink: event.meeting_link,
        }),
      }),
      sendEmail({
        to: internalNotificationAddress(),
        subject: `New registration: ${event.title}`,
        react: EventRegistrationNotification({ eventTitle: event.title, name, email, organization, message }),
      }),
    ]);
  } catch (error) {
    // The registration is already saved; a failed email shouldn't fail the request.
    console.error("[events/register] failed to send emails:", error);
  }

  return NextResponse.json({ success: true });
}
