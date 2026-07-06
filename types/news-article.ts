import type { ObjectId } from "mongodb";

export type NewsArticleStatus = "draft" | "published";

export interface NewsArticle {
  _id?: ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  featured_image_url?: string;
  author_id?: ObjectId;
  category: string;
  tags: string[];
  status: NewsArticleStatus;
  is_featured: boolean;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}
