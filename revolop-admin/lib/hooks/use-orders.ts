/**
 * React Query hooks for order operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getOrders,
  getOrder,
  updateOrderStatus,
} from '@/lib/api/endpoints/orders';
import type { Order, OrderSearchParams, UpdateOrderStatusRequest } from '@/lib/api/types';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (params: OrderSearchParams) => [...orderKeys.lists(), params] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

/**
 * Hook to fetch orders with pagination and filtering
 */
export function useOrders(params?: OrderSearchParams) {
  return useQuery({
    queryKey: orderKeys.list(params || {}),
    queryFn: () => getOrders(params || {}),
  });
}

/**
 * Hook to fetch a single order by ID
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
}

/**
 * Hook to update order status
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderStatusRequest }) =>
      updateOrderStatus(id, data),
    onSuccess: (data, variables) => {
      // Update the order in cache
      queryClient.setQueryData(orderKeys.detail(variables.id), data);
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}
