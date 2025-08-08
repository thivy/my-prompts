import { getAllCategories, getPromptsByCategory } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const prompts = getPromptsByCategory(category);
  const title = category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {prompts.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.category}/${p.slug}`}
            className="group"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50">
              {p.images?.[0] ? (
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="mt-2 text-sm font-medium line-clamp-1">
              {p.title}
            </div>
          </Link>
        ))}
        {prompts.length === 0 && (
          <div className="col-span-full text-sm text-gray-500">
            No prompts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
