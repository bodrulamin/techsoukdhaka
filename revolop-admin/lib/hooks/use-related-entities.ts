/**
 * React Query hooks for categories, brands, and vendors
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/endpoints/categories';
import { getBrands } from '@/lib/api/endpoints/brands';
import { getVendors } from '@/lib/api/endpoints/vendors';
import type { Category, Brand, Vendor } from '@/lib/api/types';

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: () => [...categoryKeys.lists(), 'all'] as const,
  detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
};

export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: () => [...brandKeys.lists(), 'all'] as const,
  detail: (id: string) => [...brandKeys.all, 'detail', id] as const,
};

export const vendorKeys = {
  all: ['vendors'] as const,
  lists: () => [...vendorKeys.all, 'list'] as const,
  list: () => [...vendorKeys.lists(), 'all'] as const,
  detail: (id: string) => [...vendorKeys.all, 'detail', id] as const,
};

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
  });
}

/**
 * Hook to fetch all brands
 */
export function useBrands() {
  return useQuery<Brand[]>({
    queryKey: brandKeys.list(),
    queryFn: getBrands,
  });
}

/**
 * Hook to fetch all vendors
 */
export function useVendors() {
  return useQuery<Vendor[]>({
    queryKey: vendorKeys.list(),
    queryFn: getVendors,
  });
}
