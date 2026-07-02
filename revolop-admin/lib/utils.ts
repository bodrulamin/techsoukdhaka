import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get initials from a name or email
 */
export function getInitials(name: string): string {
  if (!name) return '?';

  // For email addresses, use the part before @
  const cleanName = name.includes('@') ? name.split('@')[0] : name;

  // Split by space, dash, or underscore and get first letter of each part
  const parts = cleanName
    .split(/[\s-_]/)
    .filter((part) => part.length > 0)
    .slice(0, 2);

  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return parts.map((part) => part[0].toUpperCase()).join('');
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date: string | Date, format: 'short' | 'long' | 'full' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? { month: 'short', day: 'numeric', year: 'numeric' }
      : format === 'long'
        ? { month: 'long', day: 'numeric', year: 'numeric' }
        : { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}
