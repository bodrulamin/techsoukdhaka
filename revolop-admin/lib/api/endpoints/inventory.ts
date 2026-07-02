/**
 * Inventory API endpoints
 */

import apiClient from '../client';
import type {
  Inventory,
  CreateInventoryRequest,
  AdjustInventoryRequest,
  InventoryMovement,
  AvailableQuantity,
} from '../types';

/**
 * Get all inventory
 */
export const getInventory = async (): Promise<Inventory[]> => {
  const response = await apiClient.get<Inventory[]>('/inventory');
  return response.data;
};

/**
 * Get inventory by variant
 */
export const getInventoryByVariant = async (variantId: string): Promise<Inventory[]> => {
  const response = await apiClient.get<Inventory[]>(`/inventory/variant/${variantId}`);
  return response.data;
};

/**
 * Get inventory by warehouse
 */
export const getInventoryByWarehouse = async (warehouseId: string): Promise<Inventory[]> => {
  const response = await apiClient.get<Inventory[]>(`/inventory/warehouse/${warehouseId}`);
  return response.data;
};

/**
 * Get specific inventory (variant + warehouse)
 */
export const getInventoryByVariantAndWarehouse = async (variantId: string, warehouseId: string): Promise<Inventory> => {
  const response = await apiClient.get<Inventory>(`/inventory/variant/${variantId}/warehouse/${warehouseId}`);
  return response.data;
};

/**
 * Get available quantity for variant
 */
export const getAvailableQuantity = async (variantId: string): Promise<AvailableQuantity> => {
  const response = await apiClient.get<AvailableQuantity>(`/inventory/variant/${variantId}/available`);
  return response.data;
};

/**
 * Create or update inventory
 */
export const createInventory = async (data: CreateInventoryRequest): Promise<Inventory> => {
  const response = await apiClient.post<Inventory>('/inventory', data);
  return response.data;
};

/**
 * Adjust inventory
 */
export const adjustInventory = async (variantId: string, warehouseId: string, data: AdjustInventoryRequest): Promise<Inventory> => {
  const response = await apiClient.put<Inventory>(`/inventory/variant/${variantId}/warehouse/${warehouseId}/adjust`, data);
  return response.data;
};

/**
 * Delete inventory
 */
export const deleteInventory = async (variantId: string, warehouseId: string): Promise<void> => {
  await apiClient.delete(`/inventory/variant/${variantId}/warehouse/${warehouseId}`);
};

/**
 * Get all inventory movements
 */
export const getInventoryMovements = async (params?: {
  variantId?: string;
  referenceType?: string;
  referenceId?: string;
  summary?: boolean;
}): Promise<InventoryMovement[]> => {
  const response = await apiClient.get<InventoryMovement[]>('/inventory-movements', { params });
  return response.data;
};

/**
 * Get inventory movement by ID
 */
export const getInventoryMovement = async (movementId: string): Promise<InventoryMovement> => {
  const response = await apiClient.get<InventoryMovement>(`/inventory-movements/${movementId}`);
  return response.data;
};

/**
 * Get movements by variant
 */
export const getMovementsByVariant = async (variantId: string): Promise<InventoryMovement[]> => {
  const response = await apiClient.get<InventoryMovement[]>(`/inventory-movements/variant/${variantId}`);
  return response.data;
};

/**
 * Get movements by reference
 */
export const getMovementsByReference = async (referenceType: string, referenceId: string): Promise<InventoryMovement[]> => {
  const response = await apiClient.get<InventoryMovement[]>(`/inventory-movements/reference/${referenceType}/${referenceId}`);
  return response.data;
};
