'use client'

import { MediaAdapter } from './media.adapter'
import { isImage } from '../../domain/media.guards'

export const imageAdapter: MediaAdapter = {
  type: 'image',

  canHandle: (media) => isImage(media),

  /* ----------------------------------------
     PREVIEW (use ctx instead of hook)
  ---------------------------------------- */
  renderPreview: (media, ctx) => {
    return (
      <div
        className="
          relative
          w-full
          h-full
          rounded-lg
          overflow-hidden
          bg-bg-muted
          cursor-pointer
          group
        "
      >
        {ctx?.url ? (
          <img
            src={ctx.url}
            alt={media.fileName || 'image'}
            className="
              w-full
              h-full
              object-cover
              transition
              duration-200
              group-hover:scale-[1.02]
            "
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-bg-muted" />
        )}

        <div
          className="
            absolute inset-0
            bg-black/0
            group-hover:bg-black/10
            transition
          "
        />
      </div>
    )
  },

  /* ----------------------------------------
     FULL (use ctx instead of hook)
  ---------------------------------------- */
  renderFull: (media, ctx) => {
    if (!ctx?.url) return null

    return (
      <img
        src={ctx.url}
        alt={media.fileName || 'image'}
        className="
          max-w-full
          max-h-[85vh]
          object-contain
        "
      />
    )
  },
}