/**
 * Display Components
 *
 * Reusable components for displaying data with formatting.
 */

// Status badges
export { StatusBadge, StatusDot } from './StatusBadge';
export type { StatusBadgeProps, StatusVariant } from './StatusBadge';

// Specialized status badges
export {
  OrderStatusBadge,
  PaymentStatusBadge,
  InventoryStatusBadge,
  FulfillmentStatusBadge,
} from './StatusBadges';
export type {
  OrderStatus,
  OrderStatusBadgeProps,
  PaymentStatus,
  PaymentStatusBadgeProps,
  InventoryStatus,
  InventoryStatusBadgeProps,
  FulfillmentStatus,
  FulfillmentStatusBadgeProps,
} from './StatusBadges';

// Money display
export { Money, CompactMoney, formatMoney } from './Money';
export type { MoneyProps } from './Money';

// Date/time display
export { DateTime, DateRange, formatDate } from './DateTime';
export type { DateTimeProps, DateTimeFormat } from './DateTime';
