# HeaderHeroImage Component

A flexible header hero image component that accepts custom image and description props while maintaining the same visual styling as the original PageHeader.

## Usage

```tsx
import { HeaderHeroImage } from "@/components/header-hero-image";

// Basic usage
<HeaderHeroImage 
  imageUrl="/path/to/your/image.png"
  description="Your custom description text here"
/>

// Example with custom content
<HeaderHeroImage 
  imageUrl="/custom-hero.jpg"
  description="Welcome to our custom page with personalized content!"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `imageUrl` | `string` | Yes | URL path to the hero image. Will be processed through `toImagePath` utility |
| `description` | `string` | Yes | Text description to display below the image |

## Features

- ✅ Maintains consistent styling with existing PageHeader component
- ✅ Uses ContentContainer for responsive layout
- ✅ Preserves PIXEL Prompts branding and home link
- ✅ Supports image path processing via toImagePath utility
- ✅ Fully TypeScript typed with proper interfaces
- ✅ Responsive design matching existing component patterns

## Implementation Details

The component follows the exact same structure as the original PageHeader but makes the image and description configurable via props:

- Uses the same CSS classes for consistent styling
- Maintains the same layout structure with ContentContainer
- Preserves the home link with PIXEL Prompts branding
- Applies the same responsive classes (md:px-20 for image, responsive text sizing)