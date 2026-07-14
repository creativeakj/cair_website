import { getDb } from "@/lib/db/mongodb";
import type { Publication } from "@/types/publication";
import type { NewsArticle } from "@/types/news-article";
import type { CairEvent } from "@/types/event";
import type { TeamMember } from "@/types/team-member";
import type { MerchItem } from "@/types/merch-item";
import type { Contact } from "@/types/contact";
import type { Subscriber } from "@/types/subscriber";
import type { Program } from "@/types/program";
import type { AdminUser } from "@/types/admin-user";
import type { MerchEnquiry } from "@/types/merch-enquiry";
import type { EventRegistration } from "@/types/event-registration";
import type { DonationEnquiry } from "@/types/donation-enquiry";

export async function publicationsCollection() {
  const db = await getDb();
  return db.collection<Publication>("publications");
}

export async function newsArticlesCollection() {
  const db = await getDb();
  return db.collection<NewsArticle>("news_articles");
}

export async function eventsCollection() {
  const db = await getDb();
  return db.collection<CairEvent>("events");
}

export async function teamMembersCollection() {
  const db = await getDb();
  return db.collection<TeamMember>("team_members");
}

export async function merchItemsCollection() {
  const db = await getDb();
  return db.collection<MerchItem>("merch_items");
}

export async function contactsCollection() {
  const db = await getDb();
  return db.collection<Contact>("contacts");
}

export async function subscribersCollection() {
  const db = await getDb();
  return db.collection<Subscriber>("subscribers");
}

export async function programsCollection() {
  const db = await getDb();
  return db.collection<Program>("programs");
}

export async function adminUsersCollection() {
  const db = await getDb();
  return db.collection<AdminUser>("admin_users");
}

export async function merchEnquiriesCollection() {
  const db = await getDb();
  return db.collection<MerchEnquiry>("merch_enquiries");
}

export async function eventRegistrationsCollection() {
  const db = await getDb();
  return db.collection<EventRegistration>("event_registrations");
}

export async function donationEnquiriesCollection() {
  const db = await getDb();
  return db.collection<DonationEnquiry>("donation_enquiries");
}
