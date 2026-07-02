/**
 * FilterPanel Component
 *
 * A panel component for displaying and managing filter options.
 * Can be used inline or in a dropdown/popover.
 *
 * @example
 * ```tsx
 * <FilterPanel>
 *   <FilterSection title="Status">
 *     <FilterCheckbox label="Active" value="active" />
 *     <FilterCheckbox label="Inactive" value="inactive" />
 *   </FilterSection>
 * </FilterPanel>
 * ```
 */

'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export interface FilterPanelProps {
  /** Filter sections and controls */
  children: ReactNode;
  /** Function to call when clearing all filters */
  onClear?: () => void;
  /** Show the clear button */
  showClear?: boolean;
  /** Clear button label */
  clearLabel?: string;
  /** Additional className */
  className?: string;
}

/**
 * Filter panel container with optional clear button.
 */
export function FilterPanel({
  children,
  onClear,
  showClear = true,
  clearLabel = 'Clear all',
  className,
}: FilterPanelProps) {
  return (
    <div className={cn('space-y-4 p-4', className)}>
      {children}
      {showClear && onClear && (
        <>
          <Separator />
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={onClear}>
              <X className="mr-2 h-4 w-4" />
              {clearLabel}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export interface FilterSectionProps {
  /** Section title */
  title?: string;
  /** Filter controls in this section */
  children: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Grouped filter section with optional title.
 */
export function FilterSection({ title, children, className }: FilterSectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <div className="text-sm font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export interface FilterCheckboxProps {
  /** Checkbox label */
  label: string;
  /** Filter value */
  value: string;
  /** Whether this filter is active */
  active?: boolean;
  /** Callback when filter is toggled */
  onChange?: (value: string, active: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Checkbox filter control.
 */
export function FilterCheckbox({
  label,
  value,
  active = false,
  onChange,
  disabled = false,
  className,
}: FilterCheckboxProps) {
  const handleChange = (checked: boolean) => {
    onChange?.(value, checked);
  };

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted/50 has-[[data-disabled]]:pointer-events-none has-[[data-disabled]]:opacity-50',
        active && 'border-primary bg-primary/5',
        className
      )}
    >
      <input
        type="checkbox"
        checked={active}
        onChange={(e) => handleChange(e.target.checked)}
        disabled={disabled}
        data-disabled={disabled}
        className="h-4 w-4 rounded border-input"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export interface FilterRadioGroupProps {
  /** Group name */
  name: string;
  /** Radio options */
  options: Array<{ label: string; value: string }>;
  /** Selected value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Additional className */
  className?: string;
}

/**
 * Radio button filter group.
 */
export function FilterRadioGroup({
  name,
  options,
  value,
  onChange,
  className,
}: FilterRadioGroupProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted/50',
            value === option.value && 'border-primary bg-primary/5'
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            className="h-4 w-4 border-input"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
