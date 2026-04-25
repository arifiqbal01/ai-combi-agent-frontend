'use client'

import {
  useQuery,
  UseQueryOptions,
  QueryKey,
} from '@tanstack/react-query'

import { useAppContext } from '@/core/app/useAppContext'

export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, QueryKey>
) {
  const { isBootstrapped } = useAppContext()

  return useQuery({
    ...options,

    // 🔥 CENTRALIZED GATING
    enabled: isBootstrapped && (options.enabled ?? true),

    // 🔥 SAFETY DEFAULTS
    retry: (count, err: unknown) => {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err
      ) {
        const msg = (err as { message?: string }).message

        if (msg === 'NO_TENANT' || msg === 'NO_TOKEN') {
          return false
        }
      }

      return count < 2
    },
  })
}