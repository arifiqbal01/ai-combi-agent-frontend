// infra/api/client.ts
'use client'

import { useSessionStore } from '@/core/session/session.store'
import { buildApiUrl } from '@/infra/api/config'
import { buildHeaders } from '@/infra/api/headers'
import {
  parseApiError,
  unauthorizedError,
  networkError,
  ApiErrorPayload,
} from '@/infra/api/errors'

type RequestOptions = {
  requireAuth?: boolean
  requireTenant?: boolean
  timeoutMs?: number
}

/* ---------------------------------- */
/* Clerk Token (SAFE + SSR AWARE)     */
/* ---------------------------------- */

// infra/api/client.ts

async function getClerkToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  const clerk = window.Clerk

  if (!clerk) {
    console.warn('[Auth] Clerk not available')
    return null
  }

  if (!clerk.loaded) {
    console.warn('[Auth] Clerk not loaded yet')
    return null
  }

  if (!clerk.session) {
    console.warn('[Auth] No active session')
    return null
  }

  try {
    const token = await clerk.session.getToken({
      template: 'ai-combi-agent',
    })

    if (!token) {
      console.warn('[Auth] Empty token')
      return null
    }

    console.log('[Auth] Token acquired')

    return token
  } catch (err) {
    console.error('[Auth] Token fetch failed', err)
    return null
  }
}

/* ---------------------------------- */
/* Headers                            */
/* ---------------------------------- */

async function prepareHeaders(options?: RequestOptions): Promise<HeadersInit> {
  const requireAuth = options?.requireAuth ?? true
  const requireTenant = options?.requireTenant ?? true

  const token = await getClerkToken()

  console.log('[API] Token present:', !!token)

  if (requireAuth && !token) {
    console.error('[API] Missing token → BLOCKED')
    throw unauthorizedError()
  }

  const tenantId = useSessionStore.getState().tenantId

  console.log('[API] Tenant ID:', tenantId)

  // 🔥 HARD BLOCK
  if (requireTenant && !tenantId) {
    console.error('[API] BLOCKED → tenant not ready')
    throw new Error('NO_TENANT')
  }

  return buildHeaders({
    token,
    tenantId,
    includeTenant: requireTenant,
  })
}

/* ---------------------------------- */
/* Fetch with timeout                 */
/* ---------------------------------- */

async function fetchWithTimeout(
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs = 10000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(id)
  }
}

/* ---------------------------------- */
/* Response Handler                   */
/* ---------------------------------- */

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json()
  }

  let payload: ApiErrorPayload | null = null

  try {
    payload = await res.json()
  } catch {
    // ignore non-json
  }

  if (res.status === 401) {
    throw unauthorizedError()
  }

  throw parseApiError(res, payload)
}

/* ---------------------------------- */
/* API CLIENT                         */
/* ---------------------------------- */

export const apiClient = {
  get: async <T>(
    path: string,
    options?: RequestOptions
  ): Promise<T> => {
    try {
      const res = await fetchWithTimeout(
        buildApiUrl(path),
        {
          method: 'GET',
          headers: await prepareHeaders(options),
        },
        options?.timeoutMs
      )

      return await handleResponse<T>(res)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw networkError()
      }
      throw err
    }
  },

  post: async <T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> => {
    try {
      const res = await fetchWithTimeout(
        buildApiUrl(path),
        {
          method: 'POST',
          headers: await prepareHeaders(options),
          body: JSON.stringify(body),
        },
        options?.timeoutMs
      )

      return await handleResponse<T>(res)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw networkError()
      }
      throw err
    }
  },
}