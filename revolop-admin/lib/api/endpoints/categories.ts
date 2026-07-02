/**
 * Category API endpoints
 */

import apiClient from '../client';
import type {
  Category,
  CategoryTree,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../types';

/**
 * Get all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories');
  return response.data;
};

/**
 * Get category tree (nested structure)
 */
export const getCategoryTree = async (): Promise<CategoryTree[]> => {
  const response = await apiClient.get<CategoryTree[]>('/categories/tree');
  return response.data;
};

/**
 * Get root categories (level 0)
 */
export const getRootCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories/roots');
  return response.data;
};

/**
 * Get category by ID
 */
export const getCategory = async (id: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`/categories/${id}`);
  return response.data;
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`/categories/slug/${slug}`);
  return response.data;
};

/**
 * Create new category
 */
export const createCategory = async (data: CreateCategoryRequest): Promise<Category> => {
  const response = await apiClient.post<Category>('/categories', data);
  return response.data;
};

/**
 * Update category
 */
export const updateCategory = async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
  const response = await apiClient.put<Category>(`/categories/${id}`, data);
  return response.data;
};

/**
 * Delete category
 */
export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};
