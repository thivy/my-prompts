import Link from "next/link";
import { ContentContainer } from "./content-container";

export const PageHeader = () => {
  return (
    <ContentContainer className=" ">
      <Link
        href={"/"}
        className="text-stone-400 text-xl py-3 inline-block font-semibold tracking-tight text-balance"
      >
        <span className="font-extrabold text-stone-500">PIXEL</span> Prompts
      </Link>
      <span className="px-20">
        <img src={"/header/hero.png"} alt="Main Logo" className="px-20" />
      </span>
      <p className="text-2xl sm:text-4xl md:text-6xl text-stone-500 sm:text-balance tracking-tighter font-normal text-center">
        A handpicked gallery of AI-fueled visuals and the prompts that power
        them.
      </p>
    </ContentContainer>
  );
};
