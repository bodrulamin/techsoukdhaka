/**
 * Dashboard layout with sidebar and header
 * Mobile-responsive with collapsible sidebar
 */

'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header/Header';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import { MainContent } from '@/components/layout/main/MainContent';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { SidebarNav } from '@/components/layout/sidebar/SidebarNav';
import { SidebarFooter } from '@/components/layout/sidebar/SidebarFooter';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              R
            </div>
            <span className="font-bold">Revolop Admin</span>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <SidebarNav />
          </div>

          {/* Footer */}
          <SidebarFooter />
        </div>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center gap-2 border-b px-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                R
              </div>
              <span className="font-bold">Revolop Admin</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
              <SidebarNav onItemClick={() => setMobileSidebarOpen(false)} />
            </div>

            {/* Footer */}
            <SidebarFooter />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
