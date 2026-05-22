'use client'

import type { ReactNode } from 'react'

import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'
import Content from '../content/Content'
import { HeaderProvider } from '../header/header.context'

export default function ShellLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-screen w-full flex flex-col bg-bg-app">
      <HeaderProvider>
        <header className="h-14 md:h-14 flex-shrink-0 border-b border-border-subtle bg-bg-surface">
          <Header />
        </header>

        {/* BODY */}
        <div className="flex flex-1 min-h-0">
          <aside className="hidden md:block w-20 border-r border-border-subtle bg-[rgb(var(--bg-surface-neutral))] shrink-0">
            <Sidebar />
          </aside>

          <Content>
            {children}
          </Content>
        </div>
      </HeaderProvider>
    </div>
  )
}