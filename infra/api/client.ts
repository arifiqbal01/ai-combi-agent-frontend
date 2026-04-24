'use client'

import { useSessionStore } from '@/core/session/session.store'
import { buildApiUrl } from '@/infra/api/config'
import { buildHeaders } from '@/infra/api/headers'

type RequestOptions = {
  requireAuth?: boolean
  requireTenant?: boolean
}

async function getClerkToken(): Promise<string | null> {
  try {
    if (!window.Clerk) return null

    let attempts = 0
    while (!window.Clerk.session && attempts < 10) {
      await new Promise((r) => setTimeout(r, 100))
      attempts++
    }

    return await window.Clerk.session?.getToken({
      template: 'ai-combi-agent',
    }) ?? null
  } catch {
    return null
  }
}

async function prepareHeaders(options?: RequestOptions): Promise<HeadersInit> {
  const token = await getClerkToken()

  const requireAuth = options?.requireAuth ?? true
  const requireTenant = options?.requireTenant ?? true

  if (requireAuth && !token) {
    throw new Error('NO_TOKEN')
  }

  const tenantId = useSessionStore.getState().tenantId

  if (requireTenant && !tenantId) {
    throw new Error('NO_TENANT')
  }

  return buildHeaders({
    token,
    tenantId,
    includeTenant: requireTenant,
  })
}

type ApiError = Error & { status?: number; code?: string }

function handleError(status: number, text: string): never {
  const err: ApiError = new Error(`API_ERROR_${status}`)
  err.status = status
  err.code = tryParseCode(text)

  throw err
}

function tryParseCode(text: string): string | undefined {
  try {
    return JSON.parse(text)?.code
  } catch {
    return undefined
  }
}

export const apiClient = {
  get: async <T>(
    path: string,
    options?: RequestOptions
  ): Promise<T> => {

    const res = await fetch(buildApiUrl(path), {
      method: 'GET',
      headers: await prepareHeaders(options),
    })

    if (!res.ok) handleError(res.status, await res.text())

    return res.json()
  },

  post: async <T, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T> => {

    const res = await fetch(buildApiUrl(path), {
      method: 'POST',
      headers: await prepareHeaders(options),
      body: JSON.stringify(body),
    })

    if (!res.ok) handleError(res.status, await res.text())

    return res.json()
  },
}