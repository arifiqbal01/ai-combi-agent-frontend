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

  // ✅ strict guard
  const canFetchTenants =
    auth.isLoaded &&
    isAuthenticated

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
      const res = await authApi.getMyTenants()
      return res.tenants
    },
  })

  useEffect(() => {
    if (!isError) return

    clearSession()
    localStorage.removeItem('tenant_id')

    queryClient.invalidateQueries({ queryKey: ['my-tenants'] })
  }, [isError])

  useEffect(() => {
    if (!tenants || tenants.length === 0) {
      return
    }

    const firstTenant = tenants[0]

    const isInvalid =
      tenantId && !tenants.some((t) => t.tenant_id === tenantId)

    if (isInvalid) {
      clearSession()
      localStorage.removeItem('tenant_id')
      return
    }

    if (!tenantId) {
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
      const res = await authApi.getTenantMe()
      return res
    },
  })

  const loading = useMemo(() => {
    const result =
      !auth.isLoaded ||
      (canFetchTenants && isLoading && !tenants) ||
      (tenantId && tenantLoading && !tenantMe)

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