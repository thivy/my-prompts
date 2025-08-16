import { CategoryScroll } from "@/components/category-scroll";
import {
  getAllCategories,
  getPromptsByCategory,
} from "@/lib/content";

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