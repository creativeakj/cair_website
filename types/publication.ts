import type { ObjectId } from "mongodb";

export type PublicationCategory = "Policy" | "Research" | "Report" | "Data" | "Other";

export interface Publication {
  _id?: ObjectId;
  slug: string;
  title: string;
  summary: string;
  abstract: string;
  authors: string[];
  category: PublicationCategory;
  file_url: string;
  cover_image_url?: string;
  published_date: Date;
  year: number;
  is_featured: boolean;
  download_count: number;
  created_at: Date;
}
