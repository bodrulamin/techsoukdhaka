/**
 * DateTime Component
 *
 * Formatted date and time display component.
 * Supports various formats and relative time display.
 *
 * @example
 * ```tsx
 * <DateTime date="2024-01-15" />
 * <DateTime date={timestamp} format="long" relative />
 * ```
 */

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export type DateTimeFormat = 'short' | 'long' | 'full' | 'time' | 'datetime';

export interface DateTimeProps {
  /** Date to display (string, Date, or timestamp) */
  date: string | Date | number;
  /** Format style */
  format?: DateTimeFormat;
  /** Show relative time (e.g., "2 hours ago") */
  relative?: boolean;
  /** Locale for formatting */
  locale?: string;
  /** Additional className */
  className?: string;
  /** Custom date-fns format string (if using date-fns) */
  formatStr?: string;
}

/**
 * Formatted date and time display.
 */
export function DateTime({
  date,
  format = 'short',
  relative = false,
  locale = 'en-US',
  className,
}: DateTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dateObj = typeof date === 'string' ? new Date(date) : typeof date === 'number' ? new Date(date) : date;

  // Invalid date check
  if (isNaN(dateObj.getTime())) {
    return <span className={cn('text-muted-foreground', className)}>Invalid date</span>;
  }

  // Relative time display
  if (relative && mounted) {
    return <RelativeDate date={dateObj} locale={locale} className={className} />;
  }

  // Format options based on format prop
  const getFormatOptions = (): Intl.DateTimeFormatOptions => {
    switch (format) {
      case 'short':
        return { month: 'short', day: 'numeric', year: 'numeric' };
      case 'long':
        return { month: 'long', day: 'numeric', year: 'numeric' };
      case 'full':
        return {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
      case 'time':
        return { hour: 'numeric', minute: '2-digit' };
      case 'datetime':
        return {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        };
      default:
        return { month: 'short', day: 'numeric', year: 'numeric' };
    }
  };

  const options = getFormatOptions();

  const formatted = new Intl.DateTimeFormat(locale, options).format(dateObj);

  return <span className={cn('tabular-nums', className)}>{formatted}</span>;
}

/**
 * Relative date component (e.g., "2 hours ago")
 */
function RelativeDate({
  date,
  locale = 'en-US',
  className,
}: {
  date: Date;
  locale?: string;
  className?: string;
}) {
  const [relative, setRelative] = useState('');

  useEffect(() => {
    const updateRelative = () => {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);

      let value: string;
      let unit: string;

      if (diffSecs < 60) {
        value = 'just now';
        unit = '';
      } else if (diffMins < 60) {
        value = diffMins.toString();
        unit = diffMins === 1 ? 'minute' : 'minutes';
      } else if (diffHours < 24) {
        value = diffHours.toString();
        unit = diffHours === 1 ? 'hour' : 'hours';
      } else if (diffDays < 30) {
        value = diffDays.toString();
        unit = diffDays === 1 ? 'day' : 'days';
      } else if (diffMonths < 12) {
        value = diffMonths.toString();
        unit = diffMonths === 1 ? 'month' : 'months';
      } else {
        value = diffYears.toString();
        unit = diffYears === 1 ? 'year' : 'years';
      }

      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

      if (diffSecs < 60) {
        setRelative(value);
      } else {
        // For future dates
        const multiplier = diffMs < 0 ? 1 : -1;
        setRelative(rtf.format(multiplier * Number(value), unit as Intl.RelativeTimeFormatUnit));
      }
    };

    updateRelative();
    const timer = setInterval(updateRelative, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [date, locale]);

  return <span className={cn('tabular-nums', className)}>{relative}</span>;
}

/**
 * Date range display
 */
export function DateRange({
  start,
  end,
  locale = 'en-US',
  className,
}: {
  start: string | Date;
  end: string | Date;
  locale?: string;
  className?: string;
}) {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const startFormatted = new Intl.DateTimeFormat(locale, options).format(startDate);
  const endFormatted = new Intl.DateTimeFormat(locale, options).format(endDate);

  return (
    <span className={cn('tabular-nums', className)}>
      {startFormatted} – {endFormatted}
    </span>
  );
}

/**
 * Quick format function for JavaScript usage
 */
export function formatDate(date: string | Date, format: DateTimeFormat = 'short', locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: format === 'time' ? undefined : format,
    timeStyle: format === 'time' ? 'short' : undefined,
  } as any).format(dateObj);
}
