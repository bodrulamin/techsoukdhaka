/**
 * React Query hooks for product operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/api/endpoints/products';
import type {
  Product,
  ProductSearchParams,
  CreateProductRequest,
  UpdateProductRequest,
} from '@/lib/api/types';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductSearchParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  slug: (slug: string) => [...productKeys.all, 'slug', slug] as const,
};

/**
 * Hook to fetch products with pagination and filtering
 */
export function useProducts(params?: ProductSearchParams) {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => getProducts(params || {}),
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch a product by slug
 */
export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: productKeys.slug(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Hook to create a new product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProduct(data),
    onSuccess: (data) => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      // Pre-populate the new product in cache
      queryClient.setQueryData(productKeys.detail(data.id), data);
    },
  });
}

/**
 * Hook to update an existing product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) =>
      updateProduct(id, data),
    onSuccess: (data, variables) => {
      // Update the product in cache
      queryClient.setQueryData(productKeys.detail(variables.id), data);
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

/**
 * Hook to delete a product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_, id) => {
      // Remove the product from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}
