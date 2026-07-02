/**
 * PageLayout Component
 *
 * Wrapper component for consistent page structure.
 * Combines layout, header, and content areas.
 *
 * Note: The main dashboard layout is already implemented in app/(dashboard)/layout.tsx
 * This component is for additional page-level layout needs.
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  /** Maximum width of content */
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Page layout wrapper with consistent spacing and max width.
 */
export function PageLayout({
  children,
  className,
  maxWidth = 'xl',
  padding = 'lg',
}: PageLayoutProps) {
  const maxWidthClasses = {
    none: '',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Centered layout for focused content (forms, modals, etc.)
 */
export function CenteredLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex min-h-screen items-center justify-center p-4', className)}>
      {children}
    </div>
  );
}
