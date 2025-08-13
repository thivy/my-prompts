import { ContentContainer } from "./content-container";

export const PageHeader = () => {
  return (
    <ContentContainer className="py-6 space-y-2">
      <h1 className="scroll-m-20 text-4xl  tracking-tight text-balance">
        <span className="font-extrabold">Pixel</span>Prompt
      </h1>
      <p className="text-lg sm:text-2xl text-gray-600 text-balance tracking-tight font-medium">
        A handpicked gallery of AI-fueled visuals and the prompts that power
        them.
      </p>
    </ContentContainer>
  );
};
