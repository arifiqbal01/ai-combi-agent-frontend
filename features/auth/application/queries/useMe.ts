'use client'

import { useQuery } from '@tanstack/react-query'

import { authApi } from '../../infrastructure/api/auth.api'
import { mapAuthUser } from '../../infrastructure/mappers/auth.mapper'
import { authKeys } from '../keys/auth.keys'

export const useMe = () => {
  return useQuery({
    queryKey: authKeys.me(),

    queryFn: async () => {
      const dto = await authApi.getMe()
      return mapAuthUser(dto)
    },

    // 🔥 Auth data is stable → cache longer
    staleTime: 1000 * 60 * 5,

    // ❌ Never retry auth blindly
    retry: false,

    // 🚫 Avoid unnecessary refetch loops
    refetchOnWindowFocus: false,

    // ✅ Explicit states (helps debugging)
    meta: {
      errorMessage: 'Failed to fetch user identity',
    },
  })
}