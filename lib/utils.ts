import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Prisma object into regular JS object
export function convertToPlainObject<T>(value: T): T { // T is Typescript generic: the T is a placeholder for any type that the function might accept when it's called
  return JSON.parse(JSON.stringify(value));
}
