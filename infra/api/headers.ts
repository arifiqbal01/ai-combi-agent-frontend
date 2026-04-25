type HeaderOptions = {
  token?: string | null
  tenantId?: string | null
  includeTenant?: boolean
}

export function buildHeaders(options: HeaderOptions): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Correlation-ID': safeCorrelationId(),
  }

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`
  }

  if (options.includeTenant && options.tenantId) {
    headers['X-Tenant-ID'] = options.tenantId
  }

  return headers
}

function safeCorrelationId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return Math.random().toString(36).substring(2, 15)
}