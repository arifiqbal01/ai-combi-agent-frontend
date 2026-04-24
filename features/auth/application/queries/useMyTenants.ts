// features/auth/application/queries/useMyTenants.ts

'use client'

import { useQuery } from '@tanstack/react-query'

import { authApi } from '../../infrastructure/api/auth.api'
import { mapTenants } from '../../infrastructure/mappers/auth.mapper'
import { authKeys } from '../keys/auth.keys'

export const useMyTenants = (enabled: boolean) => {
  return useQuery({
    queryKey: authKeys.tenants(),

    enabled, // 🔥 depends on auth ready

    queryFn: async () => {
      const dto = await authApi.getMyTenants()
      return mapTenants(dto)
    },

    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  })
}