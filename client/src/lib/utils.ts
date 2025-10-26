/**
 * UTILITY FUNCTIONS
 * 
 * This file provides shared utility functions used throughout the application.
 * Currently contains className manipulation utilities for Tailwind CSS.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * CLASSNAME UTILITY (cn)
 * 
 * Combines multiple className strings intelligently, handling:
 * - Conditional classes (via clsx)
 * - Tailwind class conflicts (via tailwind-merge)
 * 
 * WHY THIS IS NEEDED:
 * Tailwind CSS can have conflicting utility classes (e.g., "p-4 p-6" or "bg-red-500 bg-blue-500").
 * This function ensures the last class wins, preventing unexpected styling bugs.
 * 
 * @param inputs - Array of class values (strings, objects, arrays, etc.)
 * @returns Merged className string with conflicts resolved
 * 
 * USAGE EXAMPLES:
 * ```typescript
 * // Basic merging
 * cn("px-4 py-2", "bg-blue-500")
 * // → "px-4 py-2 bg-blue-500"
 * 
 * // Conditional classes
 * cn("px-4", { "bg-red-500": isError, "bg-green-500": isSuccess })
 * // → "px-4 bg-red-500" (if isError is true)
 * 
 * // Conflict resolution (last class wins)
 * cn("p-4", "p-6")
 * // → "p-6" (not "p-4 p-6")
 * 
 * // Component prop merging
 * <Button className={cn("bg-primary", className)} />
 * // Allows parent components to override default styles
 * ```
 * 
 * COMMON PATTERN IN SHADCN COMPONENTS:
 * Most shadcn/ui components use this utility to allow className prop overrides
 * while maintaining sensible defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
