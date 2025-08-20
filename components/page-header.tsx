import Link from "next/link";
import { ContentContainer } from "./content-container";
import { PIXELPrompt } from "./PIXELPrompt";

export const PageHeader = () => {
  return (
    <ContentContainer className="pt-12 flex flex-col gap-8">
      <Link
        href={"/"}
        className="scroll-m-20 text-4xl md:text-6xl font-medium tracking-tight text-balance"
      >
        <PIXELPrompt />
      </Link>
      <p className="text-2xl sm:text-4xl md:text-6xl text-slate-400 sm:text-balance tracking-tighter font-normal">
        A handpicked gallery of{" "}
        <span className="font-semibold bg-gradient-to-r from-blue-300  to-orange-300 bg-clip-text text-transparent">
          AI-fueled
        </span>{" "}
        visuals and the prompts that power them.
      </p>
    </ContentContainer>
  );
};
