/**
 * StatusBadge Component
 *
 * Generic status badge with color coding.
 * Supports predefined variants and custom colors.
 *
 * @example
 * ```tsx
 * <StatusBadge status="active" />
 * <StatusBadge status="pending" variant="warning" />
 * <StatusBadge status="failed" variant="error" />
 * ```
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type StatusVariant = 'success' | 'warning' | 'error' | 'neutral' | 'info';

export interface StatusBadgeProps {
  /** Status value to display */
  status: string;
  /** Explicit variant override */
  variant?: StatusVariant;
  /** Show dot indicator */
  showDot?: boolean;
  /** Icon to display */
  icon?: ReactNode;
  /** Custom label (defaults to capitalized status) */
  label?: string;
  /** Additional className */
  className?: string;
}

/**
 * Status variant mapping by common status values
 */
const statusVariantMap: Record<string, StatusVariant> = {
  // Success variants
  active: 'success',
  completed: 'success',
  success: 'success',
  paid: 'success',
  delivered: 'success',
  published: 'success',
  verified: 'success',
  approved: 'success',
  enabled: 'success',
  online: 'success',
  in_stock: 'success',

  // Warning variants
  pending: 'warning',
  processing: 'warning',
  review: 'warning',
  low_stock: 'warning',
  draft: 'warning',
  scheduled: 'warning',
  paused: 'warning',

  // Error variants
  failed: 'error',
  error: 'error',
  cancelled: 'error',
  rejected: 'error',
  disabled: 'error',
  offline: 'error',
  out_of_stock: 'error',
  expired: 'error',

  // Info variants
  info: 'info',
  new: 'info',
  shipped: 'info',
  refunded: 'info',

  // Neutral (default)
  unknown: 'neutral',
  archived: 'neutral',
};

/**
 * Variant color mapping
 */
const variantColors: Record<StatusVariant, string> = {
  success: 'bg-success/10 text-success border-success/20 hover:bg-success/15',
  warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/15',
  error: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15',
  neutral: 'bg-muted text-muted-foreground border-muted-foreground/20 hover:bg-muted/70',
  info: 'bg-info/10 text-info border-info/20 hover:bg-info/15',
};

/**
 * Dot color mapping
 */
const variantDotColors: Record<StatusVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-destructive',
  neutral: 'bg-muted-foreground',
  info: 'bg-info',
};

/**
 * Generic status badge with automatic color coding.
 */
export function StatusBadge({
  status,
  variant: explicitVariant,
  showDot = false,
  icon,
  label,
  className,
}: StatusBadgeProps) {
  // Determine variant from status or use explicit
  const variant = explicitVariant || statusVariantMap[status.toLowerCase()] || 'neutral';

  // Format label: capitalize and replace underscores
  const displayLabel = label || status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-normal whitespace-nowrap',
        variantColors[variant],
        className
      )}
    >
      {showDot && (
        <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', variantDotColors[variant])} />
      )}
      {icon && <span className="mr-1">{icon}</span>}
      {displayLabel}
    </Badge>
  );
}

/**
 * Quick status indicators with dot only
 */
export function StatusDot({ variant = 'neutral' }: { variant?: StatusVariant }) {
  return <span className={cn('h-2 w-2 rounded-full', variantDotColors[variant])} />;
}
