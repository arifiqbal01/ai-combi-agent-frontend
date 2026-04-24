'use client'

import { createContext, useContext, useState } from 'react'

type HeaderState = {
  title?: string
  actions?: React.ReactNode
}

const HeaderContext = createContext<{
  state: HeaderState
  setHeader: (value: HeaderState) => void
}>({
  state: {},
  setHeader: () => {},
})

export function HeaderProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<HeaderState>({})

  return (
    <HeaderContext.Provider
      value={{ state, setHeader: setState }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderContext() {
  return useContext(HeaderContext)
}