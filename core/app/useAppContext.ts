// core/app/useAppContext.ts
'use client'

import { useAuth } from '@/core/auth/useAuth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/features/auth/infrastructure/api/auth.api'
import { useSession } from '@/core/session/useSession'
import { useEffect, useMemo } from 'react'

export function useAppContext() {
  const auth = useAuth()
  const { tenantId, setSession, clearSession } = useSession()
  const queryClient = useQueryClient()

  const isAuthenticated = !!auth.isAuthenticated
  const isReady = auth.isLoaded && isAuthenticated

  // -----------------------------
  // 1. Fetch Tenants
  // -----------------------------
  const {
    data: tenants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-tenants'],
    enabled: isReady,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await authApi.getMyTenants()
      return res.tenants
    },
  })

  // -----------------------------
  // 2. Handle invalid tenant
  // -----------------------------
  useEffect(() => {
    if (!isError) return

    console.warn('❌ Tenant fetch error — clearing stale session')
    clearSession()
    localStorage.removeItem('tenant_id')
    queryClient.invalidateQueries({ queryKey: ['my-tenants'] })
  }, [isError, clearSession, queryClient])

  // -----------------------------
  // 3. Validate + auto-select tenant
  // -----------------------------
  useEffect(() => {
    if (!tenants) return

    const isInvalid =
      tenantId && !tenants.some((t) => t.tenant_id === tenantId)

    if (isInvalid) {
      console.warn('❌ Invalid tenant — resetting')
      clearSession()
      localStorage.removeItem('tenant_id')
      return
    }

    // Auto-select first if none
    if (!tenantId && tenants.length > 0) {
      const t = tenants[0]

      console.log('🏢 Selecting tenant:', t)

      setSession({
        tenantId: t.tenant_id,
        tenantName: t.name,
      })

      localStorage.setItem('tenant_id', t.tenant_id)
    }
  }, [tenants, tenantId, setSession, clearSession])

  // -----------------------------
  // 4. Fetch Tenant Context (CRITICAL)
  // -----------------------------
  const {
    data: tenantMe,
    isLoading: tenantLoading,
  } = useQuery({
    queryKey: ['tenant-me', tenantId],
    enabled: !!tenantId, // ONLY when tenant exists
    retry: false,
    queryFn: async () => {
      return authApi.getTenantMe()
    },
  })

  // -----------------------------
  // 5. Final readiness
  // -----------------------------
  const loading = useMemo(() => {
    if (!auth.isLoaded) return true
    if (isReady && isLoading && !tenants) return true
    if (tenantId && tenantLoading && !tenantMe) return true
    return false
  }, [
    auth.isLoaded,
    isReady,
    isLoading,
    tenants,
    tenantId,
    tenantLoading,
    tenantMe,
  ])

  return {
    loading,
    isAuthenticated,
    isReady,
    hasTenant: !!tenantId,
    hasNoTenant: tenants ? tenants.length === 0 : undefined,
    tenants,
    tenantId,
    tenantMe,
  }
}