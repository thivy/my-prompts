import { CategoryScroll } from "@/components/category-scroll";
import { getAllCategories, getPromptsByCategory } from "@/lib/content";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({
    category: c.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Get all categories to find the current category
  const allCategories = getAllCategories();
  const currentCategory = allCategories.find((c) => c.slug === category);

  // This should not happen since we generate static params only for valid categories
  // But if it does, we'll show a fallback
  if (!currentCategory) {
    return notFound();
  }

  // Get prompts for this category
  const prompts = getPromptsByCategory(category);

  return (
    <div className="pb-12">
      <CategoryScroll
        slug={currentCategory.slug}
        prompts={prompts}
        title={currentCategory.name}
      />
    </div>
  );
}
