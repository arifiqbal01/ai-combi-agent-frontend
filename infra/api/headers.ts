// infra/api/headers.ts

type HeaderOptions = {
  token?: string | null
  tenantId?: string | null
  includeTenant?: boolean
}

export function buildHeaders(options: HeaderOptions): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Correlation-ID': crypto.randomUUID(),
  }

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`
  }

  if (options.includeTenant && options.tenantId) {
    headers['X-Tenant-ID'] = options.tenantId
  }

  return headers
}