import Callout from "@/components/callout";
import { ContentContainer } from "@/components/content-container";
import { CopyPrompt } from "@/components/copy-prompt";
import { HeroImage } from "@/components/hero-image";
import { getPrompt, toImagePath } from "@/lib/content";
import { renderMarkdoc } from "@/lib/markdoc";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const data = getPrompt(category, slug);
  if (!data) return notFound();
  const { meta, body } = data;
  const mdComponents = { Callout } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: meta.title,
            description: meta.description,
            creator: {
              "@type": "Organization",
              name: "PIXELPrompt",
            },
            category: category,
            keywords: [
              meta.title,
              category,
              "AI prompt",
              "AI art",
              "digital art",
            ],
            image: meta.images.length > 0 ? meta.images : undefined,
            url: `/${category}/${slug}`,
            datePublished: new Date().toISOString(),
            inLanguage: "en-US",
            isAccessibleForFree: true,
            publisher: {
              "@type": "Organization",
              name: "PIXELPrompt",
              url: "/",
            },
          }),
        }}
      />
      <div className="space-y-12 sm:text-lg">
        <ContentContainer className="max-w-4xl mx-auto space-y-4">
          <h1 className="font-semibold tracking-tight text-4xl md:text-5xl">
            {meta.title}
          </h1>
          <p>{meta.description}</p>
        </ContentContainer>
        <div className="space-y-6 ">
          <HeroImage imageUrl={toImagePath(meta.cover)} description={""} />
          <ContentContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {meta.images.map((src, i) => (
              <Image
                key={i}
                src={toImagePath(src)}
                alt={`${meta.title} sample ${i + 1}`}
                unoptimized
                width={600}
                height={600}
                className="object-contain rounded-xl shadow-sm bg-stone-200"
              />
            ))}
          </ContentContainer>
        </div>
        <ContentContainer className="max-w-4xl ">
          {renderMarkdoc(body, mdComponents)}
        </ContentContainer>
      </div>
      <CopyPrompt text={body} image={toImagePath("/buttons/glass.png")} />
    </>
  );
}
