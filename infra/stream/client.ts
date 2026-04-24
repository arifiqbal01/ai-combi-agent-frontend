'use client'

import { API_CONFIG } from '@/infra/api/config'

type ConnectionState =
  | 'connected'
  | 'reconnecting'
  | 'disconnected'

type Handlers = Record<string, (payload: any) => void> & {
  connection_state?: (state: ConnectionState) => void
}

/* =========================
 🔐 Token
========================= */

async function getToken(): Promise<string | null> {
  try {
    // @ts-ignore
    return await window.Clerk?.session?.getToken({
      template: 'ai-combi-agent',
    })
  } catch {
    return null
  }
}

/* =========================
 🔥 GLOBAL SINGLETON
========================= */

let activeStream: EventSource | null = null

/* =========================
 🚀 STREAM
========================= */

export function createStream(
  path: string,
  handlers?: Handlers
) {
  let retry = 0
  let closed = false
  let connecting = false
  let shouldReconnect = true

  let heartbeatAt = Date.now()
  let heartbeatTimer: any = null

  async function buildUrl() {
    let url = `${API_CONFIG.BASE_URL}${API_CONFIG.PREFIX}${path}`

    const params = new URLSearchParams()

    const token = await getToken()
    if (token) params.append('token', token)

    const tenantId =
      typeof window !== 'undefined'
        ? localStorage.getItem('tenant_id')
        : null

    if (tenantId) params.append('tenant_id', tenantId)

    const qs = params.toString()
    if (qs) url += `?${qs}`

    return url
  }

  function cleanup() {
    if (activeStream) {
      activeStream.close()
      activeStream = null
    }

    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  function attachHandlers(stream: EventSource) {
    if (!handlers) return

    Object.keys(handlers).forEach((event) => {
      if (event === 'connection_state') return

      stream.addEventListener(event, (e) => {
        try {
          const payload = JSON.parse(
            (e as MessageEvent).data
          )
          handlers[event]?.(payload)
        } catch {}
      })
    })

    stream.addEventListener('disconnect', () => {
      shouldReconnect = false
      handlers?.connection_state?.('disconnected')
      cleanup()
    })

    stream.addEventListener('heartbeat', () => {
      heartbeatAt = Date.now()
    })
  }

  function startHeartbeatWatchdog() {
    heartbeatTimer = setInterval(() => {
      if (Date.now() - heartbeatAt > 30000) {
        cleanup()

        if (!closed && shouldReconnect) {
          handlers?.connection_state?.('reconnecting')
          connect()
        }
      }
    }, 10000)
  }

  async function connect() {
    if (closed || connecting) return

    connecting = true

    try {
      cleanup()

      const url = await buildUrl()

      const stream = new EventSource(url)
      activeStream = stream

      stream.onopen = () => {
        retry = 0
        connecting = false
        heartbeatAt = Date.now()

        handlers?.connection_state?.('connected')

        attachHandlers(stream)
        startHeartbeatWatchdog()
      }

      stream.onerror = () => {
        connecting = false

        cleanup()

        if (closed || !shouldReconnect) return

        handlers?.connection_state?.('reconnecting')

        retry++

        const timeout = Math.min(30000, 2000 * retry)
        setTimeout(connect, timeout)
      }
    } catch {
      connecting = false

      if (closed || !shouldReconnect) return

      retry++

      const timeout = Math.min(30000, 2000 * retry)
      setTimeout(connect, timeout)
    }
  }

  connect()

  return {
    close() {
      closed = true
      shouldReconnect = false
      handlers?.connection_state?.('disconnected')
      cleanup()
    },
  }
}