'use client'

import { useQuery } from '@tanstack/react-query'

import { userApi } from '../../infrastructure/api/user.api'
import { mapUsers } from '../../infrastructure/mappers/user.mapper'
import { userKeys } from '../keys/user.keys'

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),

    queryFn: async () => {
      const data = await userApi.getUsers()
      return mapUsers(data)
    },

    // ✅ LIST DATA (moderately dynamic)
    staleTime: 60 * 1000,       // 1 minute
    gcTime: 5 * 60 * 1000,

    // ✅ smooth UI
    placeholderData: (prev) => prev,

    // optional (depends on UX)
    refetchOnWindowFocus: true,
  })
}