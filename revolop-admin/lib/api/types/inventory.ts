/**
 * Inventory types
 */

export enum InventoryAdjustType {
  ADD = 'ADD',
  RESERVE = 'RESERVE',
  RELEASE = 'RELEASE',
  SHIP = 'SHIP',
  DAMAGED = 'DAMAGED',
}

export interface Inventory {
  id: string;
  variantId: string;
  variantSku: string;
  warehouseId: string;
  warehouseName: string;
  onHand: number;
  reserved: number;
  damaged: number;
  available: number;
  inStock: boolean;
}

export interface CreateInventoryRequest {
  variantId: string;
  warehouseId: string;
  onHand: number;
  reserved?: number;
  damaged?: number;
}

export interface AdjustInventoryRequest {
  type: InventoryAdjustType;
  quantity: number;
}

export interface InventoryMovement {
  id: string;
  variantId: string;
  warehouseId: string;
  variantSku?: string;
  warehouseName?: string;
  type: InventoryAdjustType;
  quantity: number;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
  createdAt: string;
}

export interface AvailableQuantity {
  available: number;
}
