'use client'

/**
 * ⚠️ IMPORTANT — DO NOT BREAK THIS
 *
 * This API client is BOOTSTRAP-SAFE.
 *
 * Key Rules:
 *
 * 1. NEVER block requests when tenantId is missing
 *    - Bootstrap flow requires calling public endpoints (e.g. /auth/tenants)
 *    - tenantId is NOT available initially
 *
 * 2. requireTenant = true DOES NOT mean "block request"
 *    - It ONLY means: include tenant header IF available
 *    - Backend is responsible for strict validation
 *
 * 3. Public routes MUST work without tenant:
 *    Example:
 *      /auth/tenants
 *      /auth/me
 *
 * 4. If you reintroduce:
 *      throw new Error('NO_TENANT')
 *    👉 YOU WILL BREAK THE ENTIRE APP (infinite loader)
 *
 * 5. Header behavior must remain:
 *    includeTenant: requireTenant && !!tenantId
 *
 * Bottom line:
 * 👉 Frontend = tolerant
 * 👉 Backend = strict
 */

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
/* Headers                            */
/* ---------------------------------- */

async function prepareHeaders(
  path: string,
  options?: RequestOptions
): Promise<HeadersInit> {
  const requireAuth = options?.requireAuth ?? true
  const requireTenant = options?.requireTenant ?? true

  const token = await getClerkToken()
  const tenantId = useSessionStore.getState().tenantId

  // 🔐 AUTH (strict)
  if (requireAuth && !token) {
    throw unauthorizedError()
  }

  // ⚠️ TENANT (NON-BLOCKING → critical for bootstrap)
  if (requireTenant && !tenantId) {
    return buildHeaders({
      token,
      tenantId: undefined,
      includeTenant: false,
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
          headers: await prepareHeaders(path, options),
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
          headers: await prepareHeaders(path, options),
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