import { cacheLife, cacheTag, updateTag } from "next/cache";
import { ObjectId } from "mongodb";
import { eventsCollection } from "@/lib/db/collections";
import type { CairEvent, EventFormat, EventStatus } from "@/types/event";

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

export async function getEventById(id: string): Promise<EventDTO | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await eventsCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  return doc ? toDTO(doc) : null;
}

export type EventInput = {
  slug: string;
  title: string;
  description: string;
  image_url?: string;
  event_date: string;
  end_date?: string;
  location: string;
  type: EventFormat;
  category: string;
  status: EventStatus;
  is_featured: boolean;
  partner_logos: string[];
  meeting_link?: string;
};

export async function createEvent(input: EventInput): Promise<string> {
  const collection = await eventsCollection();
  const result = await collection.insertOne({
    ...input,
    event_date: new Date(input.event_date),
    end_date: input.end_date ? new Date(input.end_date) : undefined,
    created_at: new Date(),
  });
  updateTag("events");
  return result.insertedId.toString();
}

export async function updateEvent(id: string, input: EventInput): Promise<boolean> {
  const collection = await eventsCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...input,
        event_date: new Date(input.event_date),
        end_date: input.end_date ? new Date(input.end_date) : undefined,
      },
    },
  );
  updateTag("events");
  return result.matchedCount > 0;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const collection = await eventsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  updateTag("events");
  return result.deletedCount > 0;
}
