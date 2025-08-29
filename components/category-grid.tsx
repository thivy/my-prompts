import { Prompt, toImagePath } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { ContentContainer } from "./content-container";
type Prop = {
  title: string;
  slug: string;
  prompts: Prompt[];
};

export const CategoryGrid = ({ prompts, title, slug }: Prop) => {
  return (
    <div className="category-scroll space-y-6 px-6 mx-auto text-stone-500 ">
      <ContentContainer>
        <h2 className="text-2xl sm:text-4xl font-medium tracking-tight">
          {title}
        </h2>
      </ContentContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {prompts.map((prompt, id) => (
          <Link
            key={id}
            href={`/${slug.length < 1 ? prompt.category : slug}/${prompt.slug}`}
            className="space-y-2 group"
          >
            <div className="rounded-xl overflow-hidden relative aspect-square bg-stone-200">
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
                <p className="text-xs font-light text-stone-100">
                  {prompt.description}
                </p>
              </div>
            </div>
            <h3 className="font-semibold tracking-tight text-sm">
              {prompt.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
