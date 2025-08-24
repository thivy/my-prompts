import { getAllCategories, getPrompt } from "@/lib/content";
import type { Metadata } from "next";

export function generateCategoryMetadata({
  category,
  slug,
}: {
  category: string;
  slug: string;
}): Metadata {
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
