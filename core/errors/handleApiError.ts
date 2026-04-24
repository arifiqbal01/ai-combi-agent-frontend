import { isApiError } from '@/infra/api/errors'
import { toast } from '@/ui'

export function handleApiError(error: any) {
  // 🔕 ignore controlled startup blockers
  if (
    error?.message === 'REQUEST_BLOCKED' ||
    error?.message === 'NO_TOKEN_YET' ||
    error?.message === 'NO_TENANT_YET'
  ) {
    return
  }

  // 🧠 backend tenant mismatch (CRITICAL FIX)
  if (
    error?.status === 400 &&
    typeof error?.message === 'string' &&
    error.message.includes('Membership')
  ) {
    console.warn('⚠️ Tenant mismatch → forcing reset')

    localStorage.removeItem('tenant_id')

    // hard reset app state
    window.location.href = '/login'
    return
  }

  if (!isApiError(error)) {
    toast({
      title: 'Something went wrong',
      description: 'Unexpected error occurred',
    })
    return
  }

  switch (error.status) {
    case 403:
      toast({
        title: 'Permission denied',
        description: 'You are not allowed to perform this action',
      })
      break

    case 409:
      toast({
        title: 'Conflict',
        description: error.message,
      })
      break

    case 422:
      break

    case 500:
    default:
      toast({
        title: 'Server error',
        description: 'Please try again later',
      })
  }
}