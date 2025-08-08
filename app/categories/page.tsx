import { getAllCategories } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export default function CategoriesPage() {
  const categories = getAllCategories();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Link key={c.slug} href={`/categories/${c.slug}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-gray-50">
              {c.cover ? (
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">
                  No cover
                </div>
              )}
            </div>
            <div className="mt-2 text-sm font-medium">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
