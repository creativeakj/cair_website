import type { ObjectId } from "mongodb";

export interface MerchEnquiry {
  _id?: ObjectId;
  product_slug: string;
  product_name: string;
  name: string;
  email: string;
  message?: string;
  created_at: Date;
  is_read: boolean;
}
