/**
 * Order API endpoints
 */

import apiClient from '../client';
import type {
  Order,
  OrderSummary,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  CancelOrderRequest,
  OrderSearchParams,
  PaginatedResponse,
} from '../types';

/**
 * Get all orders (admin)
 */
export const getOrders = async (params?: OrderSearchParams): Promise<PaginatedResponse<OrderSummary>> => {
  const response = await apiClient.get<OrderSummary[]>('/admin/orders', { params });
  return {
    data: response.data,
    total: response.data.length,
    page: params?.page || 0,
    size: params?.size || 20,
  };
};

/**
 * Get order by ID
 */
export const getOrder = async (id: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/admin/orders/${id}`);
  return response.data;
};

/**
 * Get order by order number
 */
export const getOrderByNumber = async (orderNumber: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/orders/number/${orderNumber}`);
  return response.data;
};

/**
 * Update order status (admin)
 */
export const updateOrderStatus = async (id: string, data: UpdateOrderStatusRequest): Promise<Order> => {
  const response = await apiClient.put<Order>(`/admin/orders/${id}/status`, data);
  return response.data;
};

/**
 * Create order from cart
 */
export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  const response = await apiClient.post<Order>('/orders', data);
  return response.data;
};

/**
 * Cancel order
 */
export const cancelOrder = async (id: string, data: CancelOrderRequest): Promise<Order> => {
  const response = await apiClient.put<Order>(`/orders/${id}/cancel`, data);
  return response.data;
};

/**
 * Get order status history
 */
export const getOrderHistory = async (id: string): Promise<Order['statusHistory']> => {
  const response = await apiClient.get<Order['statusHistory']>(`/orders/${id}/history`);
  return response.data;
};
