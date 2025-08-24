import { getAllCategories, getPromptsByCategory } from "@/lib/content";
import type { Metadata } from "next";

export function generateCategoriesMetadata({
  category,
}: {
  category: string;
}): Metadata {
  const allCategories = getAllCategories();
  const currentCategory = allCategories.find((c) => c.slug === category);

  if (!currentCategory) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  const prompts = getPromptsByCategory(category);
  const promptCount = prompts.length;

  const categoryDescriptions: Record<string, string> = {
    "3d": "Explore professional 3D AI prompts for creating stunning three-dimensional art, renders, and models. Perfect for artists working with 3D visualization and modeling.",
    characters:
      "Discover character design AI prompts for creating compelling portraits, character art, and personality-driven visuals. Ideal for character artists and designers.",
  };

  const description =
    categoryDescriptions[category] ||
    `Browse ${promptCount} AI prompts in the ${currentCategory.name} category. Discover professional techniques and creative ideas for AI-generated art.`;

  return {
    title: `${currentCategory.name} AI Prompts`,
    description,
    keywords: [
      `${currentCategory.name} AI prompts`,
      `${category} AI art`,
      "AI prompts collection",
      "digital art prompts",
      "AI generated art",
      ...(category === "3d"
        ? ["3D rendering", "3D modeling", "3D art", "three dimensional"]
        : []),
      ...(category === "characters"
        ? ["character design", "portrait art", "character creation"]
        : []),
    ],
    openGraph: {
      title: `${currentCategory.name} AI Prompts | PIXELPrompt`,
      description,
      type: "website",
      url: `/categories/${category}`,
      images:
        prompts.length > 0 && prompts[0].images.length > 0
          ? [
              {
                url: prompts[0].images[0],
                width: 1200,
                height: 630,
                alt: `${currentCategory.name} AI Prompts`,
              },
            ]
          : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${currentCategory.name} AI Prompts | PIXELPrompt`,
      description,
      images:
        prompts.length > 0 && prompts[0].images.length > 0
          ? [prompts[0].images[0]]
          : [],
    },
    alternates: {
      canonical: `/categories/${category}`,
    },
  };
}
