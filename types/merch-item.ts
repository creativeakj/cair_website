import type { ObjectId } from "mongodb";

export interface MerchItem {
  _id?: ObjectId;
  slug: string;
  name: string;
  category: string;
  description: string;
  image_url: string[];
  is_available: boolean;
  display_order: number;
}
