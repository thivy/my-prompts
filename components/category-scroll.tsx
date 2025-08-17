import { Prompt, toImagePath } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { MasonryGrid, MasonryGridItem } from "./masonry-grid";

type Prop = {
  title: string;
  slug: string;
  prompts: Prompt[];
  useMasonry?: boolean;
};

export const CategoryScroll = ({ prompts, title, slug, useMasonry = false }: Prop) => {
  if (useMasonry) {
    const masonryItems: MasonryGridItem[] = prompts.map((prompt, id) => ({
      id: `${prompt.category}-${prompt.slug}-${id}`,
      href: `/${slug.length < 1 ? prompt.category : slug}/${prompt.slug}`,
      linkClassName: "rounded-xl overflow-hidden relative group block",
      content: (
        <div className="relative aspect-[3/4] group">
          <Image
            src={toImagePath(prompt.images?.[0] || "")}
            alt="Collection Item"
            className="object-cover z-0 rounded-xl"
            loading="lazy"
            quality={100}
            fill
          />
          <div className="p-4 h-full w-full mask-t-from-5% mask-to-0% z-10 backdrop-blur-[100px] absolute text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20 duration-700 rounded-xl"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
            <h3 className="text-lg tracking-tight text-gray-50">
              {prompt.title}
            </h3>
            <p className="text-xs font-light text-gray-50">
              {prompt.description}
            </p>
          </div>
        </div>
      ),
    }));

    return (
      <div className="category-scroll space-y-12 px-6 mx-auto">
        <header className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium tracking-tighter">{title}</h2>
        </header>
        <div className="container max-w-6xl mx-auto">
          <MasonryGrid 
            items={masonryItems}
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            gap="gap-6"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="category-scroll space-y-12 px-6 mx-auto">
      <header className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-medium tracking-tighter">{title}</h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {prompts.map((prompt, id) => (
          <Link
            key={id}
            href={`/${slug.length < 1 ? prompt.category : slug}/${prompt.slug}`}
            className="rounded-xl overflow-hidden relative aspect-square group"
          >
            <Image
              src={toImagePath(prompt.images?.[0] || "")}
              alt="Collection Item"
              className="object-cover z-0"
              loading="lazy"
              quality={100}
              fill
            />
            <div className="p-4 h-full w-full mask-t-from-5% mask-to-0% z-10 backdrop-blur-[100px] absolute text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20 duration-700"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
              <h3 className="text-lg tracking-tight text-gray-50">
                {prompt.title}
              </h3>
              <p className="text-xs font-light text-gray-50">
                {prompt.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
