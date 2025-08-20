import Link from "next/link";
import { ContentContainer } from "./content-container";

const Img = ({ src, className }: { src: string; className?: string }) => {
  return (
    <span className="">
      <img
        src={src}
        className={`w-20 inline-block hover:scale-105 origin-center transition duration-400 ${className}`}
      />
    </span>
  );
};

export const PageHeader = () => {
  return (
    <ContentContainer className="pt-12 flex flex-col gap-8">
      <Link
        href={"/"}
        className="scroll-m-20  text-4xl md:text-6xl font-medium tracking-tight text-balance"
      >
        <span className="flex scale-75">
          <Img src={"/header/P_Baloon.png"} className="w-24" />
          <Img src={"/header/I_Baloon.png"} />
          <Img src={"/header/X_Baloon.png"} className="w-27" />
          <Img src={"/header/E_Baloon.png"} />
          <Img src={"/header/L_Baloon.png"} className="w-26" />
          Prompt
        </span>
        <span className="font-extrabold">PIXEL</span>Prompt
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
