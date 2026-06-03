'use client'

import { create } from 'zustand'

type SessionState = {
  tenantId?: string
  tenantSlug?: string
  tenantName?: string

  setSession: (data: Partial<SessionState>) => void
  clearSession: () => void
}

const getInitialTenantId = () => {
  if (typeof window === 'undefined') return undefined

  return localStorage.getItem('tenant_id') ?? undefined
}

const getInitialTenantName = () => {
  if (typeof window === 'undefined') return undefined

  return localStorage.getItem('tenant_name') ?? undefined
}

const getInitialTenantSlug = () => {
  if (typeof window === 'undefined') return undefined

  return localStorage.getItem('tenant_slug') ?? undefined
}

export const useSessionStore = create<SessionState>((set) => ({
  tenantId: getInitialTenantId(),
  tenantName: getInitialTenantName(),
  tenantSlug: getInitialTenantSlug(),

  setSession: (data) =>
    set((state) => {
      if (
        state.tenantId === data.tenantId &&
        state.tenantName === data.tenantName &&
        state.tenantSlug === data.tenantSlug
      ) {
        return state
      }

      if (typeof window !== 'undefined') {
        if (data.tenantId !== undefined) {
          localStorage.setItem('tenant_id', data.tenantId)
        }

        if (data.tenantName !== undefined) {
          localStorage.setItem(
            'tenant_name',
            data.tenantName
          )
        }

        if (data.tenantSlug !== undefined) {
          localStorage.setItem(
            'tenant_slug',
            data.tenantSlug
          )
        }
      }

      console.log('🟢 ZUSTAND SET SESSION:', data)

      return {
        ...state,
        ...data,
      }
    }),

  clearSession: () =>
    set((state) => {
      if (
        !state.tenantId &&
        !state.tenantName &&
        !state.tenantSlug
      ) {
        return state
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem('tenant_id')
        localStorage.removeItem('tenant_name')
        localStorage.removeItem('tenant_slug')
      }

      console.log('🔴 ZUSTAND CLEAR SESSION')

      return {
        tenantId: undefined,
        tenantSlug: undefined,
        tenantName: undefined,
      }
    }),
}))