/**
 * PageHeaderActions - Container for page header action buttons
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderActionsProps {
  children: ReactNode;
  className?: string;
}

export function PageHeaderActions({ children, className }: PageHeaderActionsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {children}
    </div>
  );
}
