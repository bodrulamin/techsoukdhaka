/**
 * Attribute API endpoints
 */

import apiClient from '../client';
import type { Attribute, CreateAttributeRequest } from '../types';

/**
 * Get all attributes
 */
export const getAttributes = async (): Promise<Attribute[]> => {
  const response = await apiClient.get<Attribute[]>('/attributes');
  return response.data;
};

/**
 * Get attribute by ID
 */
export const getAttribute = async (id: string): Promise<Attribute> => {
  const response = await apiClient.get<Attribute>(`/attributes/${id}`);
  return response.data;
};

/**
 * Create new attribute
 */
export const createAttribute = async (data: CreateAttributeRequest): Promise<Attribute> => {
  const response = await apiClient.post<Attribute>('/attributes', data);
  return response.data;
};

/**
 * Update attribute
 */
export const updateAttribute = async (id: string, data: CreateAttributeRequest): Promise<Attribute> => {
  const response = await apiClient.put<Attribute>(`/attributes/${id}`, data);
  return response.data;
};

/**
 * Delete attribute
 */
export const deleteAttribute = async (id: string): Promise<void> => {
  await apiClient.delete(`/attributes/${id}`);
};
