/**
 * REACT QUERY CLIENT CONFIGURATION
 * 
 * This file sets up TanStack Query (React Query) for managing server state:
 * - Automatic caching and background refetching
 * - Optimistic updates for better UX
 * - Request deduplication
 * - Error handling with custom retry logic
 * 
 * KEY EXPORTS:
 * - queryClient: Configured QueryClient instance (used in App.tsx provider)
 * - apiRequest: HTTP request utility for mutations (POST/PATCH/DELETE)
 * - getQueryFn: Customizable query function for GET requests
 * 
 * CONFIGURATION STRATEGY:
 * - staleTime: Infinity (data never considered stale automatically)
 * - refetchOnWindowFocus: false (prevents unnecessary refetches)
 * - retry: false (fail fast for better error visibility)
 * 
 * USAGE PATTERN:
 * - Queries: Use queryKey like ['/api/feedback'] for automatic GET requests
 * - Mutations: Use apiRequest('POST', '/api/feedback', data) for data changes
 * - Cache Invalidation: Call queryClient.invalidateQueries() after mutations
 */

import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * ERROR HANDLER
 * Throws an error if the HTTP response status is not OK (200-299)
 * Extracts error message from response body or uses status text
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * API REQUEST UTILITY
 * 
 * Generic HTTP request function for mutations (POST, PATCH, DELETE)
 * Used throughout the app for creating/updating data
 * 
 * @param method - HTTP method (POST, PATCH, DELETE, etc.)
 * @param url - API endpoint URL (e.g., '/api/feedback')
 * @param data - Optional request body (will be JSON stringified)
 * @returns Promise resolving to Response object
 * 
 * FEATURES:
 * - Automatically sets Content-Type to application/json when data is present
 * - Includes credentials for session-based auth (future-proof)
 * - Throws descriptive errors on failure
 * 
 * USAGE EXAMPLE:
 * ```typescript
 * const addFeedbackMutation = useMutation({
 *   mutationFn: async (data) => {
 *     return await apiRequest('POST', '/api/feedback', data);
 *   }
 * });
 * ```
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Send cookies/session data
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * 401 UNAUTHORIZED BEHAVIOR OPTIONS
 * Defines how the query function should handle 401 (Unauthorized) responses
 */
type UnauthorizedBehavior = "returnNull" | "throw";

/**
 * QUERY FUNCTION FACTORY
 * 
 * Creates a custom query function for TanStack Query with configurable 401 handling
 * This is the default query function used by all useQuery hooks in the app
 * 
 * @param options.on401 - How to handle 401 responses:
 *   - "throw": Throw an error (default, good for protected routes)
 *   - "returnNull": Return null (good for optional auth checks)
 * @returns QueryFunction that fetches data from the queryKey URL
 * 
 * HOW IT WORKS:
 * - Converts queryKey array to URL (e.g., ['/api/feedback'] → '/api/feedback')
 * - Makes GET request with credentials included
 * - Parses JSON response automatically
 * - Handles errors based on on401 setting
 * 
 * USAGE EXAMPLE:
 * ```typescript
 * const { data } = useQuery<Feedback[]>({
 *   queryKey: ['/api/feedback'],
 *   // queryFn is automatically provided by queryClient default config
 * });
 * ```
 */
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    // Handle 401 based on configuration
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * QUERY CLIENT INSTANCE
 * 
 * Singleton QueryClient with application-wide caching and refetch configuration
 * Wrapped in QueryClientProvider in App.tsx
 * 
 * DEFAULT QUERY OPTIONS:
 * - queryFn: Custom function that converts queryKey to GET request
 * - refetchInterval: false (no automatic polling)
 * - refetchOnWindowFocus: false (no refetch when user returns to tab)
 * - staleTime: Infinity (data never auto-invalidates, manual control only)
 * - retry: false (fail fast, don't retry failed requests)
 * 
 * DEFAULT MUTATION OPTIONS:
 * - retry: false (fail fast on mutations)
 * 
 * WHY THESE SETTINGS:
 * - Dashboard data changes infrequently (user-driven updates)
 * - Manual cache invalidation after mutations provides better control
 * - Prevents unnecessary API calls and provides predictable behavior
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
