import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` merges Tailwind classes safely. Used by every ui/ component.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
