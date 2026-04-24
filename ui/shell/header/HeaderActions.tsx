'use client'

import { useHeaderContext } from './header.context'

export default function HeaderActions() {
  const { state } = useHeaderContext()

  return <>{state.actions}</>
}