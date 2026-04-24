'use client'

import { create } from 'zustand'

type SessionState = {
  tenantId?: string
  tenantSlug?: string
  tenantName?: string

  setSession: (data: Partial<SessionState>) => void
  clearSession: () => void
}

// 🔥 Restore tenant from localStorage on init
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
      console.log('🟢 ZUSTAND SET SESSION:', data)

      return {
        ...state,
        ...data,
      }
    }),

  clearSession: () =>
    set(() => {
      console.log('🔴 ZUSTAND CLEAR SESSION')

      return {
        tenantId: undefined,
        tenantSlug: undefined,
        tenantName: undefined,
      }
    }),
}))