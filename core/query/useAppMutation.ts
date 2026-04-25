import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useAppContext } from '@/core/app/useAppContext'

export function useAppMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void
>(
  options: UseMutationOptions<TData, TError, TVariables>
) {
  const { isBootstrapped } = useAppContext()

  return useMutation({
    ...options,

    mutationFn: async (variables, context) => {
      if (!isBootstrapped) {
        throw new Error('APP_NOT_READY')
      }

      // ✅ pass BOTH arguments
      return options.mutationFn!(variables, context)
    },
  })
}