// core/providers/query-provider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { handleApiError } from '@/core/errors/handleApiError'

const SILENT_ERRORS = new Set(['NO_TOKEN', 'NO_TENANT'])

function isSilent(err: unknown): boolean {
  return err instanceof Error && SILENT_ERRORS.has(err.message)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,

      // Never retry state errors — only real network/server errors
      retry: (failureCount, err) => {
        if (isSilent(err)) return false
        return failureCount < 2
      },
    },
    mutations: {
      onError: (err) => {
        if (isSilent(err)) return
        handleApiError(err)
      },
    },
  },
})

// Global query error handler (set outside component to avoid re-registration)
queryClient.getQueryCache().config.onError = (err) => {
  if (isSilent(err)) {
    return
  }
  handleApiError(err)
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}