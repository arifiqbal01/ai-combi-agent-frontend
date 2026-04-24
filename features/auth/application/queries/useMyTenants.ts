'use client'

import { useQuery } from '@tanstack/react-query'

import { authApi } from '../../infrastructure/api/auth.api'
import { mapTenants } from '../../infrastructure/mappers/auth.mapper'
import { authKeys } from '../keys/auth.keys'

export const useMyTenants = (enabled: boolean) => {
  return useQuery({
    queryKey: authKeys.tenants(), // ✅ now valid

    enabled, // depends on auth ready

    queryFn: async () => {
      const dto = await authApi.getMyTenants()
      return mapTenants(dto)
    },

    staleTime: 1000 * 60 * 5, // 5 min cache
    gcTime: 1000 * 60 * 10,   // optional but recommended

    retry: false,
    refetchOnWindowFocus: false,

    placeholderData: (prev) => prev, // smooth UI (your standard)
  })
}