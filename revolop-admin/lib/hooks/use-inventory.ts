/**
 * React Query hooks for inventory operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInventory,
  getInventoryByVariant,
  getInventoryByWarehouse,
  getInventoryByVariantAndWarehouse,
  adjustInventory,
  getInventoryMovements,
  getMovementsByVariant,
} from '@/lib/api/endpoints/inventory';
import type {
  Inventory,
  AdjustInventoryRequest,
  InventoryMovement,
} from '@/lib/api/types';

export interface InventorySearchParams {
  variantId?: string;
  warehouseId?: string;
}

// Query keys
export const inventoryKeys = {
  all: ['inventory'] as const,
  lists: () => [...inventoryKeys.all, 'list'] as const,
  list: (params: InventorySearchParams) => [...inventoryKeys.lists(), params] as const,
  details: () => [...inventoryKeys.all, 'detail'] as const,
  movements: (params?: { variantId?: string; referenceType?: string; referenceId?: string }) =>
    [...inventoryKeys.all, 'movements', params] as const,
};

/**
 * Hook to fetch all inventory items
 */
export function useInventory() {
  return useQuery({
    queryKey: inventoryKeys.lists(),
    queryFn: getInventory,
  });
}

/**
 * Hook to fetch inventory by variant
 */
export function useInventoryByVariant(variantId: string) {
  return useQuery({
    queryKey: [...inventoryKeys.all, 'variant', variantId],
    queryFn: () => getInventoryByVariant(variantId),
    enabled: !!variantId,
  });
}

/**
 * Hook to fetch inventory by warehouse
 */
export function useInventoryByWarehouse(warehouseId: string) {
  return useQuery({
    queryKey: [...inventoryKeys.all, 'warehouse', warehouseId],
    queryFn: () => getInventoryByWarehouse(warehouseId),
    enabled: !!warehouseId,
  });
}

/**
 * Hook to fetch specific inventory (variant + warehouse)
 */
export function useInventoryItem(variantId: string, warehouseId: string) {
  return useQuery({
    queryKey: [...inventoryKeys.all, 'variant', variantId, 'warehouse', warehouseId],
    queryFn: () => getInventoryByVariantAndWarehouse(variantId, warehouseId),
    enabled: !!(variantId && warehouseId),
  });
}

/**
 * Hook to adjust stock levels
 */
export function useAdjustStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId, warehouseId, data }: {
      variantId: string;
      warehouseId: string;
      data: AdjustInventoryRequest;
    }) => adjustInventory(variantId, warehouseId, data),
    onSuccess: () => {
      // Invalidate all inventory queries
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    },
  });
}

/**
 * Hook to fetch inventory movements with optional filtering
 */
export function useInventoryMovements(params?: {
  variantId?: string;
  referenceType?: string;
  referenceId?: string;
  summary?: boolean;
}) {
  return useQuery({
    queryKey: inventoryKeys.movements(params),
    queryFn: () => getInventoryMovements(params),
  });
}

/**
 * Hook to fetch inventory movements for a specific variant
 */
export function useMovementsByVariant(variantId: string) {
  return useQuery({
    queryKey: [...inventoryKeys.all, 'movements', 'variant', variantId],
    queryFn: () => getMovementsByVariant(variantId),
    enabled: !!variantId,
  });
}
