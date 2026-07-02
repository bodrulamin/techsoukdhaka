/**
 * EmptyState Component
 *
 * A reusable empty state component for tables and lists.
 * Displays an icon, title, description, and optional action button.
 */

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ReactElement, ReactNode } from 'react';

export interface EmptyStateProps {
  /** Icon to display (Lucide icon component) */
  icon?: LucideIcon;
  /** Custom icon element (overrides icon prop) */
  iconElement?: ReactElement;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Label for the action button */
  actionLabel?: string;
  /** onClick handler for the action button */
  onAction?: () => void;
  /** Variant of the action button */
  actionVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  /** Additional className for the container */
  className?: string;
}

/**
 * Empty state component for tables and lists.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={Package}
 *   title="No products found"
 *   description="Get started by creating your first product."
 *   actionLabel="Create Product"
 *   onAction={() => router.push('/products/new')}
 * />
 * ```
 */
export function EmptyState({
  icon: Icon,
  iconElement,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'default',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
        {iconElement ? iconElement : Icon ? <Icon className="h-8 w-8 text-muted-foreground" /> : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant={actionVariant} className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/**
 * Preset empty states for common use cases
 */
export const EmptyStates = {
  NoResults: ({ search }: { search?: string }) => (
    <EmptyState
      iconElement={
        search ? (
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        ) : undefined
      }
      title={search ? 'No results found' : 'No data yet'}
      description={
        search
          ? `No results match your search "${search}". Try different filters.`
          : 'This list is empty. Get started by creating your first item.'
      }
    />
  ),

  NoProducts: ({ onCreate }: { onCreate?: () => void }) => (
    <EmptyState
      iconElement={
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      }
      title="No products yet"
      description="Get started by adding your first product to your catalog."
      actionLabel="Create Product"
      onAction={onCreate}
    />
  ),

  NoOrders: ({ onCreate }: { onCreate?: () => void }) => (
    <EmptyState
      iconElement={
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      }
      title="No orders yet"
      description="Orders will appear here once customers start making purchases."
      actionLabel="Create Test Order"
      onAction={onCreate}
    />
  ),

  NoInventory: () => (
    <EmptyState
      iconElement={
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      }
      title="No inventory items"
      description="Inventory records will appear here after adding products."
    />
  ),

  Error: ({ message = 'Something went wrong', onRetry }: { message?: string; onRetry?: () => void }) => (
    <EmptyState
      iconElement={
        <svg
          className="h-8 w-8 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      title="Error loading data"
      description={message}
      actionLabel="Try Again"
      onAction={onRetry}
      actionVariant="outline"
    />
  ),
};
