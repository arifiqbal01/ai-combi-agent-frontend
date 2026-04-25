import { isApiError } from '@/infra/api/errors'
import { toast } from '@/ui'

type UnknownError = unknown

export function handleApiError(error: UnknownError) {
  // -----------------------------
  // Ignore controlled blockers
  // -----------------------------
  if (
    error instanceof Error &&
    (
      error.message === 'REQUEST_BLOCKED' ||
      error.message === 'NO_TOKEN_YET' ||
      error.message === 'NO_TENANT_YET'
    )
  ) {
    return
  }

  // -----------------------------
  // Tenant mismatch (CRITICAL)
  // -----------------------------
  if (
    isApiError(error) &&
    error.status === 400 &&
    typeof error.message === 'string' &&
    error.message.includes('Membership')
  ) {
    console.warn('⚠️ Tenant mismatch → forcing reset')

    localStorage.removeItem('tenant_id')
    window.location.href = '/login'
    return
  }

  // -----------------------------
  // Non-API error fallback
  // -----------------------------
  if (!isApiError(error)) {
    toast({
      title: 'Something went wrong',
      description: 'Unexpected error occurred',
    })
    return
  }

  // -----------------------------
  // API Error handling
  // -----------------------------
  switch (error.status) {
    case 401:
      // optional: trigger logout
      window.location.href = '/login'
      return

    case 403:
      toast({
        title: 'Permission denied',
        description: 'You are not allowed to perform this action',
      })
      return

    case 409:
      toast({
        title: 'Conflict',
        description: error.message,
      })
      return

    case 422:
      // handled at form level
      return

    case 500:
    default:
      toast({
        title: 'Server error',
        description: 'Please try again later',
      })
      return
  }
}