import Link from "next/link";
import { ContentContainer } from "./content-container";

export const PageHeader = () => {
  return (
    <ContentContainer className="">
      <Link
        href={"/"}
        className="text-stone-400 text-xl py-3 inline-block font-semibold tracking-tight text-balance"
      >
        <span className="font-extrabold text-stone-500">PIXEL</span> Prompts
      </Link>
    </ContentContainer>
  );
};
