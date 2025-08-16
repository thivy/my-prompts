import Callout from "@/components/callout";
import { ContentContainer } from "@/components/content-container";
import {
  getAllCategories,
  getPrompt,
  getPromptsByCategory,
} from "@/lib/content";
import { renderMarkdoc } from "@/lib/markdoc";
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

import { CopyPromptButton } from "@/components/copy-prompt-button";

export default async function PromptPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const data = getPrompt(category, slug);
  if (!data) return notFound();
  const { meta, body } = data;
  const mdComponents = { Callout } as const;

  return (
    <article className="max-w-none space-y-12  pb-12">
      <ContentContainer className="space-y-6">
        <h1 className="font-semibold tracking-tight text-4xl">{meta.title}</h1>
        {/* Copy Prompt Button */}
        <CopyPromptButton text={body} />
        {meta.description && (
          <p className="text-gray-600">{meta.description}</p>
        )}
      </ContentContainer>

      <ContentContainer className="text-xl">
        {renderMarkdoc(body, mdComponents)}
      </ContentContainer>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
        {meta.images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-50"
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
    </article>
  );
}
