"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { eventSchema, type EventFormValues } from "@/lib/validation/event";
import { createEvent, updateEvent, deleteEvent } from "@/lib/services/events";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createEventAction(input: EventFormValues) {
  await requireAdmin();
  const data = eventSchema.parse(input);
  await createEvent({
    ...data,
    end_date: data.end_date || undefined,
    registration_url: data.registration_url || undefined,
  });
  revalidatePath("/admin/events");
}

export async function updateEventAction(id: string, input: EventFormValues) {
  await requireAdmin();
  const data = eventSchema.parse(input);
  await updateEvent(id, {
    ...data,
    end_date: data.end_date || undefined,
    registration_url: data.registration_url || undefined,
  });
  revalidatePath("/admin/events");
}

export async function deleteEventAction(id: string) {
  await requireAdmin();
  await deleteEvent(id);
  revalidatePath("/admin/events");
}
