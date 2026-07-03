import type { ObjectId } from "mongodb";

export type SubscriberStatus = "active" | "unsubscribed";

export interface Subscriber {
  _id?: ObjectId;
  email: string;
  status: SubscriberStatus;
  subscribed_at: Date;
  source: string;
}
