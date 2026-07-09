import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}
const dbName = process.env.MONGODB_DB ?? "cair";

function textToHtml(text) {
  return text
    .split("\n\n")
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");
}

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
    description: textToHtml("From Votes to Value: Rebuilding Trust & Confidence to Get Our Democracy Right in 2027. Convened by The Unifiers Movement (TUM) in collaboration with CAIR."),
    image_url: "/images/hero.jpg",
    event_date: new Date("2026-10-01T10:00:00+01:00"),
    location: "Abuja, Nigeria (venue TBA)",
    type: "in-person",
    category: "Diplomacy",
    status: "registration-open",
    is_featured: true,
    partner_logos: PARTNER_LOGOS,
  },
  {
    slug: "africa-america-policy-forum-2026",
    title: "Africa–America Policy Forum 2026",
    description: textToHtml("Two days of dialogue with diplomats, scholars, and business leaders on trade, peace, and the next chapter of Africa–America cooperation."),
    image_url: "/images/dialogue.jpg",
    event_date: new Date("2026-09-24T09:00:00-04:00"),
    end_date: new Date("2026-09-25T17:00:00-04:00"),
    location: "Lansing, Michigan · USA",
    type: "hybrid",
    category: "Diplomacy",
    status: "registration-open",
    is_featured: false,
    partner_logos: [],
    meeting_link: "https://zoom.us/j/1234567890",
  },
  {
    slug: "afcfta-trade-roundtable",
    title: "AfCFTA Trade & Investment Roundtable",
    description: textToHtml("Practitioner-led conversation on unlocking cross-border supply chains under the African Continental Free Trade Area."),
    image_url: "/images/africa-city.jpg",
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
    description: textToHtml("Meet the program directors and past fellows. Q&A on eligibility, curriculum, and the 2026 cohort timeline."),
    image_url: "/images/place-zanzibar.jpg",
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
    description: textToHtml("Closed-door analyst briefing on security dynamics across the Sahel and implications for diaspora communities."),
    image_url: "/images/place-kilimanjaro.jpg",
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
    description: textToHtml("Inaugural symposium presenting CAIR working papers on migration, capital flows, and the African knowledge economy."),
    image_url: "/images/place-marrakech.jpg",
    event_date: new Date("2025-11-14T09:00:00-05:00"),
    location: "Washington, D.C.",
    type: "in-person",
    category: "Research",
    status: "past",
    is_featured: false,
    partner_logos: [],
  },
];

const PUBLICATIONS = [
  {
    slug: "afcfta-outlook-2026",
    title: "AfCFTA Outlook 2026: Momentum, Bottlenecks, and the Diaspora Dividend",
    summary: "An assessment of the African Continental Free Trade Area's progress and the role of the diaspora in unlocking cross-border commerce.",
    abstract: textToHtml("This report examines implementation progress under the African Continental Free Trade Area (AfCFTA) through early 2026, identifying persistent bottlenecks in customs harmonization and logistics, and quantifying the growing role of diaspora-linked capital and trade facilitation. It closes with policy recommendations for African Union member states and diaspora-serving institutions."),
    authors: ["CAIR Research Unit"],
    category: "Research",
    file_url: "/files/publications/afcfta-outlook-2026.pdf",
    published_date: new Date("2026-03-01T00:00:00Z"),
    year: 2026,
    is_featured: true,
    download_count: 0,
  },
  {
    slug: "diaspora-remittance-policy-brief",
    title: "Diaspora Remittances as Development Capital: A Policy Brief",
    summary: "Policy recommendations for channeling diaspora remittances into structured development financing.",
    abstract: textToHtml("Remittances from the African diaspora in North America exceed official development assistance to the continent in most years. This brief proposes three policy mechanisms — diaspora bonds, matched savings programs, and remittance-backed credit facilities — that could convert a portion of these flows into long-term development capital."),
    authors: ["Dr. Echo Emmanuel Ogbenjuwa"],
    category: "Policy",
    file_url: "/files/publications/diaspora-remittance-policy-brief.pdf",
    published_date: new Date("2026-01-15T00:00:00Z"),
    year: 2026,
    is_featured: false,
    download_count: 0,
  },
  {
    slug: "peace-security-sahel-report-2025",
    title: "Peace and Security in the Sahel: 2025 Annual Report",
    summary: "CAIR's annual assessment of security dynamics across the Sahel and implications for regional stability.",
    abstract: textToHtml("Drawing on closed-door briefings and open-source analysis, this annual report reviews conflict trends, humanitarian access, and multilateral responses across the Sahel region in 2025, with a dedicated section on diaspora community impact."),
    authors: ["Dr. Kwame Asante"],
    category: "Report",
    file_url: "/files/publications/peace-security-sahel-report-2025.pdf",
    published_date: new Date("2025-12-10T00:00:00Z"),
    year: 2025,
    is_featured: false,
    download_count: 0,
  },
  {
    slug: "africa-america-trade-data-2025",
    title: "Africa–America Trade Flows: 2025 Data Digest",
    summary: "A statistical digest of bilateral trade volumes between African markets and the United States in 2025.",
    abstract: textToHtml("This data digest compiles bilateral trade statistics between African Union member states and the United States for calendar year 2025, sourced from public customs and trade-office data, with sector breakdowns for agriculture, textiles, and critical minerals."),
    authors: ["CAIR Research Unit"],
    category: "Data",
    file_url: "/files/publications/africa-america-trade-data-2025.pdf",
    published_date: new Date("2025-10-05T00:00:00Z"),
    year: 2025,
    is_featured: false,
    download_count: 0,
  },
  {
    slug: "youth-diplomacy-fellowship-outcomes",
    title: "Youth Diplomacy Fellowship: Outcomes & Alumni Impact",
    summary: "A review of the first three cohorts of CAIR's Youth Diplomacy Fellowship and where alumni are now.",
    abstract: textToHtml("This review surveys alumni of CAIR's Youth Diplomacy Fellowship across its first three cohorts, documenting placement outcomes, ongoing civic engagement, and recommendations for scaling the program to additional countries."),
    authors: ["Ms. Aïcha Diallo"],
    category: "Other",
    file_url: "/files/publications/youth-diplomacy-fellowship-outcomes.pdf",
    published_date: new Date("2025-08-20T00:00:00Z"),
    year: 2025,
    is_featured: false,
    download_count: 0,
  },
];

const NEWS_ARTICLES = [
  {
    slug: "cair-launches-publications-library",
    title: "CAIR Launches Its Research & Publications Library",
    excerpt: "The Center opens a searchable library of policy briefs, reports, and data digests to the public.",
    body_html: textToHtml("CAIR is pleased to announce the launch of its Research & Publications library, a searchable collection of policy briefs, annual reports, and data digests produced by our Research Unit, fellows, and advisors.\n\nThe library is organized by category — Policy, Research, Report, and Data — and is filterable by year. Each publication is available as a free PDF download.\n\nWe view this as a core part of our mandate: independent, evidence-led analysis should be available to the policy makers, scholars, and civil society leaders who need it, not locked behind institutional walls."),
    category: "Announcements",
    tags: ["publications", "research"],
    status: "published",
    is_featured: true,
    authorSlug: "olatunbosun-williams",
    published_at: new Date("2026-03-02T09:00:00-04:00"),
  },
  {
    slug: "democratic-national-dialogue-registration-open",
    title: "Registration Opens for the Democratic National Dialogue",
    excerpt: "CAIR and The Unifiers Movement open registration for the October 2026 Democratic National Dialogue in Abuja.",
    body_html: textToHtml("Registration is now open for the Democratic National Dialogue (DnD), convened by The Unifiers Movement (TUM) in collaboration with CAIR and the GABA Foundation.\n\nThemed 'From Votes to Value: Rebuilding Trust & Confidence to Get Our Democracy Right in 2027,' the convening will bring together civic leaders, diplomats, and youth organizers in Abuja this October.\n\nMembers interested in attending should register through the Membership page; details on the venue will follow as they are confirmed."),
    category: "Events",
    tags: ["events", "diplomacy"],
    status: "published",
    is_featured: false,
    authorSlug: "echo-mary-ocholongwa",
    published_at: new Date("2026-02-18T10:00:00-04:00"),
  },
  {
    slug: "afcfta-roundtable-recap",
    title: "Recap: AfCFTA Trade & Investment Roundtable in Abuja",
    excerpt: "Practitioners gathered in Abuja to discuss unlocking cross-border supply chains under the AfCFTA.",
    body_html: textToHtml("Last month's AfCFTA Trade & Investment Roundtable brought together logistics operators, customs officials, and investors to discuss practical barriers to cross-border trade under the African Continental Free Trade Area.\n\nKey themes included customs harmonization delays, the financing gap for small and mid-sized exporters, and the opportunity for diaspora-linked capital to fill it. A full summary is available in our AfCFTA Outlook 2026 publication."),
    category: "Trade & Investment",
    tags: ["trade", "afcfta"],
    status: "published",
    is_featured: false,
    authorSlug: "ade-okonkwo",
    published_at: new Date("2026-01-28T14:00:00+01:00"),
  },
  {
    slug: "cair-welcomes-new-fellows-2026",
    title: "CAIR Welcomes Its 2026 Class of Fellows",
    excerpt: "Six new fellows join CAIR's Peace & Security, Research, and Youth Diplomacy programs.",
    body_html: textToHtml("CAIR is proud to welcome its 2026 class of fellows across the Peace & Security, Research & Publications, and Youth Diplomacy programs. This cohort brings expertise spanning conflict analysis, trade policy, and civic technology.\n\nFellows will spend the year contributing to CAIR's research output and program delivery, with a closing symposium planned for late 2026."),
    category: "Announcements",
    tags: ["fellowship", "announcements"],
    status: "published",
    is_featured: false,
    authorSlug: "echo-emmanuel-ogbenjuwa",
    published_at: new Date("2026-01-10T09:00:00-04:00"),
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
    meeting_link: e.meeting_link ?? null,
  })));
  const publicationsCount = await upsertAll(db.collection("publications"), PUBLICATIONS);

  const teamDocs = await db.collection("team_members").find({}).toArray();
  const idBySlug = new Map(teamDocs.map((t) => [t.slug, t._id]));
  const newsCount = await upsertAll(
    db.collection("news_articles"),
    NEWS_ARTICLES.map(({ authorSlug, ...rest }) => ({
      ...rest,
      author_id: idBySlug.get(authorSlug) ?? null,
      updated_at: new Date(),
    })),
  );

  console.log(
    `Seeded: ${teamCount} team members, ${programsCount} programs, ${merchCount} merch items, ${eventsCount} events, ${publicationsCount} publications, ${newsCount} news articles`,
  );

  await client.close();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
