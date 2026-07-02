/**
 * Status Badge Components
 *
 * Specialized badges for order, payment, and inventory statuses.
 * These are thin wrappers around StatusBadge with predefined mappings.
 */

'use client';

import { Package, Truck, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * Order statuses
 */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'returned';

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  label?: string;
  showIcon?: boolean;
}

/**
 * Order status badge with appropriate colors and optional icons.
 */
export function OrderStatusBadge({ status, label, showIcon = false }: OrderStatusBadgeProps) {
  const iconMap: Record<OrderStatus, React.ReactNode> = {
    pending: <Clock className="h-3 w-3" />,
    confirmed: <CheckCircle className="h-3 w-3" />,
    processing: <Package className="h-3 w-3" />,
    shipped: <Truck className="h-3 w-3" />,
    delivered: <CheckCircle className="h-3 w-3" />,
    cancelled: <XCircle className="h-3 w-3" />,
    refunded: <AlertTriangle className="h-3 w-3" />,
    returned: <Package className="h-3 w-3" />,
  };

  return (
    <StatusBadge
      status={status}
      icon={showIcon ? iconMap[status] : undefined}
      label={label}
    />
  );
}

/**
 * Payment statuses
 */
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  label?: string;
  showIcon?: boolean;
}

/**
 * Payment status badge with appropriate colors.
 */
export function PaymentStatusBadge({ status, label, showIcon = false }: PaymentStatusBadgeProps) {
  const iconMap: Record<PaymentStatus, React.ReactNode> = {
    pending: <Clock className="h-3 w-3" />,
    processing: <Clock className="h-3 w-3" />,
    paid: <CheckCircle className="h-3 w-3" />,
    failed: <XCircle className="h-3 w-3" />,
    refunded: <AlertTriangle className="h-3 w-3" />,
    partially_refunded: <AlertTriangle className="h-3 w-3" />,
  };

  return (
    <StatusBadge
      status={status}
      icon={showIcon ? iconMap[status] : undefined}
      label={label}
    />
  );
}

/**
 * Inventory statuses
 */
export type InventoryStatus =
  | 'in_stock'
  | 'low_stock'
  | 'out_of_stock'
  | 'discontinued'
  | 'on_order';

export interface InventoryStatusBadgeProps {
  status: InventoryStatus;
  label?: string;
  showIcon?: boolean;
}

/**
 * Inventory status badge with appropriate colors.
 */
export function InventoryStatusBadge({ status, label, showIcon = false }: InventoryStatusBadgeProps) {
  const iconMap: Record<InventoryStatus, React.ReactNode> = {
    in_stock: <CheckCircle className="h-3 w-3" />,
    low_stock: <AlertTriangle className="h-3 w-3" />,
    out_of_stock: <XCircle className="h-3 w-3" />,
    discontinued: <XCircle className="h-3 w-3" />,
    on_order: <Package className="h-3 w-3" />,
  };

  return (
    <StatusBadge
      status={status}
      icon={showIcon ? iconMap[status] : undefined}
      label={label}
    />
  );
}

/**
 * Fulfillment statuses
 */
export type FulfillmentStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface FulfillmentStatusBadgeProps {
  status: FulfillmentStatus;
  label?: string;
  showIcon?: boolean;
}

/**
 * Fulfillment status badge.
 */
export function FulfillmentStatusBadge({ status, label, showIcon = false }: FulfillmentStatusBadgeProps) {
  const iconMap: Record<FulfillmentStatus, React.ReactNode> = {
    pending: <Clock className="h-3 w-3" />,
    processing: <Package className="h-3 w-3" />,
    shipped: <Truck className="h-3 w-3" />,
    delivered: <CheckCircle className="h-3 w-3" />,
    cancelled: <XCircle className="h-3 w-3" />,
    returned: <Package className="h-3 w-3" />,
  };

  return (
    <StatusBadge
      status={status}
      icon={showIcon ? iconMap[status] : undefined}
      label={label}
    />
  );
}
