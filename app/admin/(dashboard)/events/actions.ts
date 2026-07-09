"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { eventSchema, type EventFormValues } from "@/lib/validation/event";
import { createEvent, updateEvent, deleteEvent, getEventById } from "@/lib/services/events";
import { sanitizeRichText } from "@/lib/sanitize-html";
import { notifySubscribers } from "@/lib/services/subscriber-notify";
import { stripHtml, truncate } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createEventAction(input: EventFormValues) {
  await requireAdmin();
  const data = eventSchema.parse(input);
  await createEvent({
    ...data,
    description: sanitizeRichText(data.description),
    image_url: data.image_url || undefined,
    end_date: data.end_date || undefined,
    meeting_link: data.meeting_link || undefined,
  });
  revalidatePath("/admin/events");
}

export async function updateEventAction(id: string, input: EventFormValues) {
  await requireAdmin();
  const data = eventSchema.parse(input);
  await updateEvent(id, {
    ...data,
    description: sanitizeRichText(data.description),
    image_url: data.image_url || undefined,
    end_date: data.end_date || undefined,
    meeting_link: data.meeting_link || undefined,
  });
  revalidatePath("/admin/events");
}

export async function deleteEventAction(id: string) {
  await requireAdmin();
  await deleteEvent(id);
  revalidatePath("/admin/events");
}

export async function notifyEventSubscribersAction(id: string): Promise<number> {
  await requireAdmin();
  const event = await getEventById(id);
  if (!event) throw new Error("Event not found");
  return notifySubscribers({
    kind: "event",
    title: event.title,
    description: truncate(stripHtml(event.description)),
    path: `/events/${event.slug}`,
  });
}
