// core/app/useReadyGuard.ts
import { useAuth } from '@/core/auth/useAuth'
import { useAppContext } from '@/core/app/useAppContext'

export function useReadyGuard(): boolean {
  const { isLoaded, isAuthenticated } = useAuth()
  const { tenantId, tenantMe } = useAppContext()

  return isLoaded && !!isAuthenticated && !!tenantId && !!tenantMe
}