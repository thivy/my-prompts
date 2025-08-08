import {
  getAllCategories,
  getPrompt,
  getPromptsByCategory,
} from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllCategories().flatMap((c) =>
    getPromptsByCategory(c.slug).map((p) => ({
      category: c.slug,
      slug: p.slug,
    }))
  );
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const data = getPrompt(category, slug);
  if (!data) return notFound();
  const { meta, body } = data;
  const components = { Image } as const;

  return (
    <article className="prose max-w-none">
      <h1 className="font-bold text-3xl mb-2">{meta.title}</h1>
      {meta.description && <p className="text-gray-600">{meta.description}</p>}

      {meta.images && meta.images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {meta.images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50"
            >
              <Image
                src={src}
                alt={`${meta.title} sample ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <MDXRemote source={body} components={components} />
      </div>
    </article>
  );
}
