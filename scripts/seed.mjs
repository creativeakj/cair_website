import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}
const dbName = process.env.MONGODB_DB ?? "cair";

const TEAM_MEMBERS = [
  {
    slug: "olatunbosun-williams",
    name: "Mr. Olatunbosun Williams",
    title: "Chairman & President",
    department: "Executive",
    bio: "Founder of CAIR. Two decades of work across diaspora policy, civic infrastructure, and Africa–America institution-building. Based between Lansing, MI and Abuja, NG.",
    display_order: 1,
    is_active: true,
  },
  {
    slug: "echo-emmanuel-ogbenjuwa",
    name: "Dr. Echo Emmanuel Ogbenjuwa",
    title: "Vice Chairman",
    department: "Executive",
    bio: "Academic and practitioner bridging governance research with on-the-ground diplomatic engagement across West and Central Africa. Based in Washington, D.C.",
    display_order: 2,
    is_active: true,
  },
  {
    slug: "echo-mary-ocholongwa",
    name: "Mrs. Echo Mary Ocholongwa",
    title: "Secretary",
    department: "Executive",
    bio: "Operations and institutional design lead, responsible for the constitutional integrity and member-facing programs of CAIR. Based in Abuja, Nigeria.",
    display_order: 3,
    is_active: true,
  },
  {
    slug: "omolara-williams",
    name: "Ambassador Omolara Williams",
    title: "Treasurer",
    department: "Executive",
    bio: "Career diplomat with deep financial stewardship experience across multilateral institutions and pan-African initiatives. Based in Lansing, Michigan.",
    display_order: 4,
    is_active: true,
  },
  {
    slug: "ade-okonkwo",
    name: "Prof. Ade Okonkwo",
    title: "Senior Advisor · Trade & AfCFTA",
    department: "Advisory Council",
    bio: "Advises CAIR on trade policy and AfCFTA implementation. Based in Accra, Ghana.",
    display_order: 5,
    is_active: true,
  },
  {
    slug: "linda-carter",
    name: "Hon. Linda Carter",
    title: "Senior Advisor · U.S. Policy",
    department: "Advisory Council",
    bio: "Advises CAIR on U.S. policy engagement. Based in Detroit, Michigan.",
    display_order: 6,
    is_active: true,
  },
  {
    slug: "kwame-asante",
    name: "Dr. Kwame Asante",
    title: "Fellow · Peace & Security",
    department: "Advisory Council",
    bio: "Fellow supporting CAIR's peace and security research. Based in Nairobi, Kenya.",
    display_order: 7,
    is_active: true,
  },
  {
    slug: "aicha-diallo",
    name: "Ms. Aïcha Diallo",
    title: "Fellow · Youth Diplomacy",
    department: "Advisory Council",
    bio: "Fellow leading CAIR's youth diplomacy initiatives. Based in Dakar, Senegal.",
    display_order: 8,
    is_active: true,
  },
  {
    slug: "samuel-mensah",
    name: "Dr. Samuel Mensah",
    title: "Fellow · Research & Publications",
    department: "Advisory Council",
    bio: "Fellow contributing to CAIR's research and publications program. Based in Boston, Massachusetts.",
    display_order: 9,
    is_active: true,
  },
  {
    slug: "zainab-bello",
    name: "Mrs. Zainab Bello",
    title: "Advisor · Diaspora Engagement",
    department: "Advisory Council",
    bio: "Advises CAIR on diaspora engagement strategy. Based in London, UK.",
    display_order: 10,
    is_active: true,
  },
];

const PROGRAMS = [
  {
    slug: "diplomacy-governance",
    number: 1,
    title: "Diplomacy & Governance",
    description: "Convene heads of mission, parliamentarians, and policy makers. Strengthen democratic institutions through structured dialogue and exchange.",
    signature_work: ["Track-II dialogues", "Policy roundtables", "Governance fellowships"],
    display_order: 1,
  },
  {
    slug: "trade-investment",
    number: 2,
    title: "Trade & Investment",
    description: "Open pathways for inclusive commerce and capital flows between African and American markets, and with allied nations.",
    signature_work: ["Investor convenings", "Market intelligence", "Public-private partnerships"],
    display_order: 2,
  },
  {
    slug: "peace-security",
    number: 3,
    title: "Peace & Security",
    description: "Support cooperation on conflict prevention, post-conflict recovery, and regional stability across the Atlantic basin.",
    signature_work: ["Track-II mediation", "Security forums", "Research briefings"],
    display_order: 3,
  },
  {
    slug: "education-cultural-exchange",
    number: 4,
    title: "Education & Cultural Exchange",
    description: "Advance scholarly mobility, cultural understanding, and shared educational programs that bind communities together.",
    signature_work: ["Visiting fellows", "Cultural festivals", "Curriculum exchange"],
    display_order: 4,
  },
  {
    slug: "research-policy",
    number: 5,
    title: "Research & Policy",
    description: "Independent, evidence-led analysis to inform decision makers and the public on the issues shaping Africa–America relations.",
    signature_work: ["Policy papers", "Annual outlooks", "Data dashboards"],
    display_order: 5,
  },
];

const MERCH_ITEMS = [
  { slug: "heritage-polo-ivory", name: "Heritage Polo — Ivory", category: "Apparel · Polo", description: "Classic ivory polo with the CAIR mark.", image_url: ["/images/merch/polo-ivory.jpg"], is_available: true, display_order: 1 },
  { slug: "continental-polo-teal", name: "Continental Polo — Teal", category: "Apparel · Polo", description: "Signature teal polo with white collar.", image_url: ["/images/merch/polo-teal.jpg"], is_available: true, display_order: 2 },
  { slug: "diplomat-polo-navy", name: "Diplomat Polo — Navy", category: "Apparel · Polo", description: "Navy polo with the CAIR mark.", image_url: ["/images/merch/polo-navy.jpg"], is_available: true, display_order: 3 },
  { slug: "contrast-polo-ivory-teal", name: "Contrast Polo — Ivory / Teal", category: "Apparel · Polo", description: "Ivory polo with a contrast teal collar.", image_url: ["/images/merch/polo-ivory-teal.jpg"], is_available: true, display_order: 4 },
  { slug: "contrast-polo-navy-teal", name: "Contrast Polo — Navy / Teal", category: "Apparel · Polo", description: "Navy polo with a contrast teal collar.", image_url: ["/images/merch/polo-navy-teal.jpg"], is_available: true, display_order: 5 },
  { slug: "signature-tote-teal", name: "Signature Tote — Teal", category: "Accessories · Tote", description: "Durable teal canvas tote with the CAIR mark.", image_url: ["/images/merch/tote-teal.jpg"], is_available: true, display_order: 6 },
  { slug: "signature-tote-navy", name: "Signature Tote — Navy", category: "Accessories · Tote", description: "Durable navy canvas tote with the CAIR mark.", image_url: ["/images/merch/tote-navy.jpg"], is_available: true, display_order: 7 },
  { slug: "field-cap-teal", name: "Field Cap — Teal", category: "Headwear · Cap", description: "Teal field cap with embroidered mark.", image_url: ["/images/merch/cap-teal.jpg"], is_available: true, display_order: 8 },
  { slug: "field-cap-stone", name: "Field Cap — Stone", category: "Headwear · Cap", description: "Stone field cap with embroidered mark.", image_url: ["/images/merch/cap-stone.jpg"], is_available: true, display_order: 9 },
];

const PARTNER_LOGOS = [
  "/images/partners/tum-logo.jpg",
  "/images/partners/gaba-logo.jpg",
  "/images/partners/cair-logo.jpg",
];

const EVENTS = [
  {
    slug: "democratic-national-dialogue-2026",
    title: "Democratic National Dialogue (DnD)",
    description: "From Votes to Value: Rebuilding Trust & Confidence to Get Our Democracy Right in 2027. Convened by The Unifiers Movement (TUM) in collaboration with CAIR.",
    event_date: new Date("2026-10-01T10:00:00+01:00"),
    location: "Abuja, Nigeria (venue TBA)",
    type: "in-person",
    category: "Diplomacy",
    status: "registration-open",
    is_featured: true,
    partner_logos: PARTNER_LOGOS,
    registration_url: "/membership",
  },
  {
    slug: "africa-america-policy-forum-2026",
    title: "Africa–America Policy Forum 2026",
    description: "Two days of dialogue with diplomats, scholars, and business leaders on trade, peace, and the next chapter of Africa–America cooperation.",
    event_date: new Date("2026-09-24T09:00:00-04:00"),
    end_date: new Date("2026-09-25T17:00:00-04:00"),
    location: "Lansing, Michigan · USA",
    type: "hybrid",
    category: "Diplomacy",
    status: "registration-open",
    is_featured: false,
    partner_logos: [],
    registration_url: "/membership",
  },
  {
    slug: "afcfta-trade-roundtable",
    title: "AfCFTA Trade & Investment Roundtable",
    description: "Practitioner-led conversation on unlocking cross-border supply chains under the African Continental Free Trade Area.",
    event_date: new Date("2026-07-18T14:00:00+01:00"),
    location: "Abuja, Nigeria",
    type: "in-person",
    category: "Trade & Investment",
    status: "upcoming",
    is_featured: false,
    partner_logos: [],
  },
  {
    slug: "youth-diplomacy-fellowship-info",
    title: "Youth Diplomacy Fellowship — Info Session",
    description: "Meet the program directors and past fellows. Q&A on eligibility, curriculum, and the 2026 cohort timeline.",
    event_date: new Date("2026-07-02T17:00:00-04:00"),
    location: "Virtual · Zoom",
    type: "virtual",
    category: "Education",
    status: "registration-open",
    is_featured: false,
    partner_logos: [],
  },
  {
    slug: "peace-security-briefing",
    title: "Peace & Security Briefing: Sahel Outlook",
    description: "Closed-door analyst briefing on security dynamics across the Sahel and implications for diaspora communities.",
    event_date: new Date("2026-06-26T11:00:00-04:00"),
    location: "Virtual · Zoom",
    type: "virtual",
    category: "Peace & Security",
    status: "upcoming",
    is_featured: false,
    partner_logos: [],
  },
  {
    slug: "research-symposium-2025",
    title: "Annual Research Symposium 2025",
    description: "Inaugural symposium presenting CAIR working papers on migration, capital flows, and the African knowledge economy.",
    event_date: new Date("2025-11-14T09:00:00-05:00"),
    location: "Washington, D.C.",
    type: "in-person",
    category: "Research",
    status: "past",
    is_featured: false,
    partner_logos: [],
  },
];

async function upsertAll(collection, docs, extra = {}) {
  let count = 0;
  for (const doc of docs) {
    await collection.updateOne(
      { slug: doc.slug },
      { $set: { ...doc, ...extra }, $setOnInsert: { created_at: new Date() } },
      { upsert: true },
    );
    count++;
  }
  return count;
}

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const teamCount = await upsertAll(db.collection("team_members"), TEAM_MEMBERS);
  const programsCount = await upsertAll(db.collection("programs"), PROGRAMS);
  const merchCount = await upsertAll(db.collection("merch_items"), MERCH_ITEMS);
  const eventsCount = await upsertAll(db.collection("events"), EVENTS.map((e) => ({
    ...e,
    end_date: e.end_date ?? null,
    registration_url: e.registration_url ?? null,
  })));

  console.log(`Seeded: ${teamCount} team members, ${programsCount} programs, ${merchCount} merch items, ${eventsCount} events`);

  await client.close();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
