'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { userApi } from '../../infrastructure/api/user.api'
import { mapUser } from '../../infrastructure/mappers/user.mapper'
import { userKeys } from '../keys/user.keys'

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationFn: userApi.addUser,

    onSuccess: async (data) => {
      const newUser = mapUser(data)

      // ✅ Safe strategy (recommended)
      await queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      })

      // 🔁 Optional (future optimization)
      // queryClient.setQueryData(userKeys.list(), ...)
    },
  })
}