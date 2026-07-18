import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHeader, Section } from "@/components/PageHeader";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { ShareButtons } from "@/components/sections/ShareButtons";
import { RelatedItems } from "@/components/sections/RelatedItems";
import { PublicationDownloadButton } from "@/components/sections/PublicationDownloadButton";
import { getPublicationBySlug, getPublications, getRelatedPublications } from "@/lib/services/publications";
import { cloudinaryFill } from "@/lib/utils";

export async function generateStaticParams() {
  const publications = await getPublications();
  if (publications.length === 0) return [{ slug: "_placeholder" }];
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);
  if (!publication) return {};

  return {
    title: publication.title,
    description: publication.summary,
    openGraph: {
      title: publication.title,
      description: publication.summary,
      type: "article",
      images: publication.cover_image_url ? [cloudinaryFill(publication.cover_image_url, 1200, 630)] : undefined,
    },
  };
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);
  if (!publication) notFound();

  const related = await getRelatedPublications(slug, publication.category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${siteUrl}/publications/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: publication.title,
    author: publication.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: publication.published_date,
    url,
    description: publication.summary,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        eyebrow={`${publication.category} · ${new Date(publication.published_date).getFullYear()}`}
        title={publication.title}
        lede={publication.summary}
      />
      {publication.cover_image_url && (
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image src={cloudinaryFill(publication.cover_image_url, 1600, 686)} alt={publication.title} fill sizes="100vw" priority className="object-cover" />
        </div>
      )}
      <Section className="max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-8">
          <div className="text-sm text-foreground/70">
            <span className="font-medium text-[var(--forest-deep)]">{publication.authors.join(", ")}</span>
            <span className="mx-2">·</span>
            {new Date(publication.published_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <ShareButtons url={url} title={publication.title} />
        </div>

        <ArticleBody html={publication.abstract} />

        <div className="mt-10">
          <PublicationDownloadButton slug={publication.slug} fileUrl={publication.file_url} />
        </div>

        <div className="mt-16">
          <RelatedItems
            heading="Related Publications"
            basePath="/publications"
            items={related.map((p) => ({ slug: p.slug, title: p.title, meta: p.category }))}
          />
        </div>
      </Section>
    </>
  );
}
