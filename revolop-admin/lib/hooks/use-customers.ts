/**
 * React Query hooks for customer operations
 */

'use client';

import { useQuery } from '@tanstack/react-query';

// Note: Customer endpoints would be added to the API when available
// For now, this is a placeholder hook structure

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface CustomerSearchParams {
  page?: number;
  size?: number;
  search?: string;
}

// Query keys
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (params: CustomerSearchParams) => [...customerKeys.lists(), params] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

/**
 * Hook to fetch customers with pagination and filtering
 * TODO: Implement customer API endpoint
 */
export function useCustomers(params?: CustomerSearchParams) {
  return useQuery({
    queryKey: customerKeys.list(params || {}),
    queryFn: async () => {
      // Placeholder - implement when customer API is available
      return [] as Customer[];
    },
    enabled: false, // Disabled until API is implemented
  });
}

/**
 * Hook to fetch a single customer by ID
 * TODO: Implement customer API endpoint
 */
export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: async () => {
      // Placeholder - implement when customer API is available
      return null as Customer | null;
    },
    enabled: false, // Disabled until API is implemented
  });
}
