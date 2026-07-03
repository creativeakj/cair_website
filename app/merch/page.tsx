import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/PageHeader";
import { MerchItem, type MerchItemData } from "@/components/sections/MerchItem";

export const metadata: Metadata = {
  title: "Merch",
  description: "Official CAIR merchandise: polos, totes, and caps featuring the Center for African International Relations brand.",
  openGraph: {
    title: "CAIR Merch",
    description: "Wear the mission. Official CAIR polos, totes, and caps.",
  },
};

const ITEMS: MerchItemData[] = [
  { slug: "heritage-polo-ivory", name: "Heritage Polo — Ivory", category: "Apparel · Polo", categoryLabel: "Polo", image: "/images/merch/polo-ivory.jpg" },
  { slug: "continental-polo-teal", name: "Continental Polo — Teal", category: "Apparel · Polo", categoryLabel: "Polo", image: "/images/merch/polo-teal.jpg" },
  { slug: "diplomat-polo-navy", name: "Diplomat Polo — Navy", category: "Apparel · Polo", categoryLabel: "Polo", image: "/images/merch/polo-navy.jpg" },
  { slug: "contrast-polo-ivory-teal", name: "Contrast Polo — Ivory / Teal", category: "Apparel · Polo", categoryLabel: "Polo", image: "/images/merch/polo-ivory-teal.jpg" },
  { slug: "contrast-polo-navy-teal", name: "Contrast Polo — Navy / Teal", category: "Apparel · Polo", categoryLabel: "Polo", image: "/images/merch/polo-navy-teal.jpg" },
  { slug: "signature-tote-teal", name: "Signature Tote — Teal", category: "Accessories · Tote", categoryLabel: "Tote", image: "/images/merch/tote-teal.jpg" },
  { slug: "signature-tote-navy", name: "Signature Tote — Navy", category: "Accessories · Tote", categoryLabel: "Tote", image: "/images/merch/tote-navy.jpg" },
  { slug: "field-cap-teal", name: "Field Cap — Teal", category: "Headwear · Cap", categoryLabel: "Cap", image: "/images/merch/cap-teal.jpg" },
  { slug: "field-cap-stone", name: "Field Cap — Stone", category: "Headwear · Cap", categoryLabel: "Cap", image: "/images/merch/cap-stone.jpg" },
];

export default function MerchPage() {
  return (
    <>
      <PageHeader
        eyebrow="The CAIR Shop"
        title={<>Wear the <span className="text-[var(--gold)]">mission.</span></>}
        lede="Limited-run apparel and accessories carrying the CAIR mark — designed for members, fellows, and friends of the Center. Proceeds support our programs."
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <MerchItem key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <section className="bg-[var(--forest-deep)] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow">Bulk & Chapter Orders</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Outfit your delegation, chapter, or event.
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              Custom sizing, embroidery, and co-branded runs available for member institutions and partner organizations. Reach out to coordinate quantities and timelines.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link
              href="/contact"
              className="rounded-sm bg-[var(--gold)] px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--forest-deep)]"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
