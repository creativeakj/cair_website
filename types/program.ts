import type { ObjectId } from "mongodb";

export interface Program {
  _id?: ObjectId;
  slug: string;
  number: number;
  title: string;
  description: string;
  signature_work: string[];
  display_order: number;
}
