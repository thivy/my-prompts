import { CategoryScroll } from "@/components/category-scroll";
import {
  getAllCategories,
  getPromptsByCategory,
} from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const allCategories = getAllCategories();
  const currentCategory = allCategories.find(c => c.slug === category);
  
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
    "characters": "Discover character design AI prompts for creating compelling portraits, character art, and personality-driven visuals. Ideal for character artists and designers.",
  };
  
  const description = categoryDescriptions[category] || 
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
      ...(category === "3d" ? ["3D rendering", "3D modeling", "3D art", "three dimensional"] : []),
      ...(category === "characters" ? ["character design", "portrait art", "character creation"] : [])
    ],
    openGraph: {
      title: `${currentCategory.name} AI Prompts | PIXELPrompt`,
      description,
      type: "website",
      url: `/categories/${category}`,
      images: prompts.length > 0 && prompts[0].images.length > 0 ? [
        {
          url: prompts[0].images[0],
          width: 1200,
          height: 630,
          alt: `${currentCategory.name} AI Prompts`,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${currentCategory.name} AI Prompts | PIXELPrompt`,
      description,
      images: prompts.length > 0 && prompts[0].images.length > 0 ? [prompts[0].images[0]] : [],
    },
    alternates: {
      canonical: `/categories/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  // Get all categories to find the current category
  const allCategories = getAllCategories();
  const currentCategory = allCategories.find(c => c.slug === category);
  
  // This should not happen since we generate static params only for valid categories
  // But if it does, we'll show a fallback
  if (!currentCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-6">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-medium text-gray-700">Category Not Found</h2>
          <p className="text-gray-600 max-w-md">
            The category you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>
      </div>
    );
  }
  
  // Get prompts for this category
  const prompts = getPromptsByCategory(category);
  
  return (
    <div className="space-y-12">
      <CategoryScroll 
        slug={currentCategory.slug}
        prompts={prompts} 
        title={currentCategory.name} 
      />
    </div>
  );
}