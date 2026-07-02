/**
 * LoadingOverlay Component
 *
 * Full-page or container loading overlay with spinner.
 *
 * @example
 * ```tsx
 * <LoadingOverlay message="Loading products..." />
 * ```
 */

'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface LoadingOverlayProps {
  /** Loading message */
  message?: string;
  /** Whether to overlay full page */
  fullScreen?: boolean;
  /** Additional className */
  className?: string;
  /** Custom icon */
  icon?: ReactNode;
}

/**
 * Loading overlay for full-page or container loading states.
 */
export function LoadingOverlay({
  message = 'Loading...',
  fullScreen = false,
  className,
  icon,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 p-8',
        fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      {icon || <Loader2 className="h-8 w-8 animate-spin text-primary" />}
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

/**
 * Inline loading spinner for smaller areas
 */
export function LoadingSpinner({
  size = 'default',
  className,
}: {
  size?: 'small' | 'default' | 'large';
  className?: string;
}) {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-6 w-6',
    large: 'h-8 w-8',
  };

  return (
    <Loader2 className={cn('animate-spin text-primary', sizeClasses[size], className)} />
  );
}
