import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge arbitrary className inputs and resolve Tailwind conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
