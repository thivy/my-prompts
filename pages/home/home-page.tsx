import { CategoryGrid } from "@/components/category-grid";
import { HeroImage } from "@/components/hero-image";
import {
  getAllCategories,
  getFeaturedPrompts,
  getPromptsByCategory,
  toImagePath,
} from "@/lib/content";

export default function HomePage() {
  const categories = getAllCategories();
  const featured = getFeaturedPrompts();

  return (
    <div className="space-y-12 pb-12">
      <HeroImage
        imageUrl={toImagePath("/header/hero.png")}
        description=" A handpicked gallery of AI-fueled visuals and the prompts that power
        them."
      />
      <CategoryGrid slug={""} prompts={featured} title={"Featured"} />
      {categories.map((category) => (
        <CategoryGrid
          key={category.slug}
          slug={category.slug}
          prompts={getPromptsByCategory(category.slug)}
          title={category.name}
        />
      ))}
    </div>
  );
}
