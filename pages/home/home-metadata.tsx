import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "PIXELPrompt - Discover AI Visual Prompts & Techniques",
  description:
    "Explore our curated collection of professional AI prompts for creating stunning digital art. Featured 3D renders, character designs, and creative techniques for AI-generated visuals.",
  keywords: [
    "AI prompts",
    "AI art gallery",
    "digital art prompts",
    "AI generated images",
    "creative AI prompts",
    "3D AI art",
    "character AI prompts",
    "AI art techniques",
    "stable diffusion prompts",
    "midjourney prompts",
  ],
  openGraph: {
    title: "PIXELPrompt - Discover AI Visual Prompts & Techniques",
    description:
      "Explore our curated collection of professional AI prompts for creating stunning digital art.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "PIXELPrompt - AI Visual Prompts Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PIXELPrompt - Discover AI Visual Prompts & Techniques",
    description:
      "Explore our curated collection of professional AI prompts for creating stunning digital art.",
    images: ["/api/og"],
  },
  alternates: {
    canonical: "/",
  },
};
