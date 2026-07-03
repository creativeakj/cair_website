import type { ObjectId } from "mongodb";

export interface Contact {
  _id?: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  source_page: string;
  created_at: Date;
  is_read: boolean;
}
