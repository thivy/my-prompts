import { CategoryGrid } from "@/components/category-grid";
import { getAllCategories, getPromptsByCategory } from "@/lib/content";
import { notFound } from "next/navigation";

type Props = {
  category: string;
};

export default async function CategoriesPage({ category }: Props) {
  // Get all categories to find the current category
  const allCategories = getAllCategories();
  const currentCategory = allCategories.find((c) => c.slug === category);

  // This should not happen since we generate static params only for valid categories
  // But if it does, we'll show a fallback
  if (!currentCategory) {
    return notFound();
  }

  const prompts = getPromptsByCategory(category);

  return (
    <div className="pb-12">
      <CategoryGrid
        slug={currentCategory.slug}
        prompts={prompts}
        title={currentCategory.name}
      />
    </div>
  );
}
