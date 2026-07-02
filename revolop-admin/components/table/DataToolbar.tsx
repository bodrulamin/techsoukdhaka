/**
 * DataToolbar Component
 *
 * A toolbar component that sits above the DataTable.
 * Combines search, filters, and bulk actions with responsive layout.
 *
 * @example
 * ```tsx
 * <DataToolbar
 *   search={<SearchBox placeholder="Search products..." />}
 *   filters={<ProductFilters />}
 *   actions={<Button>Add Product</Button>}
 * />
 * ```
 */

'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { ReactNode } from 'react';

export interface DataToolbarProps {
  /** Search component (typically SearchBox) */
  search?: ReactNode;
  /** Filter components (dropdowns, checkboxes, etc.) */
  filters?: ReactNode;
  /** Primary action button (e.g., "Add Product") */
  actions?: ReactNode;
  /** Additional actions on the right side */
  additionalActions?: ReactNode;
  /** Show a divider before actions */
  showSeparator?: boolean;
  /** Compact mode for smaller screens */
  compact?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Data toolbar for tables with search, filters, and actions.
 */
export function DataToolbar({
  search,
  filters,
  actions,
  additionalActions,
  showSeparator = true,
  compact = false,
  className,
}: DataToolbarProps) {
  const hasContent = search || filters || actions || additionalActions;

  if (!hasContent) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-4 py-4',
        !compact && 'md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      {/* Left side: Search and Filters */}
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        {search && (
          <div className={cn('w-full', filters && 'sm:max-w-xs')}>
            {search}
          </div>
        )}

        {/* Filters */}
        {filters && (
          <>
            {search && (
              <Separator
                orientation="vertical"
                className="hidden h-8 sm:block"
              />
            )}
            <div className="flex items-center gap-2">
              {filters}
            </div>
          </>
        )}
      </div>

      {/* Right side: Actions */}
      {(actions || additionalActions) && (
        <>
          {showSeparator && (search || filters) && (
            <div className="hidden md:block">
              <Separator orientation="vertical" className="h-8" />
            </div>
          )}
          <div className="flex items-center gap-2 sm:ml-auto">
            {additionalActions}
            {actions}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Preset toolbar action button with icon
 */
export function ToolbarAction({
  label,
  icon: Icon = Plus,
  variant = 'default',
  onClick,
  disabled = false,
}: {
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}

/**
 * Filter button component for toggling filter panels
 */
export function FilterToggle({
  active = false,
  onClick,
  label = 'Filter',
}: {
  active?: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="default"
      onClick={onClick}
    >
      <SlidersHorizontal className="mr-2 h-4 w-4" />
      {label}
      {active && (
        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/20 text-xs">
          {/* Could show active filter count here */}
          <span className="sr-only">Filters active</span>
        </span>
      )}
    </Button>
  );
}

/**
 * Quick action buttons row (secondary actions)
 */
export function QuickActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}
