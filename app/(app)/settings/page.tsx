'use client'

import { useState } from 'react'
import SettingsNav from './settings-nav'
import { SettingsSections } from './settings-sections'

export default function SettingsPage() {
  const [active, setActive] = useState('general')

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* LEFT NAV */}
      <aside className="w-64 flex-shrink-0 border-r border-border-subtle bg-bg-surface">
        <SettingsNav active={active} onChange={setActive} />
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto bg-bg-app-soft">
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-6">
          <SettingsSections active={active} />
        </div>
      </main>
    </div>
  )
}
