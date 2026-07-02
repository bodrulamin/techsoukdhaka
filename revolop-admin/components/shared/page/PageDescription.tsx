/**
 * PageDescription - Page description/subtitle component
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function PageDescription({ children, className }: PageDescriptionProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>
      {children}
    </p>
  );
}
