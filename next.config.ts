import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const basePathEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const normalizedBasePath = basePathEnv
  ? basePathEnv.startsWith("/")
    ? basePathEnv.replace(/\/$/, "")
    : `/${basePathEnv.replace(/\/$/, "")}`
  : "";

const nextConfig: NextConfig = {
  // Support MDX pages/components in the app directory
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Export as a fully static site for GitHub Pages
  output: "export",
  // Ensure URLs end with a slash to match GitHub Pages static hosting
  trailingSlash: true,
  // Prefix asset and route paths when deploying to a project page repo
  ...(normalizedBasePath
    ? {
        basePath: normalizedBasePath,
        assetPrefix: "/test/" + normalizedBasePath,
      }
    : {}),
  experimental: {
    // Keep default experimental options, if any, and enable mdxRs if needed by Next 15
  },
  images: {
    // Required for static export
    unoptimized: true,
    remotePatterns: [
      // Allow remote images if you later add external image URLs in MDX
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*" },
    ],
  },
};

export default withMDX(nextConfig);
