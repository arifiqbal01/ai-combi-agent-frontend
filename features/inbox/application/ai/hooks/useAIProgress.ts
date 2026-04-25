import { useEffect, useState } from 'react'

import {
  getNextLocalProgress,
  resolveAIProgress
} from '@/features/inbox/domain/ai/ai.progress'

type Props = {
  active: boolean
  backendProgress?: number
}

export function useAIProgress({
  active,
  backendProgress
}: Props) {

  const [localProgress, setLocalProgress] = useState(5)

  useEffect(() => {
    if (!active) {
      // ✅ reset when not active
      setLocalProgress(5)
      return
    }

    const interval = setInterval(() => {
      setLocalProgress(prev =>
        getNextLocalProgress(prev)
      )
    }, 400)

    return () => clearInterval(interval)
  }, [active])

  const progress = resolveAIProgress({
    backendProgress,
    localProgress
  })

  return progress
}