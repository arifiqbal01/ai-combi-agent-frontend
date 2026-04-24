// ui/shell/header/UserMenu.tsx
'use client'

import {
  Avatar,
  Text,
  Surface,
  Stack,
} from '@/ui'

import { LogOut } from 'lucide-react'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useAuth } from '@/core/auth/useAuth'
import { useCurrentUser } from '@/features/users/application/queries/useCurrentUser'

export default function UserMenu() {
  const { data: user, isLoading } = useCurrentUser()

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const auth = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
  if (!open) return

  function handleClick(e: MouseEvent) {
    const target = e.target as Node

    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      setOpen(false)
    }
  }

  document.addEventListener('click', handleClick)

  return () => {
    document.removeEventListener('click', handleClick)
  }
}, [open])

  async function handleLogout() {
  setOpen(false)
  await auth.signOut({
      redirectUrl: '/login',
    })
}

  function renderMenu() {
    if (!mounted || !open || !buttonRef.current) return null

    const rect = buttonRef.current.getBoundingClientRect()

    return createPortal(
      <Surface
        ref={menuRef}
        role="menu"
        className="absolute z-[100] w-56 rounded-lg shadow-md"
        style={{
          position: 'fixed',
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        }}
      >
        <Stack gap="sm" className="p-3">
          {/* USER INFO */}
          <Stack gap="xs">
            <Text size="sm" weight="medium">
              {user?.name || user?.email || 'User'}
            </Text>

            <Text size="xs" tone="secondary">
              {user?.role || ''}
            </Text>
          </Stack>

          <div className="border-t border-border-subtle" />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2 px-2 py-2 text-sm
              text-red-600 hover:bg-bg-muted rounded-md
            "
          >
            <LogOut size={16} />
            <Text size="sm">Logout</Text>
          </button>
        </Stack>
      </Surface>,
      document.body
    )
  }

  // 🔥 Safe avatar fallback during loading
  const avatarLabel =
    user?.name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    (isLoading ? '...' : 'U')

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="
          rounded-full
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand/30
        "
      >
        <Avatar label={avatarLabel} size="sm" />
      </button>

      {renderMenu()}
    </>
  )
}