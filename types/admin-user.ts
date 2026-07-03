import type { ObjectId } from "mongodb";

export interface AdminUser {
  _id?: ObjectId;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
}
