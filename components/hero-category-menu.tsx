import { getAllCategories } from "@/lib/content";
import { HeroCategoryMenuClient } from "./hero-category-scroller";

// Server wrapper: fetch categories (filesystem) and render client scroller.
export async function HeroCategoryMenu() {
  const categories = getAllCategories();
  return <HeroCategoryMenuClient categories={categories} />;
}

export default HeroCategoryMenu;
