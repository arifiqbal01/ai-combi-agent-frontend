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

export const useSessionStore = create<SessionState>((set) => ({
  tenantId: getInitialTenantId(),
  tenantSlug: undefined,
  tenantName: undefined,

  setSession: (data) =>
    set((state) => {
      // ✅ HARD GUARD — prevents infinite loop
      if (
        state.tenantId === data.tenantId &&
        state.tenantName === data.tenantName &&
        state.tenantSlug === data.tenantSlug
      ) {
        return state
      }

      console.log('🟢 ZUSTAND SET SESSION:', data)

      return {
        ...state,
        ...data,
      }
    }),

  clearSession: () =>
    set((state) => {
      // ✅ prevent unnecessary rerender
      if (!state.tenantId && !state.tenantName && !state.tenantSlug) {
        return state
      }

      console.log('🔴 ZUSTAND CLEAR SESSION')

      return {
        tenantId: undefined,
        tenantSlug: undefined,
        tenantName: undefined,
      }
    }),
}))