// infra/api/config.ts

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '') // remove trailing slash
  }

  // ✅ Safe fallback for local/dev ONLY
  if (typeof window !== 'undefined') {
    console.warn('[API CONFIG] Missing NEXT_PUBLIC_API_BASE_URL → using window origin')
    return window.location.origin
  }

  console.warn('[API CONFIG] Missing NEXT_PUBLIC_API_BASE_URL → using localhost fallback')
  return 'http://localhost:8000'
}

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  PREFIX: '/api/v1',
}

/* ---------------------------------- */
/* URL Builders                       */
/* ---------------------------------- */

export function buildApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.PREFIX}${cleanPath}`

  // 🔍 Debug (remove later if needed)
  if (typeof window !== 'undefined') {
    console.log('[API URL]', url)
  }

  return url
}

export function buildStreamUrl(
  path: string,
  token?: string
): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  let url = `${API_CONFIG.BASE_URL}${API_CONFIG.PREFIX}${cleanPath}`

  if (token) {
    url += `?token=${encodeURIComponent(token)}`
  }

  return url
}