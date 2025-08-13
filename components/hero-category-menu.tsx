import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Category = { slug: string; name: string; cover?: string };

export function HeroCategoryMenu({ categories }: { categories: Category[] }) {
  // Single icon image for all categories
  const ICON_SRC = "/cover.png";

  // Use only the real categories provided (no placeholders)

  // create random category items
  const createRandomCategories = (count: number): Category[] => {
    return Array.from({ length: count }, (_, i) => ({
      slug: `category-${i + 1}`,
      name: `category-${i + 1}`,
      cover: ICON_SRC,
    }));
  };

  const items: Category[] = useMemo(() => createRandomCategories(5), []);

  return (
    <nav
      aria-label="Browse categories"
      className="py-4 w-full overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory [--edge:calc(max(1rem,(100%-72rem)/2))]"
    >
      <ul
        className="flex min-w-max gap-4 snap-x snap-mandatory overflow-x-auto
            pl-[var(--edge)]"
      >
        {items.map((c) => (
          <li
            key={c.slug}
            className="snap-start snap-always  scroll-mx-2 md:scroll-mx-3"
          >
            <Link
              href={`/categories/${c.slug}`}
              className="group inline-flex flex-col items-stretch gap-2 rounded-xl pr-3 ring-0 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              <span className="relative size-[30vw] sm:size-[100px] overflow-hidden rounded-lg">
                <Image
                  src={ICON_SRC}
                  alt={c.name}
                  fill
                  className="object-contain"
                />
              </span>
              <span className="text-sm font-medium transition duration-1000 text-slate-600 text-center group-hover:text-slate-900">
                {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
