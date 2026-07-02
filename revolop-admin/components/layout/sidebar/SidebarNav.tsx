/**
 * Sidebar navigation component
 */

'use client';

import { LayoutDashboard, Package, ShoppingCart, Warehouse, Users, FileText, Settings, Tags } from 'lucide-react';
import { SidebarNavLink } from './SidebarNavLink';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
  { name: 'Products', href: '/products', icon: <Package /> },
  { name: 'Orders', href: '/orders', icon: <ShoppingCart /> },
  { name: 'Inventory', href: '/inventory', icon: <Warehouse /> },
  { name: 'Categories', href: '/categories', icon: <Tags /> },
  { name: 'Customers', href: '/customers', icon: <Users /> },
  { name: 'Reports', href: '/reports', icon: <FileText /> },
  { name: 'Settings', href: '/settings', icon: <Settings /> },
];

interface SidebarNavProps {
  onItemClick?: () => void;
}

export function SidebarNav({ onItemClick }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1 px-2 py-4">
      {navigation.map((item) => (
        <SidebarNavLink
          key={item.name}
          href={item.href}
          icon={item.icon}
          label={item.name}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
}
