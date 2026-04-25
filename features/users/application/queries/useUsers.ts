'use client'

import { useAppQuery } from '@/core/query/useAppQuery'

import { userApi } from '../../infrastructure/api/user.api'
import { mapUsers } from '../../infrastructure/mappers/user.mapper'
import { userKeys } from '../keys/user.keys'

export const useUsers = () => {
  return useAppQuery({
    queryKey: userKeys.list(),

    queryFn: async () => {
      const data = await userApi.getUsers()
      return mapUsers(data)
    },

    // ✅ LIST DATA (moderately dynamic)
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,

    // ✅ smooth UI
    placeholderData: (prev) => prev,

    // optional (depends on UX)
    refetchOnWindowFocus: true,
  })
}