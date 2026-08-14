import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely (later classes win over conflicting
 * earlier ones), while allowing conditional/array/object syntax via clsx.
 * Used by every component so consumers can override styles via `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
