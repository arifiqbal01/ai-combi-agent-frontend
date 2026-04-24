import { useSessionStore } from '@/core/session/session.store'

export function useTenantGuard() {
  const tenantId = useSessionStore((s) => s.tenantId)

  return {
    tenantId,
    hasTenant: !!tenantId,
  }
}