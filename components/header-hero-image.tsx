import Image from "next/image";
import { ContentContainer } from "./content-container";

interface HeaderHeroImageProps {
  imageUrl: string;
  description: string;
}

export const HeaderHeroImage = ({
  imageUrl,
  description,
}: HeaderHeroImageProps) => {
  return (
    <ContentContainer className="space-y-12">
      <div className="relative w-full aspect-video">
        <Image
          src={imageUrl}
          alt={description ?? "Hero Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1200px"
          className="object-contain rounded-2xl"
        />
      </div>
      <p className="text-2xl sm:text-4xl md:text-5xl text-stone-500 sm:text-balance leading-tight tracking-tight font-normal text-center">
        {description}
      </p>
    </ContentContainer>
  );
};
