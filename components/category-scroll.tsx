import { Prompt } from "@/lib/content";

type Prop = {
  prompts: Prompt[];
};
export const CategoryScroll = ({ prompts }: Prop) => {
  return (
    <div className="category-scroll">
      <div className="category-scroll-inner">
        {prompts.map((prompt, id) => (
          <div key={id} className="category-scroll-item">
            <h3>{prompt.title}</h3>
            <p>{prompt.description}</p>
            <img className="w-96" src={prompt.images[0]} alt={prompt.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
