import type { ObjectId } from "mongodb";

export interface DonationEnquiry {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  amount?: string;
  message?: string;
  created_at: Date;
  is_read: boolean;
}
