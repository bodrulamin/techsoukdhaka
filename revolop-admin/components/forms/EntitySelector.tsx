/**
 * EntitySelector Component
 *
 * A searchable dropdown component for selecting entities (products, customers, vendors, etc.).
 * Supports async loading, custom display, and multi-selection.
 *
 * @example
 * ```tsx
 * <EntitySelector
 *   label="Select Product"
 *   placeholder="Search products..."
 *   fetchOptions={search => fetchProducts(search)}
 *   displayKey="name"
 *   value={productId}
 *   onChange={setProductId}
 * />
 * ```
 */

'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface EntityOption {
  value: string;
  label: string;
  [key: string]: any;
}

export interface EntitySelectorProps {
  /** Label for the selector */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Currently selected value(s) */
  value?: string | string[];
  /** Callback when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Function to fetch options (search string -> Promise<EntityOption[]>) */
  fetchOptions: (search: string) => Promise<EntityOption[]> | EntityOption[];
  /** Minimum characters before triggering search */
  minSearchLength?: number;
  /** Key to display in options (default: 'label') */
  displayKey?: string;
  /** Enable multi-selection */
  multiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Description text */
  description?: string;
  /** Debounce delay for search (ms) */
  debounceMs?: number;
  /** Additional className */
  className?: string;
  /** Custom render function for selected display */
  renderSelected?: (option: EntityOption) => React.ReactNode;
}

/**
 * Entity selector with async search and multi-selection support.
 */
export function EntitySelector({
  label,
  placeholder = 'Select...',
  value: controlledValue,
  onChange,
  fetchOptions,
  minSearchLength = 0,
  displayKey = 'label',
  multiple = false,
  disabled = false,
  required = false,
  error,
  description,
  debounceMs = 300,
  className,
  renderSelected,
}: EntitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<EntityOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Handle search with debounce
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(async () => {
      if (search.length >= minSearchLength) {
        setLoading(true);
        try {
          const results = await Promise.resolve(fetchOptions(search));
          setOptions(results);
        } catch (err) {
          console.error('Error fetching options:', err);
          setOptions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setOptions([]);
      }
    }, debounceMs);

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [search, fetchOptions, minSearchLength, debounceMs]);

  // Load initial options when popover opens
  useEffect(() => {
    if (open && minSearchLength === 0 && options.length === 0) {
      setLoading(true);
      Promise.resolve(fetchOptions(''))
        .then(setOptions)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [open, fetchOptions, minSearchLength, options.length]);

  // Handle selection
  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (multiple) {
        const currentValues = (controlledValue as string[]) || [];
        const newValues = currentValues.includes(selectedValue)
          ? currentValues.filter((v) => v !== selectedValue)
          : [...currentValues, selectedValue];
        onChange?.(newValues);
      } else {
        onChange?.(selectedValue);
        setOpen(false);
      }
    },
    [multiple, controlledValue, onChange]
  );

  // Get selected option(s)
  const selectedOptions = useMemo(() => {
    if (!controlledValue) return [];
    const values = Array.isArray(controlledValue) ? controlledValue : [controlledValue];
    return values
      .map((v) => options.find((opt) => opt.value === v))
      .filter(Boolean) as EntityOption[];
  }, [controlledValue, options]);

  const selectedDisplay = useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length === 1) {
      const opt = selectedOptions[0];
      return renderSelected ? renderSelected(opt) : opt[displayKey];
    }
    return `${selectedOptions.length} selected`;
  }, [selectedOptions, placeholder, displayKey, renderSelected]);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className={cn(required && 'after:content-["*"] after:ml-0.5 after:text-destructive')}>
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={<button
            type="button"
            disabled={disabled}
            className={cn(
              'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive',
              disabled && 'cursor-not-allowed'
            )}
          >
            <span className={cn('truncate text-left', !selectedOptions.length && 'text-muted-foreground')}>
              {selectedDisplay}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>}
        />
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search..."
              value={search}
              onValueChange={setSearch}
              className="border-0 focus:ring-0"
            />
            <CommandList>
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <CommandEmpty>
                    {search.length < minSearchLength
                      ? `Type at least ${minSearchLength} characters to search`
                      : 'No results found'}
                  </CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = multiple
                        ? (controlledValue as string[])?.includes(option.value)
                        : controlledValue === option.value;

                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => handleSelect(option.value)}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-1 items-center gap-2">
                            {renderSelected ? (
                              renderSelected(option)
                            ) : (
                              <span className="truncate">{option[displayKey]}</span>
                            )}
                          </div>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

/**
 * Preset entity selectors for common use cases
 */
export const EntitySelectors = {
  Product: (props: Omit<EntitySelectorProps, 'displayKey'>) => (
    <EntitySelector displayKey="name" {...props} />
  ),

  Category: (props: Omit<EntitySelectorProps, 'displayKey'>) => (
    <EntitySelector displayKey="name" {...props} />
  ),

  Customer: (props: Omit<EntitySelectorProps, 'displayKey'>) => (
    <EntitySelector displayKey="name" {...props} />
  ),

  Vendor: (props: Omit<EntitySelectorProps, 'displayKey'>) => (
    <EntitySelector displayKey="name" {...props} />
  ),

  Warehouse: (props: Omit<EntitySelectorProps, 'displayKey'>) => (
    <EntitySelector displayKey="name" {...props} />
  ),
};
