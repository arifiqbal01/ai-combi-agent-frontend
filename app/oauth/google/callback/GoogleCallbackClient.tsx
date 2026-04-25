'use client'

import { useEffect, useRef } from 'react'
import { Stack, Text } from '@/ui'
import { useOAuthCallback } from '@/features/channels/application/oauth/useOAuthCallback'

export default function GoogleCallbackClient() {
  const { handle } = useOAuthCallback()

  // 🔥 prevent double execution (important in strict mode)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    handle()
  }, [handle])

  return (
    <Stack className="p-6">
      <Text>Finalizing connection...</Text>
    </Stack>
  )
}