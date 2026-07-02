/**
 * Common types used across the API
 */

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  size?: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}

/**
 * Product search parameters
 */
export interface SearchParams extends PaginationParams {
  searchTerm?: string;
  enabled?: boolean;
  featured?: boolean;
}
