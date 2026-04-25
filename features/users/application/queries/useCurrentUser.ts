'use client'

import { useAppQuery } from '@/core/query/useAppQuery'

import { userApi } from '../../infrastructure/api/user.api'
import { mapCurrentUser } from '../../infrastructure/mappers/user.mapper'
import { userKeys } from '../keys/user.keys'

export const useCurrentUser = () => {
  return useAppQuery({
    queryKey: userKeys.me(),

    queryFn: async () => {
      const dto = await userApi.getMe()
      return mapCurrentUser(dto)
    },

    // ✅ SESSION DATA (very stable)
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    // ✅ UX
    placeholderData: (prev) => prev,

    // ❌ avoid unnecessary refetch
    refetchOnWindowFocus: false,
  })
}