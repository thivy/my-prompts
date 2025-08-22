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
    <ContentContainer className="">
      <div className="relative w-full h-[200px] sm:h-[420px] md:h-[520px] lg:h-[600px]">
        <Image
          src={imageUrl}
          alt={description ?? "Hero Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1200px"
          className="object-contain"
        />
      </div>
      <p className="text-2xl py-8 sm:text-4xl md:text-5xl text-stone-500 sm:text-balance tracking-tight font-normal text-center">
        {description}
      </p>
    </ContentContainer>
  );
};
