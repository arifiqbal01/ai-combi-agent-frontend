'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/ui'
import { Media } from '@/features/media/domain/media.types'

import { LightboxHeader } from './LightboxHeader'
import { LightboxContent } from './LightboxContent'
import { LightboxFooter } from './LightboxFooter'

type Props = {
  mediaList: Media[]
  initialIndex: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MediaLightbox({
  mediaList,
  initialIndex,
  open,
  onOpenChange,
}: Props) {
  const [index, setIndex] = useState(initialIndex)

  /**
   * ✅ FIX: prevent index reset loop
   */
  const initializedRef = useRef(false)

  useEffect(() => {
    if (open && !initializedRef.current) {
      setIndex(initialIndex)
      initializedRef.current = true
    }

    if (!open) {
      initializedRef.current = false
    }
  }, [open, initialIndex])

  const close = () => onOpenChange(false)

  /**
   * ✅ Keyboard navigation
   */
  useEffect(() => {
    if (!open) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIndex((i) => Math.max(i - 1, 0))
      }

      if (e.key === 'ArrowRight') {
        setIndex((i) => Math.min(i + 1, mediaList.length - 1))
      }

      if (e.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, mediaList.length])

  if (!mediaList?.length) return null

  const activeMedia = mediaList[index]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-bg-app border-none p-0 overflow-hidden"
        variant="fullscreen"
      >
        <DialogTitle className="sr-only">
          Media preview
        </DialogTitle>

        <LightboxHeader media={activeMedia} onClose={close} />

        {/* ✅ Clean content (no backdrop click interference) */}
        <LightboxContent
          mediaList={mediaList}
          index={index}
        />

        {/* ✅ Thumbnails control navigation */}
        <LightboxFooter
          mediaList={mediaList}
          index={index}
          onSelect={setIndex}
        />
      </DialogContent>
    </Dialog>
  )
}