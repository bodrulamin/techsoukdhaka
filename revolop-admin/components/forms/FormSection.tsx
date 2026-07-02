/**
 * Form Section Helpers
 *
 * Simple layout helpers for forms. Use shadcn Card components for the actual UI.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Product Information</CardTitle>
 *     <CardDescription>Basic product details</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <FormGrid>
 *       <FormField>...</FormField>
 *       <FormField>...</FormField>
 *     </FormGrid>
 *   </CardContent>
 * </Card>
 * ```
 */

'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/**
 * Form grid for 2-column layouts
 */
export function FormGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {children}
    </div>
  );
}

/**
 * Form grid for 3-column layouts
 */
export function FormGrid3({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {children}
    </div>
  );
}

/**
 * Form field row for inline form fields
 */
export function FormRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-end gap-4', className)}>
      {children}
    </div>
  );
}

/**
 * Form actions section (submit, cancel buttons)
 */
export function FormActions({
  children,
  align = 'right',
  className,
}: {
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex gap-3 pt-4',
        align === 'right' && 'justify-end',
        align === 'center' && 'justify-center',
        align === 'left' && 'justify-start',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Form separator
 */
export function FormSeparator() {
  return <div className="h-px border-b my-6" />;
}

// Alias for Card section (just use Card from shadcn)
export { Card as FormSection } from '@/components/ui/card';
