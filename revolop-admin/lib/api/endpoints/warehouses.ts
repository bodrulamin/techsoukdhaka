/**
 * Warehouse API endpoints
 */

import apiClient from '../client';
import type { Warehouse, CreateWarehouseRequest, UpdateWarehouseRequest } from '../types';

/**
 * Get all warehouses
 */
export const getWarehouses = async (): Promise<Warehouse[]> => {
  const response = await apiClient.get<Warehouse[]>('/warehouses');
  return response.data;
};

/**
 * Get warehouse by ID
 */
export const getWarehouse = async (id: string): Promise<Warehouse> => {
  const response = await apiClient.get<Warehouse>(`/warehouses/${id}`);
  return response.data;
};

/**
 * Create new warehouse
 */
export const createWarehouse = async (data: CreateWarehouseRequest): Promise<Warehouse> => {
  const response = await apiClient.post<Warehouse>('/warehouses', data);
  return response.data;
};

/**
 * Update warehouse
 */
export const updateWarehouse = async (id: string, data: UpdateWarehouseRequest): Promise<Warehouse> => {
  const response = await apiClient.put<Warehouse>(`/warehouses/${id}`, data);
  return response.data;
};

/**
 * Delete warehouse
 */
export const deleteWarehouse = async (id: string): Promise<void> => {
  await apiClient.delete(`/warehouses/${id}`);
};
