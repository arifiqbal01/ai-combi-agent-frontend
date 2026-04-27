'use client'

import { Inline, Badge } from '@/ui'
import HeaderTitle from './HeaderTitle'
import { useSession } from '@/core/session'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

import { NAV_SECTIONS } from '../sidebar/nav.config'
import SidebarSection from '../sidebar/SidebarSection'

export default function HeaderLeft() {
  const { tenantName } = useSession()
  const [open, setOpen] = useState(false)

  // ✅ Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // ✅ Prevent background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <Inline gap="md">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-bg-muted"
        >
          <Menu size={20} />
        </button>

        <HeaderTitle />

        {tenantName && <Badge>{tenantName}</Badge>}
      </Inline>

      {/* MOBILE DRAWER */}
      <div
        className={clsx(
          'fixed inset-0 z-50 flex transition-opacity duration-300',
          open
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Drawer */}
        <div
          className={clsx(
            'w-72 max-w-[85%] bg-bg-surface h-full shadow-xl flex flex-col transform transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b">
            <span className="font-semibold">Menu</span>

            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-bg-muted"
            >
              <X size={18} />
            </button>
          </div>

          {/* NAV */}
          <div className="flex-1 px-2 py-4 space-y-2">
            {NAV_SECTIONS.map((section, i) => (
              <SidebarSection
                key={i}
                items={section.items}
                variant="drawer"
                onItemClick={() => setOpen(false)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
              A
            </div>
            <div className="text-sm font-medium">Account</div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className="flex-1 bg-black/40"
          onClick={() => setOpen(false)}
        />
      </div>
    </>
  )
}