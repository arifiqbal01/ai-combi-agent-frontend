// core/session/useSession.ts
'use client'

import { useSessionStore } from './session.store'

export function useSession() {
  const tenantId = useSessionStore((s) => s.tenantId)
  const tenantSlug = useSessionStore((s) => s.tenantSlug)
  const tenantName = useSessionStore((s) => s.tenantName)

  const setSession = useSessionStore((s) => s.setSession)
  const clearSession = useSessionStore((s) => s.clearSession)

  return {
    tenantId,
    tenantSlug,
    tenantName,
    setSession,
    clearSession,
  }
}