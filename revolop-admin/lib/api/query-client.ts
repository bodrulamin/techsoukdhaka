/**
 * TanStack Query client configuration
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Create and configure QueryClient
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains fresh for 1 minute
      staleTime: 60 * 1000,
      // Retry failed requests once
      retry: 1,
      // Cache data for 5 minutes
      gcTime: 5 * 60 * 1000,
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});
