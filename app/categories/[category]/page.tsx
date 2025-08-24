import { generateCategoriesMetadata } from "@/app-pages/categories/categories-metadata";
import CategoriesPage from "@/app-pages/categories/categories-page";
import { getAllCategories } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({
    category: c.slug,
  }));
}

type Params = Promise<{ category: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  return generateCategoriesMetadata({ category });
}

export default async function Page({ params }: { params: Params }) {
  const { category } = await params;

  return <CategoriesPage category={category} />;
}
