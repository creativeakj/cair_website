import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/PageHeader";
import { MerchItem } from "@/components/sections/MerchItem";
import { getAvailableMerchItems } from "@/lib/services/merch";

export const metadata: Metadata = {
  title: "Merch",
  description: "Official CAIR merchandise: polos, totes, and caps featuring the Center for African International Relations brand.",
  openGraph: {
    title: "CAIR Merch",
    description: "Wear the mission. Official CAIR polos, totes, and caps.",
  },
};

export default async function MerchPage() {
  const items = await getAvailableMerchItems();

  return (
    <>
      <PageHeader
        eyebrow="The CAIR Shop"
        title={<>Wear the <span className="text-[var(--gold)]">mission.</span></>}
        lede="Limited-run apparel and accessories carrying the CAIR mark — designed for members, fellows, and friends of the Center. Proceeds support our programs."
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MerchItem
              key={item.id}
              item={{
                slug: item.slug,
                name: item.name,
                category: item.category,
                image: item.image_url[0] ?? "/images/merch/polo-ivory.jpg",
              }}
            />
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
