import { Prompt, toImagePath } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
type Prop = {
  title: string;
  slug: string;
  prompts: Prompt[];
};

export const CategoryScroll = ({ prompts, title, slug }: Prop) => {
  return (
    <div className="category-scroll space-y-12 px-6 mx-auto">
      <header className="container max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl text-stone-500 font-medium tracking-tight">
          {title}
        </h2>
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
            <div className="p-4 h-full w-full mask-t-from-5% mask-to-0% z-10 backdrop-blur-[100px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20 duration-700"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
              <h3 className="text-lg tracking-tight text-stone-50">
                {prompt.title}
              </h3>
              <p className="text-xs font-light text-stone-100">
                {prompt.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
