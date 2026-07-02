/**
 * DeleteDialog Component
 *
 * Pre-built delete confirmation dialog.
 * A thin wrapper around ConfirmDialog with delete-specific defaults.
 *
 * @example
 * ```tsx
 * <DeleteDialog
 *   open={showDelete}
 *   onOpenChange={setShowDelete}
 *   onConfirm={() => handleDelete()}
 *   itemName="product"
 * />
 * ```
 */

'use client';

import { AlertTriangle } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

export interface DeleteDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Callback when delete is confirmed */
  onConfirm: () => void | Promise<void>;
  /** Name of the item being deleted (included in message) */
  itemName?: string;
  /** Custom title */
  title?: string;
  /** Custom description */
  description?: string;
  /** Show loading state */
  isLoading?: boolean;
}

/**
 * Delete confirmation dialog with sensible defaults.
 */
export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  title,
  description,
  isLoading = false,
}: DeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title || 'Delete confirmation'}
      description={
        description ||
        (itemName
          ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
          : 'Are you sure you want to delete this item? This action cannot be undone.')
      }
      onConfirm={onConfirm}
      confirmLabel="Delete"
      variant="destructive"
      isLoading={isLoading}
      icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
    />
  );
}
