'use client'

import { Text } from '@/ui'
import { useHeaderContext } from './header.context'

export default function HeaderTitle() {
  const { state } = useHeaderContext()

  return (
    <Text size="sm" weight="semibold">
      {state.title ?? 'AI Combi Agent'}
    </Text>
  )
}