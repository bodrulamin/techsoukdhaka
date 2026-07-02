/**
 * React Query hooks for vendor operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVendors, getVendor, createVendor, updateVendor, deleteVendor } from '@/lib/api/endpoints/vendors';
import type { Vendor, CreateVendorRequest, UpdateVendorRequest } from '@/lib/api/types';

// Query keys
export const vendorKeys = {
  all: ['vendors'] as const,
  lists: () => [...vendorKeys.all, 'list'] as const,
  details: () => [...vendorKeys.all, 'detail'] as const,
  detail: (id: string) => [...vendorKeys.details(), id] as const,
};

/**
 * Hook to fetch vendors
 */
export function useVendors() {
  return useQuery({
    queryKey: vendorKeys.lists(),
    queryFn: getVendors,
  });
}

/**
 * Hook to fetch a single vendor by ID
 */
export function useVendor(id: string) {
  return useQuery({
    queryKey: vendorKeys.detail(id),
    queryFn: () => getVendor(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new vendor
 */
export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVendorRequest) => createVendor(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.lists() });
      queryClient.setQueryData(vendorKeys.detail(data.id), data);
    },
  });
}

/**
 * Hook to update an existing vendor
 */
export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVendorRequest }) =>
      updateVendor(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(vendorKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: vendorKeys.lists() });
    },
  });
}

/**
 * Hook to delete a vendor
 */
export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVendor(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: vendorKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: vendorKeys.lists() });
    },
  });
}
