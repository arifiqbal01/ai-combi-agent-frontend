'use client'

import clsx from 'clsx'
import { X } from 'lucide-react'

import { NAV_SECTIONS } from './nav.config'
import SidebarSection from './SidebarSection'

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({
  open,
  onClose,
}: MobileDrawerProps) {
  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex transition-opacity duration-300',
        open
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={clsx(
          'w-72 max-w-[85%] bg-bg-surface h-full shadow-xl flex flex-col transform transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <span className="font-semibold">
            Menu
          </span>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-bg-muted"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 px-2 py-4 space-y-2">
          {NAV_SECTIONS.map((section, index) => (
            <SidebarSection
              key={index}
              items={section.items}
              variant="drawer"
              onItemClick={onClose}
            />
          ))}
        </div>
      </div>

      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      />
    </div>
  )
}