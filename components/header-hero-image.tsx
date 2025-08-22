import { toImagePath } from "@/lib/content";
import Link from "next/link";
import { ContentContainer } from "./content-container";

interface HeaderHeroImageProps {
  imageUrl: string;
  description: string;
}

export const HeaderHeroImage = ({ imageUrl, description }: HeaderHeroImageProps) => {
  return (
    <ContentContainer className="">
      <Link
        href={"/"}
        className="text-stone-400 text-xl py-3 inline-block font-semibold tracking-tight text-balance"
      >
        <span className="font-extrabold text-stone-500">PIXEL</span> Prompts
      </Link>
      <span className="">
        <img
          src={toImagePath(imageUrl)}
          alt="Hero Image"
          className="md:px-20"
        />
      </span>
      <p className="text-2xl py-8 sm:text-4xl md:text-5xl text-stone-500 sm:text-balance tracking-tight font-normal text-center">
        {description}
      </p>
    </ContentContainer>
  );
};