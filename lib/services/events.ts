import { cacheLife, cacheTag } from "next/cache";
import { eventsCollection } from "@/lib/db/collections";
import type { CairEvent } from "@/types/event";

export type EventDTO = Omit<CairEvent, "_id" | "event_date" | "end_date" | "created_at"> & {
  id: string;
  event_date: string;
  end_date?: string;
  created_at: string;
};

function toDTO(doc: CairEvent): EventDTO {
  const { _id, event_date, end_date, created_at, ...rest } = doc;
  return {
    id: _id!.toString(),
    event_date: event_date.toISOString(),
    end_date: end_date?.toISOString(),
    created_at: created_at.toISOString(),
    ...rest,
  };
}

export async function getEvents(): Promise<EventDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("events");

  const collection = await eventsCollection();
  const docs = await collection.find({}).sort({ event_date: -1 }).toArray();
  return docs.map(toDTO);
}

export async function getEventBySlug(slug: string): Promise<EventDTO | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  cacheTag(`event:${slug}`);

  const collection = await eventsCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toDTO(doc) : null;
}
