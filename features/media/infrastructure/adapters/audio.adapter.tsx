'use client'

import { MediaAdapter } from './media.adapter'
import { isAudio } from '../../domain/media.guards'

import { MediaIcon } from '@/features/media/ui/components/base/media.icon'

export const audioAdapter: MediaAdapter = {
  type: 'audio',

  canHandle: (media) => isAudio(media),

  /* ----------------------------------------
     PREVIEW (CHAT STYLE)
  ---------------------------------------- */
  renderPreview: (media, ctx) => {
    return (
      <div
        className="
          flex items-center gap-3
          px-3 py-2.5

          rounded-lg
          border border-border-subtle

          bg-bg-surface
          hover:bg-bg-muted

          transition
        "
      >
        {/* ICON */}
        <div
          className="
            flex items-center justify-center
            w-10 h-10

            rounded-md
            bg-bg-muted
            border border-border-subtle
          "
        >
          <MediaIcon media={media} size="sm" />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          {ctx?.isLoading && (
            <div className="h-8 bg-bg-muted animate-pulse rounded" />
          )}

          {!ctx?.isLoading && ctx?.url && (
            <audio
              controls
              src={ctx.url}
              className="w-full"
            />
          )}

          {!ctx?.isLoading && !ctx?.url && (
            <div className="text-xs text-text-muted">
              Audio unavailable
            </div>
          )}
        </div>
      </div>
    )
  },

  /* ----------------------------------------
     FULL (LIGHTBOX)
  ---------------------------------------- */
  renderFull: (media, ctx) => {
    if (ctx?.isLoading) {
      return (
        <div className="text-sm text-text-muted">
          Loading audio...
        </div>
      )
    }

    if (ctx?.isError || !ctx?.url) {
      return (
        <div className="text-sm text-red-500">
          Failed to load audio
        </div>
      )
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        <audio
          controls
          autoPlay
          src={ctx.url}
          className="w-full max-w-md"
        />
      </div>
    )
  },
}