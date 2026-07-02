/**
 * DataTable Component
 *
 * A full-featured data table component wrapping TanStack Table.
 * Supports pagination, sorting, column visibility, row selection, and bulk actions.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={productColumns}
 *   data={products}
 *   pageSize={10}
 *   searchable
 *   sortable
 *   selectable
 * />
 * ```
 */

'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState, EmptyStates } from '@/components/table/EmptyState';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Settings2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

export interface DataTableProps<TData> {
  /** Column definitions for the table */
  columns: ColumnDef<TData>[];
  /** Data to display in the table */
  data: TData[];
  /** Loading state - shows a skeleton loader */
  isLoading?: boolean;
  /** Error state - shows an error message */
  isError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Function to call when retrying after an error */
  onRetry?: () => void;
  /** Enable search functionality */
  searchable?: boolean;
  /** Search value (controlled) */
  searchValue?: string;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Enable sorting */
  sortable?: boolean;
  /** Enable row selection (bulk actions) */
  selectable?: boolean;
  /** Selected rows (controlled) */
  selectedRows?: RowSelectionState;
  /** Callback when selection changes */
  onSelectionChange?: (selection: RowSelectionState) => void;
  /** Number of rows per page (default: 10) */
  pageSize?: number;
  /** Current page index (controlled, 0-based) */
  currentPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Initial sorting state */
  initialSorting?: SortingState;
  /** Callback when sorting changes */
  onSortingChange?: (sorting: SortingState) => void;
  /** Initial column visibility (hidden columns) */
  initialColumnVisibility?: VisibilityState;
  /** Callback when column visibility changes */
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  /** Action to show when rows are selected */
  bulkAction?: (selectedCount: number, clearSelection: () => void) => React.ReactNode;
  /** Custom empty state component */
  emptyState?: React.ReactNode;
  /** Empty state title when no data */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Enable column visibility toggle */
  columnToggleable?: boolean;
  /** Additional className for the table container */
  className?: string;
  /** Total count of items (for server-side pagination) */
  totalCount?: number;
  /** Enable manual pagination (server-side) */
  manualPagination?: boolean;
}

/**
 * DataTable component with sorting, filtering, pagination, and row selection.
 */
export function DataTable<TData>({
  columns,
  data = [],
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  searchable = false,
  searchValue: controlledSearchValue = '',
  onSearchChange,
  sortable = true,
  selectable = false,
  selectedRows: controlledSelection,
  onSelectionChange,
  pageSize = 10,
  currentPage: controlledPage = 0,
  onPageChange,
  initialSorting = [],
  onSortingChange,
  initialColumnVisibility = {},
  onColumnVisibilityChange,
  bulkAction,
  emptyState,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no items to display.',
  columnToggleable = true,
  className,
  totalCount,
  manualPagination = false,
}: DataTableProps<TData>) {
  // Local state for uncontrolled mode
  const [localSorting, setLocalSorting] = useState<SortingState>(initialSorting);
  const [localSearch, setLocalSearch] = useState(controlledSearchValue);
  const [localSelection, setLocalSelection] = useState<RowSelectionState>({});
  const [localPage, setLocalPage] = useState(0);
  const [columnVisibility, setLocalColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);

  // Determine if controlled or uncontrolled
  const sorting = onSortingChange ? localSorting : localSorting;
  const searchValue = onSearchChange ? controlledSearchValue : localSearch;
  const rowSelection = onSelectionChange ? controlledSelection : localSelection;
  const pagination = onPageChange
    ? { pageIndex: controlledPage, pageSize }
    : { pageIndex: localPage, pageSize };

  // Calculate visible column count
  const visibleColumnCount = useMemo(() => {
    return columns.filter(col => {
      const colId = typeof col.id === 'string' ? col.id : (col as any).accessorKey?.toString();
      return colId && !columnVisibility[colId];
    }).length;
  }, [columns, columnVisibility]);

  // Update local search when controlled value changes
  if (onSearchChange && localSearch !== controlledSearchValue) {
    setLocalSearch(controlledSearchValue);
  }

  // Memoize column definitions to add selection column if selectable
  const tableColumns = useMemo(() => {
    if (!selectable) return columns;

    return [
      {
        id: 'select',
        header: ({ table }: { table: TanStackTable<TData> }) => (
          <Checkbox
            checked={
              table.getFilteredSelectedRowModel().rows.length > 0 &&
              table.getFilteredSelectedRowModel().rows.length === table.getFilteredRowModel().rows.length
            }
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }: { row: any }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 48,
      },
      ...columns,
    ];
  }, [columns, selectable]);

  // Initialize the table
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter: searchValue,
      rowSelection,
      columnVisibility,
      pagination,
    },
    onSortingChange: useCallback((updaterOrValue: any) => {
      const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
      setLocalSorting(newSorting);
      onSortingChange?.(newSorting);
    }, [sorting, onSortingChange]),
    onGlobalFilterChange: useCallback((value: string) => {
      setLocalSearch(value);
      onSearchChange?.(value);
    }, [onSearchChange]),
    onRowSelectionChange: useCallback((updaterOrValue: any) => {
      const newSelection = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
      setLocalSelection(newSelection);
      onSelectionChange?.(newSelection);
    }, [rowSelection, onSelectionChange]),
    onColumnVisibilityChange: useCallback((updaterOrValue: any) => {
      const newVisibility = typeof updaterOrValue === 'function' ? updaterOrValue(columnVisibility) : updaterOrValue;
      setLocalColumnVisibility(newVisibility);
      onColumnVisibilityChange?.(newVisibility);
    }, [columnVisibility, onColumnVisibilityChange]),
    onPaginationChange: useCallback((updaterOrValue: any) => {
      const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;
      if (onPageChange) {
        onPageChange(newPagination.pageIndex);
      } else {
        setLocalPage(newPagination.pageIndex);
      }
    }, [pagination, onPageChange]),
    getCoreRowModel: getCoreRowModel(),
    ...(sortable && { getSortedRowModel: getSortedRowModel() }),
    ...(searchable && { getFilteredRowModel: getFilteredRowModel() }),
    ...(!manualPagination && { getPaginationRowModel: getPaginationRowModel() }),
    manualPagination,
    pageCount: manualPagination && totalCount ? Math.ceil(totalCount / pageSize) : undefined,
  });

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const hasData = data.length > 0;
  const isFiltered = searchValue.length > 0;

  // Handle clearing selection
  const clearSelection = useCallback(() => {
    table.setRowSelection({});
  }, [table]);

  // Loading skeleton
  if (isLoading) {
    return <DataTableSkeleton columnCount={visibleColumnCount} />;
  }

  // Error state
  if (isError) {
    return (
      <EmptyStates.Error
        message={errorMessage}
        onRetry={onRetry}
      />
    );
  }

  // Empty state
  if (!hasData) {
    if (emptyState) {
      return <>{emptyState}</>;
    }
    return (
      <EmptyStates.NoResults
        search={isFiltered ? searchValue : undefined}
      />
    );
  }

  // Calculate pagination info
  const paginationInfo = manualPagination
    ? {
        from: controlledPage * pageSize + 1,
        to: Math.min((controlledPage + 1) * pageSize, totalCount ?? data.length),
        total: totalCount ?? data.length,
      }
    : {
        from: table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
        to: Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        ),
        total: table.getFilteredRowModel().rows.length,
      };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Bulk Actions Bar */}
      {selectable && selectedRowCount > 0 && bulkAction && (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
          <div className="flex-1 text-sm font-medium">
            {selectedRowCount} {selectedRowCount === 1 ? 'row' : 'rows'} selected
          </div>
          {bulkAction(selectedRowCount, clearSelection)}
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                      header.column.getCanSort() && 'cursor-pointer hover:text-foreground [&[role=checkbox]]:pointer-events-none'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortable && header.column.getCanSort() && (
                          <SortIndicator column={header.column} />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
                {columnToggleable && (
                  <TableHead className="w-12 text-right">
                    <ColumnVisibilityMenu
                      table={table}
                      columns={tableColumns}
                    />
                  </TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn(
                  'hover:bg-muted/50',
                  row.getIsSelected() && 'bg-muted'
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 align-middle"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {columnToggleable && <TableCell />}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {paginationInfo.from} to {paginationInfo.to} of {paginationInfo.total} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
              .filter((page) => {
                // Show first, last, and adjacent pages
                const currentPage = table.getState().pagination.pageIndex + 1;
                const totalPages = table.getPageCount();
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <div key={page} className="flex items-center">
                    {showEllipsis && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={table.getState().pagination.pageIndex + 1 === page ? 'default' : 'outline'}
                      size="sm"
                      className="w-9"
                      onClick={() => table.setPageIndex(page - 1)}
                    >
                      {page}
                    </Button>
                  </div>
                );
              })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Sort indicator icon for sortable columns
 */
function SortIndicator<TData>({ column }: { column: any }) {
  const sortState = column.getIsSorted();

  return (
    <div className="inline-flex h-4 w-4 flex-shrink-0 flex-col items-center justify-center gap-0.5 opacity-0 group-hover/header:opacity-100 [&[data-sorting=true]]:opacity-100" data-sorting={!!sortState}>
      <ChevronDown
        className={cn(
          'h-3 w-3 transition-transform',
          sortState === 'desc' ? '-rotate-180' : ''
        )}
      />
    </div>
  );
}

/**
 * Column visibility dropdown menu
 */
function ColumnVisibilityMenu<TData>({
  table,
  columns,
}: {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData>[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8 p-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8"
        >
          <span className="sr-only">Toggle columns</span>
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns
          .filter((col) => col.id !== 'select')
          .map((col) => {
            const colId = col.id || (col as any).accessorKey?.toString();
            if (!colId) return null;

            return (
              <DropdownMenuCheckboxItem
                key={colId}
                checked={table.getColumn(colId)?.getIsVisible()}
                onCheckedChange={(value: boolean | string) => table.getColumn(colId)?.toggleVisibility(!!value)}
              >
                {typeof col.header === 'string'
                  ? col.header
                  : colId.charAt(0).toUpperCase() + colId.slice(1)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Loading skeleton for the table
 */
function DataTableSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnCount }).map((_, i) => (
              <TableHead key={i} className="h-12 px-4">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: columnCount }).map((_, j) => (
                <TableCell key={j} className="px-4 py-3">
                  <div className="h-4 animate-pulse rounded bg-muted" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * FlexRender helper from TanStack Table
 */
function flexRender<T>(comp: T, props: any) {
  if (typeof comp === 'function') {
    return comp(props);
  }
  return comp;
}

/**
 * Export a hook for creating table columns
 */
export function createColumnHelper<T>() {
  return {
    accessor: (accessor: keyof T, header: string) => ({
      id: accessor as string,
      accessorKey: accessor as string,
      header,
    }),
    display: (id: string, header: string | ((props: any) => React.ReactElement)) => ({
      id,
      header,
    }),
  };
}
