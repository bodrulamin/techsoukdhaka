/**
 * Product API endpoints
 */

import apiClient from '../client';
import type {
  Product,
  ProductVariant,
  CreateProductRequest,
  UpdateProductRequest,
  ProductSearchParams,
  PaginatedResponse,
} from '../types';

/**
 * Search products with filters
 */
export const getProducts = async (params?: ProductSearchParams): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<{ products: Product[]; totalCount: number; page: number; size: number }>('/products', { params });
  return {
    data: response.data.products,
    total: response.data.totalCount,
    page: response.data.page,
    size: response.data.size,
  };
};

/**
 * Get product by ID
 */
export const getProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/slug/${slug}`);
  return response.data;
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (categoryId: string, params?: { page?: number; size?: number }): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<{ products: Product[]; total: number; page: number; size: number }>(`/products/category/${categoryId}`, { params });
  return {
    data: response.data.products,
    total: response.data.total,
    page: response.data.page,
    size: response.data.size,
  };
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (params?: { page?: number; size?: number }): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<{ products: Product[]; total: number; page: number; size: number }>('/products/featured', { params });
  return {
    data: response.data.products,
    total: response.data.total,
    page: response.data.page,
    size: response.data.size,
  };
};

/**
 * Create new product
 */
export const createProduct = async (data: CreateProductRequest): Promise<Product> => {
  const response = await apiClient.post<Product>('/products', data);
  return response.data;
};

/**
 * Update product
 */
export const updateProduct = async (id: string, data: UpdateProductRequest): Promise<Product> => {
  const response = await apiClient.put<Product>(`/products/${id}`, data);
  return response.data;
};

/**
 * Delete product
 */
export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};

/**
 * Get variant by ID
 */
export const getVariant = async (id: string): Promise<ProductVariant> => {
  const response = await apiClient.get<ProductVariant>(`/variants/${id}`);
  return response.data;
};

/**
 * Create product variant
 */
export const createVariant = async (data: Omit<CreateProductRequest, 'name' | 'slug' | 'shortDescription' | 'description' | 'categoryId' | 'brandId' | 'vendorId'> & { productId: string }): Promise<ProductVariant> => {
  const response = await apiClient.post<ProductVariant>('/variants', data);
  return response.data;
};

/**
 * Update variant
 */
export const updateVariant = async (id: string, data: Omit<CreateProductRequest, 'name' | 'slug' | 'shortDescription' | 'description' | 'categoryId' | 'brandId' | 'vendorId'> & { productId?: string }): Promise<ProductVariant> => {
  const response = await apiClient.put<ProductVariant>(`/variants/${id}`, data);
  return response.data;
};

/**
 * Delete variant
 */
export const deleteVariant = async (id: string): Promise<void> => {
  await apiClient.delete(`/variants/${id}`);
};
