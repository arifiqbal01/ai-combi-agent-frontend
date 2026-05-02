'use client'

import { useState } from 'react'

import { Media } from '@/features/media/domain/media.types'

import { MediaLightbox } from '@/features/media/ui/components/lightbox/MediaLightbox'
import { MediaGridItem } from '@/features/media/ui/components/grid/MediaGridItem'

type Props = {
  items: Media[]
}

export function MediaGrid({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (!items?.length) return null

  const visible = items.slice(0, 4)
  const remaining = items.length - 4

  return (
    <>
      <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            gap-2
            max-w-[640px]
          "
        >
        {visible.map((media, index) => {
          const realIndex = items.findIndex(
            (m) => m.id === media.id
          )

          const isLast = index === 3 && remaining > 0

          return (
            <MediaGridItem
              key={media.id}
              media={media}
              index={realIndex}
              onClick={(i) => setActiveIndex(i)}
              overlay={isLast ? `+${remaining}` : null}
            />
          )
        })}
      </div>

      <MediaLightbox
        mediaList={items}
        initialIndex={activeIndex ?? 0}
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null)
        }}
      />
    </>
  )
}