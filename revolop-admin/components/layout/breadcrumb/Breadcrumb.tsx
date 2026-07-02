/**
 * Breadcrumb navigation component
 */

'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const defaultItems: BreadcrumbItem[] = [{ label: 'Home', href: '/dashboard' }];
  const breadcrumbItems = items || defaultItems;

  return (
    <nav className={cn('flex items-center gap-1.5 text-sm text-muted-foreground', className)}>
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {index === 0 && <Home className="size-4" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="size-4" />
          )}
        </div>
      ))}
    </nav>
  );
}
