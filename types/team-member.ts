import type { ObjectId } from "mongodb";

export interface TeamMember {
  _id?: ObjectId;
  slug: string;
  name: string;
  title: string;
  department: string;
  bio: string;
  photo_url?: string;
  display_order: number;
  is_active: boolean;
}
