'use client'

import { useQuery } from '@tanstack/react-query'

import { userApi } from '../../infrastructure/api/user.api'
import { mapCurrentUser } from '../../infrastructure/mappers/user.mapper'
import { userKeys } from '../keys/user.keys'

export const useMe = () => {
  return useQuery({
    queryKey: userKeys.me(),

    queryFn: async () => {
      const data = await userApi.getMe()
      return mapCurrentUser(data)
    },

    // 🔥 ADD THIS
    staleTime: 1000 * 60, // 1 minute
  })
}