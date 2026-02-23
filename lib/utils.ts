import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Prisma object into regular JS object
export function convertToPlainObject<T>(value: T): T { // T is Typescript generic: the T is a placeholder for any type that the function might accept when it's called
  return JSON.parse(JSON.stringify(value));
}

// Book availability
export type BookAvailability = "out_of_stock" | "limited" | "available";

export function getBookAvailability(stock: number): BookAvailability {
  if (!Number.isFinite(stock) || stock < 0) {
    throw new Error('Invalid stock value: ${stock}')
  }

  if (stock === 0) return 'out_of_stock'
  if (stock <= 2) return "limited"
  return 'available'
}

// Book availability label
export function getBookAvailabilityLabel(status: BookAvailability): string {
  switch (status) {
    case 'out_of_stock':
      return 'Out Of Stock'
    case 'limited':
      return 'Limited'
    case 'available':
      return 'Available'
  }
}
