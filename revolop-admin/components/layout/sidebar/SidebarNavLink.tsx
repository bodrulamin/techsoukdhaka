/**
 * Sidebar navigation link component
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SidebarNavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  onClick?: () => void;
}

export function SidebarNavLink({ href, icon, label, badge, onClick }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <span className="size-5 shrink-0">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      )}
      <ChevronRight
        className={cn(
          'ml-auto size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100',
          isActive && 'opacity-100'
        )}
      />
    </Link>
  );
}
