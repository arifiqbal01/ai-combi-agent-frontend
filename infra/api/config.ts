// infra/api/config.ts

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (envUrl?.trim()) {
    return envUrl.replace(/\/$/, '')
  }

  // local dev fallback
  return 'http://127.0.0.1:8000'
}

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  PREFIX: '/api/v1',
}

export function buildApiUrl(path: string): string {
  const cleanPath = path.startsWith('/')
    ? path
    : `/${path}`

  return `${API_CONFIG.BASE_URL}${API_CONFIG.PREFIX}${cleanPath}`
}

export function buildStreamUrl(
  path: string,
  token?: string
): string {
  const cleanPath = path.startsWith('/')
    ? path
    : `/${path}`

  let url =
    `${API_CONFIG.BASE_URL}${API_CONFIG.PREFIX}${cleanPath}`

  if (token) {
    url += `?token=${encodeURIComponent(token)}`
  }

  return url
}