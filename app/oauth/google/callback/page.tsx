'use client'

import { useEffect } from 'react'
import { Stack, Text } from '@/ui'
import { useOAuthCallback } from '@/features/channels/application/oauth/useOAuthCallback'

export default function GoogleCallbackPage() {
  const { handle } = useOAuthCallback()

  useEffect(() => {
    handle()
  }, [handle])

  return (
    <Stack className="p-6">
      <Text>Finalizing connection...</Text>
    </Stack>
  )
}