'use client'

import { useEffect, useMemo } from 'react'
import { useHeaderContext } from '../header.context'

export function useHeader(config: {
  title?: string
  actions?: React.ReactNode
}) {
  const { setHeader } = useHeaderContext()

  // 🔥 prevent infinite updates
  const stableConfig = useMemo(() => config, [
    config.title,
    config.actions,
  ])

  useEffect(() => {
    setHeader(stableConfig)

    return () => setHeader({})
  }, [stableConfig, setHeader])
}