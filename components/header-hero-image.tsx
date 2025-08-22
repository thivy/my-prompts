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
      <img src={imageUrl} alt="Hero Image" className="md:px-20" />
      <p className="text-2xl py-8 sm:text-4xl md:text-5xl text-stone-500 sm:text-balance tracking-tight font-normal text-center">
        {description}
      </p>
    </ContentContainer>
  );
};
