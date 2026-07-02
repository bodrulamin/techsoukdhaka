/**
 * Brand API endpoints
 */

import apiClient from '../client';
import type { Brand, CreateBrandRequest, UpdateBrandRequest } from '../types';

/**
 * Get all brands
 */
export const getBrands = async (): Promise<Brand[]> => {
  const response = await apiClient.get<Brand[]>('/brands');
  return response.data;
};

/**
 * Get brand by ID
 */
export const getBrand = async (id: string): Promise<Brand> => {
  const response = await apiClient.get<Brand>(`/brands/${id}`);
  return response.data;
};

/**
 * Get brand by slug
 */
export const getBrandBySlug = async (slug: string): Promise<Brand> => {
  const response = await apiClient.get<Brand>(`/brands/slug/${slug}`);
  return response.data;
};

/**
 * Create new brand
 */
export const createBrand = async (data: CreateBrandRequest): Promise<Brand> => {
  const response = await apiClient.post<Brand>('/brands', data);
  return response.data;
};

/**
 * Update brand
 */
export const updateBrand = async (id: string, data: UpdateBrandRequest): Promise<Brand> => {
  const response = await apiClient.put<Brand>(`/brands/${id}`, data);
  return response.data;
};

/**
 * Delete brand
 */
export const deleteBrand = async (id: string): Promise<void> => {
  await apiClient.delete(`/brands/${id}`);
};
