'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userApi } from '../../infrastructure/api/user.api'
import { mapUser } from '../../infrastructure/mappers/user.mapper'
import { userKeys } from '../keys/user.keys'

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.addUser,

    onSuccess: (data) => {
      const newUser = mapUser(data)

      // Option 1: Safe (recommended)
      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      })

      // Option 2: Optimistic (optional later)
      // queryClient.setQueryData(userKeys.list(), ...)
    },
  })
}