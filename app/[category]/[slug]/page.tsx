import { generateCategoryMetadata } from "@/app-pages/category/category-metadata";
import CategoryPage from "@/app-pages/category/category-page";
import { getAllCategories, getPromptsByCategory } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().flatMap((c) =>
    getPromptsByCategory(c.slug).map((p) => ({
      category: c.slug,
      slug: p.slug,
    }))
  );
}

type Params = Promise<{ category: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, slug } = await params;
  return generateCategoryMetadata({ category, slug });
}

export default async function PromptPage({ params }: { params: Params }) {
  const { category, slug } = await params;

  return <CategoryPage category={category} slug={slug} />;
}
