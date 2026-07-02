/**
 * Main content wrapper component
 */

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main className={`flex-1 overflow-auto p-4 md:p-6 ${className || ''}`}>
      {children}
    </main>
  );
}
