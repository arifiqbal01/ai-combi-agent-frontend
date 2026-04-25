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

  console.log('[AppContext] Auth state:', {
    isLoaded: auth.isLoaded,
    isAuthenticated,
  })

  // ✅ strict guard
  const canFetchTenants =
    auth.isLoaded &&
    isAuthenticated

  console.log('[AppContext] canFetchTenants:', canFetchTenants)

  const {
    data: tenants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-tenants'],
    enabled: canFetchTenants,
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      console.log('[AppContext] Fetching tenants...')
      const res = await authApi.getMyTenants()
      console.log('[AppContext] Tenants response:', res)
      return res.tenants
    },
  })

  useEffect(() => {
    if (!isError) return

    console.error('[AppContext] Tenants fetch ERROR')

    clearSession()
    localStorage.removeItem('tenant_id')

    queryClient.invalidateQueries({ queryKey: ['my-tenants'] })
  }, [isError])

  useEffect(() => {
    console.log('[AppContext] Tenant effect triggered:', {
      tenants,
      tenantId,
    })

    if (!tenants || tenants.length === 0) {
      console.warn('[AppContext] No tenants available')
      return
    }

    const firstTenant = tenants[0]

    const isInvalid =
      tenantId && !tenants.some((t) => t.tenant_id === tenantId)

    if (isInvalid) {
      console.warn('[AppContext] Invalid tenant detected → clearing')
      clearSession()
      localStorage.removeItem('tenant_id')
      return
    }

    if (!tenantId) {
      console.log('[AppContext] Setting tenant:', firstTenant)

      setSession({
        tenantId: firstTenant.tenant_id,
        tenantName: firstTenant.name,
      })

      localStorage.setItem('tenant_id', firstTenant.tenant_id)
    }
  }, [tenants, tenantId])

  const {
    data: tenantMe,
    isLoading: tenantLoading,
  } = useQuery({
    queryKey: ['tenant-me', tenantId],
    enabled: !!tenantId && !!tenants && canFetchTenants,
    retry: 2,
    retryDelay: 1000,
    queryFn: async () => {
      console.log('[AppContext] Fetching tenantMe for:', tenantId)
      const res = await authApi.getTenantMe()
      console.log('[AppContext] tenantMe response:', res)
      return res
    },
  })

  const loading = useMemo(() => {
    const result =
      !auth.isLoaded ||
      (canFetchTenants && isLoading && !tenants) ||
      (tenantId && tenantLoading && !tenantMe)

    console.log('[AppContext] Loading state:', {
      authLoaded: auth.isLoaded,
      tenantsLoading: isLoading,
      tenantLoading,
      result,
    })

    return result
  }, [
    auth.isLoaded,
    canFetchTenants,
    isLoading,
    tenants,
    tenantId,
    tenantLoading,
    tenantMe,
  ])

  const isBootstrapped =
    auth.isLoaded &&
    isAuthenticated &&
    !!tenantId &&
    !!tenantMe

  console.log('[AppContext] FINAL STATE:', {
    tenantId,
    hasTenant: !!tenantId,
    tenantMe,
    isBootstrapped,
  })

  return {
    loading,
    isAuthenticated,
    isReady: canFetchTenants,
    isBootstrapped,
    hasTenant: !!tenantId,
    tenants,
    tenantId,
    tenantMe,
  }
}