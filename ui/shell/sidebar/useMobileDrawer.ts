'use client'

import { useState, useEffect, useCallback } from 'react'

export function useMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer()
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [closeDrawer])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }
}