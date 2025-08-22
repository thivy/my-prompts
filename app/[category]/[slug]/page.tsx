import Callout from "@/components/callout";
import { ContentContainer } from "@/components/content-container";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { HeaderHeroImage } from "@/components/header-hero-image";
import {
  getAllCategories,
  getPrompt,
  getPromptsByCategory,
  toImagePath,
} from "@/lib/content";
import { renderMarkdoc } from "@/lib/markdoc";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().flatMap((c) =>
    getPromptsByCategory(c.slug).map((p) => ({
      category: c.slug,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const data = getPrompt(category, slug);

  if (!data) {
    return {
      title: "Prompt Not Found",
      description: "The requested AI prompt could not be found.",
    };
  }

  const { meta } = data;
  const categoryName =
    getAllCategories().find((c) => c.slug === category)?.name || category;

  // Create compelling meta description from prompt data
  const description = meta.description
    ? meta.description.length > 155
      ? `${meta.description.substring(0, 152)}...`
      : meta.description
    : `Discover ${meta.title} AI prompt in the ${categoryName} category. Professional techniques and tips for creating stunning AI-generated art.`;

  return {
    title: meta.title,
    description,
    keywords: [
      "AI prompt",
      meta.title.toLowerCase(),
      categoryName.toLowerCase(),
      "AI art",
      "digital art",
      "AI generated",
      "creative prompts",
      ...(category === "3d" ? ["3D rendering", "3D art", "modeling"] : []),
      ...(category === "characters"
        ? ["character design", "portrait", "character art"]
        : []),
    ],
    openGraph: {
      title: meta.title,
      description,
      type: "article",
      url: `/${category}/${slug}`,
      images:
        meta.images.length > 0
          ? [
              {
                url: meta.images[0],
                width: 1200,
                height: 630,
                alt: meta.title,
              },
            ]
          : [],
      tags: [categoryName, "AI prompt", "AI art"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
      images: meta.images.length > 0 ? [meta.images[0]] : [],
    },
    alternates: {
      canonical: `/${category}/${slug}`,
    },
  };
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const data = getPrompt(category, slug);
  if (!data) return notFound();
  const { meta, body } = data;
  const mdComponents = { Callout } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: meta.title,
            description: meta.description,
            creator: {
              "@type": "Organization",
              name: "PIXELPrompt",
            },
            category: category,
            keywords: [
              meta.title,
              category,
              "AI prompt",
              "AI art",
              "digital art",
            ],
            image: meta.images.length > 0 ? meta.images : undefined,
            url: `/${category}/${slug}`,
            datePublished: new Date().toISOString(),
            inLanguage: "en-US",
            isAccessibleForFree: true,
            publisher: {
              "@type": "Organization",
              name: "PIXELPrompt",
              url: "/",
            },
          }),
        }}
      />
      <div className="space-y-12 ">
        <ContentContainer className="space-y-6 text-xl leading-relaxed font-medium">
          <HeaderHeroImage
            imageUrl={toImagePath(meta.cover)}
            description={meta.description}
          />
          <h1 className="font-semibold tracking-tight text-6xl">
            {meta.title}
          </h1>
          <CopyPromptButton text={body} />

          {renderMarkdoc(body, mdComponents)}
        </ContentContainer>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
          {meta.images.map((src, i) => (
            <Image
              key={i}
              src={toImagePath(src)}
              alt={`${meta.title} sample ${i + 1}`}
              unoptimized
              width={600}
              height={600}
              className="object-contain rounded-xl shadow-2xl"
            />
          ))}
        </div>
      </div>
    </>
  );
}
