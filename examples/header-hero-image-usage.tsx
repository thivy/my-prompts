/*
  Example usage of HeaderHeroImage component
  
  This demonstrates how to use the new HeaderHeroImage component
  with custom image and description props.
*/

import { HeaderHeroImage } from "@/components/header-hero-image";

// Example 1: Using with the default hero image
function ExamplePage1() {
  return (
    <HeaderHeroImage 
      imageUrl="/header/hero.png"
      description="A handpicked gallery of AI-fueled visuals and the prompts that power them."
    />
  );
}

// Example 2: Using with custom content
function ExamplePage2() {
  return (
    <HeaderHeroImage 
      imageUrl="/custom/banner.jpg"
      description="Explore our collection of stunning AI-generated artwork and creative prompts."
    />
  );
}

// Example 3: Using in a page component
export default function CustomPage() {
  return (
    <div>
      <HeaderHeroImage 
        imageUrl="/images/special-event.png"
        description="Join us for a special showcase of innovative AI art techniques."
      />
      
      {/* Rest of your page content */}
      <main className="container mx-auto px-4 py-8">
        <h1>Page Content Goes Here</h1>
      </main>
    </div>
  );
}