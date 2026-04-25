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
/* Clerk Token                        */
/* ---------------------------------- */

async function getClerkToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  const clerk = window.Clerk

  if (!clerk || !clerk.loaded || !clerk.session) {
    return null
  }

  try {
    const token = await clerk.session.getToken({
      template: 'ai-combi-agent',
    })

    return token ?? null
  } catch {
    return null
  }
}

/* ---------------------------------- */
/* Headers (FIXED)                    */
/* ---------------------------------- */

async function prepareHeaders(
  path: string,
  options?: RequestOptions
): Promise<HeadersInit> {
  const requireAuth = options?.requireAuth ?? true
  const requireTenant = options?.requireTenant ?? true

  const token = await getClerkToken()
  const tenantId = useSessionStore.getState().tenantId

  console.log('[API DEBUG]', {
    path,
    requireAuth,
    requireTenant,
    hasToken: !!token,
    tenantId,
  })

  // 🔐 AUTH (strict)
  if (requireAuth && !token) {
    console.error('[API BLOCKED] Missing token →', path)
    throw unauthorizedError()
  }

  // ⚠️ TENANT (NON-BLOCKING → critical for bootstrap)
  if (requireTenant && !tenantId) {
    console.warn('[API WARNING] Missing tenant →', path)

    return buildHeaders({
      token,
      tenantId: undefined,
      includeTenant: false, // 🚨 ensures PUBLIC behavior
    })
  }

  return buildHeaders({
    token,
    tenantId,
    includeTenant: requireTenant && !!tenantId,
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
  } catch {}

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
          headers: await prepareHeaders(path, options), // ✅ FIXED
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
          headers: await prepareHeaders(path, options), // ✅ FIXED
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