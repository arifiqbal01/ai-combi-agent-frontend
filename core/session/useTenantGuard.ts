// core/session/useTenantGuard.ts

import { useAppContext } from '@/core/app/useAppContext'

export function useTenantGuard() {
  const { tenantId, isBootstrapped } = useAppContext()

  return {
    tenantId,
    hasTenant: isBootstrapped, // ✅ FIXED
  }
}