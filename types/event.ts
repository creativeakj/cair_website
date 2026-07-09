import type { ObjectId } from "mongodb";

export type EventFormat = "in-person" | "virtual" | "hybrid";
export type EventStatus = "upcoming" | "registration-open" | "past";

export interface CairEvent {
  _id?: ObjectId;
  slug: string;
  title: string;
  description: string;
  image_url?: string;
  event_date: Date;
  end_date?: Date;
  location: string;
  type: EventFormat;
  category: string;
  status: EventStatus;
  is_featured: boolean;
  partner_logos: string[];
  meeting_link?: string;
  created_at: Date;
}
