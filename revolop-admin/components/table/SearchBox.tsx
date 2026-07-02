/**
 * SearchBox Component
 *
 * A debounced search input component for filtering tables and lists.
 * Prevents excessive API calls by debouncing user input.
 */

'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SearchBoxProps {
  /** Placeholder text for the input */
  placeholder?: string;
  /** Current search value */
  value?: string;
  /** Callback when debounced search value changes */
  onValueChange: (value: string) => void;
  /** Delay in milliseconds before triggering onValueChange (default: 300ms) */
  debounceMs?: number;
  /** Additional className for styling */
  className?: string;
}

/**
 * Debounced search input component.
 *
 * @example
 * ```tsx
 * <SearchBox
 *   placeholder="Search products..."
 *   value={search}
 *   onValueChange={(value) => setSearch(value)}
 * />
 * ```
 */
export function SearchBox({
  placeholder = 'Search...',
  value: controlledValue,
  onValueChange,
  debounceMs = 300,
  className,
}: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(controlledValue ?? '');

  // Update local value when controlled value changes externally
  useEffect(() => {
    setLocalValue(controlledValue ?? '');
  }, [controlledValue]);

  // Debounce the search value
  useEffect(() => {
    const timer = setTimeout(() => {
      onValueChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onValueChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    },
    []
  );

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className="pl-9"
      />
    </div>
  );
}
