import Link from "next/link";
import { ContentContainer } from "./content-container";

export const PageHeader = () => {
  return (
    <ContentContainer className="py-12 space-y-2">
      <Link
        href={"/"}
        className="scroll-m-20  text-4xl md:text-6xl font-medium tracking-tight text-balance"
      >
        <span className="font-extrabold">PIXEL</span>Prompt
      </Link>
      <p className="text-2xl sm:text-4xl md:text-6xl text-slate-400 text-balance tracking-tighter font-normal">
        A handpicked gallery of{" "}
        <span className="font-semibold bg-gradient-to-r from-blue-300  to-orange-300 bg-clip-text text-transparent">
          AI-fueled
        </span>{" "}
        visuals and the prompts that power them.
      </p>
    </ContentContainer>
  );
};
