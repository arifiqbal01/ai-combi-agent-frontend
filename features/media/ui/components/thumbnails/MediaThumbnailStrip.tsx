'use client'

import { useEffect, useRef } from 'react'
import { Media } from '@/features/media/domain/media.types'
import { MediaThumbnailItem } from './MediaThumbnailItem'

export function MediaThumbnailStrip({
  mediaList,
  activeIndex,
  onSelect,
}: {
  mediaList: Media[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = itemRefs.current[activeIndex]
    if (el && containerRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [activeIndex])

  return (
    <div
      ref={containerRef}
      className="mt-2 flex gap-2 overflow-x-auto px-2 pb-2"
    >
      {mediaList.map((media, i) => (
        <div
          key={media.id}
          ref={(node) => {
            itemRefs.current[i] = node
          }}
        >
          <MediaThumbnailItem
            media={media}
            active={i === activeIndex}
            onClick={() => onSelect(i)}
          />
        </div>
      ))}
    </div>
  )
}