'use client'

import {
  NAV_SECTIONS,
  NAV_FOOTER,
} from './nav.config'

import SidebarSection from './SidebarSection'
import SidebarFooter from './components/SidebarFooter'

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col items-center py-3">

      {/* NAV */}
      <nav className="flex flex-1 flex-col items-center gap-4 pt-4">
        {NAV_SECTIONS.map((section, i) => (
          <SidebarSection
            key={i}
            items={section.items}
          />
        ))}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto">
        <SidebarFooter items={NAV_FOOTER} />
      </div>

    </div>
  )
}