import { homeMetadata } from "@/pages/home/home-metadata";
import HomePage from "@/pages/home/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return <HomePage />;
}
