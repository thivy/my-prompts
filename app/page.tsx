import { CategoryScroll } from "@/components/category-scroll";
import {
  getAllCategories,
  getFeaturedPrompts,
  getPromptsByCategory,
} from "@/lib/content";

export default function Home() {
  const categories = getAllCategories();
  const featured = getFeaturedPrompts();

  return (
    <div className="space-y-12">
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
