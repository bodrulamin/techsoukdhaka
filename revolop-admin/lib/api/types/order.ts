/**
 * Order types
 */

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  REFUNDED = 'REFUNDED',
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  sku: string;
  productName: string;
  productSlug: string;
  variantName: string;
  quantity: number;
  price: number;
  costPrice: number;
  lineTotal: number;
  lineCost: number;
  lineProfit: number;
  profitMargin: number;
}

export enum AddressType {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
}

export interface OrderAddress {
  id: string;
  orderId: string;
  type: AddressType;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  fullName: string;
  fullAddress: string;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  fromStatus: OrderStatus | null;
  toStatus: OrderStatus;
  reason: string;
  changedBy: string;
  changedByUser?: string;
  changedAt: string;
  changeDescription: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  status: OrderStatus;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  items: OrderItem[];
  addresses: OrderAddress[];
  statusHistory: OrderStatusHistory[];
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  currency: string;
  totalItems: number;
  createdAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface CreateOrderRequest {
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  shippingAddress?: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  reason?: string;
}

export interface CancelOrderRequest {
  reason: string;
}

export interface OrderSearchParams {
  page?: number;
  size?: number;
  status?: OrderStatus;
}
