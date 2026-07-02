/**
 * Warehouse types
 */

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  enabled: boolean;
}

export interface CreateWarehouseRequest {
  name: string;
  code: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface UpdateWarehouseRequest extends CreateWarehouseRequest {
  id: string;
}
