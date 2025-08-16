import { CategoryScroll } from "@/components/category-scroll";
import {
  getAllCategories,
  getFeaturedPrompts,
  getPromptsByCategory,
} from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PIXELPrompt - Discover AI Visual Prompts & Techniques",
  description:
    "Explore our curated collection of professional AI prompts for creating stunning digital art. Featured 3D renders, character designs, and creative techniques for AI-generated visuals.",
  keywords: [
    "AI prompts",
    "AI art gallery",
    "digital art prompts",
    "AI generated images",
    "creative AI prompts",
    "3D AI art",
    "character AI prompts",
    "AI art techniques",
    "stable diffusion prompts",
    "midjourney prompts",
  ],
  openGraph: {
    title: "PIXELPrompt - Discover AI Visual Prompts & Techniques",
    description:
      "Explore our curated collection of professional AI prompts for creating stunning digital art.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "PIXELPrompt - AI Visual Prompts Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PIXELPrompt - Discover AI Visual Prompts & Techniques",
    description:
      "Explore our curated collection of professional AI prompts for creating stunning digital art.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const categories = getAllCategories();
  const featured = getFeaturedPrompts();

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-24">
        <CategoryScroll slug={""} prompts={featured} title={"Featured"} />
        {categories.map((category) => (
          <CategoryScroll
            key={category.slug}
            slug={category.slug}
            prompts={getPromptsByCategory(category.slug)}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
}
