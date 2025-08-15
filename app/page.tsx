import { CategoryScroll } from "@/components/category-scroll";
import {
  getAllCategories,
  getFeaturedPrompts,
  getPromptsByCategory,
} from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const categories = getAllCategories();
  const featured = getFeaturedPrompts();

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <CategoryScroll
          key={category.slug}
          prompts={getPromptsByCategory(category.slug)}
        />
      ))}
      <section className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((c, index) => (
            <Link key={index} href={`/categories/${c.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-gray-50">
                {c.cover ? (
                  <Image
                    src={c.cover}
                    alt={c.name}
                    fill
                    unoptimized
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
          {categories.length === 0 && (
            <div className="col-span-full text-sm text-gray-500">
              Add folders under <code>content/</code> to see categories.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Prompts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featured.map((p, index) => (
            <Link
              key={`${p.category}-${index}`}
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
          {featured.length === 0 && (
            <div className="col-span-full text-sm text-gray-500">
              Mark prompts with <code>featured: true</code> in frontmatter to
              list them here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
