import type { ObjectId } from "mongodb";

export interface EventRegistration {
  _id?: ObjectId;
  event_id: string;
  event_slug: string;
  event_title: string;
  name: string;
  email: string;
  organization?: string;
  message?: string;
  created_at: Date;
}
