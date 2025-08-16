import { HeroCategoryMenu } from "@/components/hero-category-menu";
import { PageHeader } from "@/components/page-header";
import { getAllCategories } from "@/lib/content";
import type { Metadata } from "next";
import "./globals.css";

// Use system fonts as fallback since Google Fonts may not be accessible
const fontClassName = "font-sans";

export const metadata: Metadata = {
  metadataBase: new URL("https://thivy.github.io/my-prompts"),
  title: {
    default: "PIXELPrompt - AI Visual Prompts Gallery",
    template: "%s | PIXELPrompt",
  },
  description:
    "Discover handpicked AI visual prompts and the techniques that power stunning digital art. Browse curated galleries of 3D renders, character designs, and creative AI-generated content.",
  keywords: [
    "AI prompts",
    "AI art",
    "digital art prompts",
    "AI generated images",
    "stable diffusion prompts",
    "midjourney prompts",
    "AI visual art",
    "creative prompts",
  ],
  authors: [{ name: "PIXELPrompt" }],
  creator: "PIXELPrompt",
  publisher: "PIXELPrompt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "PIXELPrompt",
    title: "PIXELPrompt - AI Visual Prompts Gallery",
    description:
      "Discover handpicked AI visual prompts and the techniques that power stunning digital art.",
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
    title: "PIXELPrompt - AI Visual Prompts Gallery",
    description:
      "Discover handpicked AI visual prompts and the techniques that power stunning digital art.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllCategories();
  return (
    <html lang="en">
      <body
        className={`${fontClassName} antialiased scroll-smooth bg-slate-100 space-y-12 pb-12`}
      >
        <PageHeader />
        <HeroCategoryMenu categories={categories} />
        {children}
      </body>
    </html>
  );
}
