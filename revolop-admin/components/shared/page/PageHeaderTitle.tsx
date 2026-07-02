/**
 * PageHeaderTitle - Standalone page title component
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderTitleProps {
  children: ReactNode;
  className?: string;
}

export function PageHeaderTitle({ children, className }: PageHeaderTitleProps) {
  return (
    <h1 className={cn('text-3xl font-bold tracking-tight', className)}>
      {children}
    </h1>
  );
}
