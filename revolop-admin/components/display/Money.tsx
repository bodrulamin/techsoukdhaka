/**
 * Money Component
 *
 * Formatted currency display component.
 * Handles different currencies and formats.
 *
 * @example
 * ```tsx
 * <Money amount={1234.56} currency="USD" />
 * <Money amount={99.99} currency="EUR" locale="de-DE" />
 * ```
 */

'use client';

import { cn } from '@/lib/utils';

export interface MoneyProps {
  /** Amount to display */
  amount: number;
  /** Currency code (ISO 4217) */
  currency?: string;
  /** Locale for formatting (default: en-US) */
  locale?: string;
  /** Show currency code instead of symbol */
  showCode?: boolean;
  /** Fraction digits (default: 2) */
  fractionDigits?: number;
  /** Additional className */
  className?: string;
  /** Display negative amounts in parentheses (accounting format) */
  accounting?: boolean;
}

/**
 * Formatted money display.
 */
export function Money({
  amount,
  currency = 'USD',
  locale = 'en-US',
  showCode = false,
  fractionDigits = 2,
  className,
  accounting = false,
}: MoneyProps) {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(absAmount);

  let display: string;

  if (showCode) {
    // Replace symbol with code
    const parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).formatToParts(absAmount);
    const symbolPart = parts.find((part) => part.type === 'currency');
    if (symbolPart) {
      display = formatted.replace(symbolPart.value, currency + ' ');
    } else {
      display = formatted;
    }
  } else {
    display = formatted;
  }

  if (isNegative) {
    if (accounting) {
      display = `(${display})`;
    } else {
      display = `-${display}`;
    }
  }

  return (
    <span className={cn('font-mono tabular-nums', className)}>
      {display}
    </span>
  );
}

/**
 * Quick format function for JavaScript usage
 */
export function formatMoney(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Compact money display (e.g., $1.2K, $3.4M)
 */
export function CompactMoney({
  amount,
  currency = 'USD',
  locale = 'en-US',
  className,
}: Omit<MoneyProps, 'showCode' | 'fractionDigits' | 'accounting'>) {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(amount);

  return <span className={cn('font-mono tabular-nums', className)}>{formatted}</span>;
}
