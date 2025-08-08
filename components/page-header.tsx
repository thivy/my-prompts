import { ContentContainer } from "./content-container";

export const PageHeader = () => {
  return (
    <ContentContainer>
      <h1 className="text-4xl font-bold">My Prompts</h1>
      <p className="mt-2 text-lg text-gray-600">
        A collection of prompts for creative inspiration.
      </p>
    </ContentContainer>
  );
};
