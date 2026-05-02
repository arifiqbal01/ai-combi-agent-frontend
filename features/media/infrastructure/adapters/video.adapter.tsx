'use client'

import { MediaAdapter } from './media.adapter'
import { isVideo } from '../../domain/media.guards'

import { MediaIcon } from '@/features/media/ui/components/base/media.icon'
import { Icon } from '@/ui'
import { Play } from 'lucide-react'

export const videoAdapter: MediaAdapter = {
  type: 'video',

  canHandle: (media) => isVideo(media),

  /* ----------------------------------------
     PREVIEW (THUMBNAIL + PLAY OVERLAY)
  ---------------------------------------- */
  renderPreview: (media, ctx) => {
    return (
      <div
        onClick={ctx?.onClick}
        className="
          relative
          w-full
          aspect-video
          rounded-lg
          overflow-hidden
          bg-black
          cursor-pointer
          group
        "
      >
        {/* THUMBNAIL */}
        {ctx?.isLoading && (
          <div className="w-full h-full animate-pulse bg-bg-muted" />
        )}

        {!ctx?.isLoading && ctx?.url && (
          <img
            src={ctx.url}
            alt={media.fileName || 'video'}
            className="
              w-full h-full
              object-cover
              transition
              duration-200
              group-hover:scale-[1.02]
            "
          />
        )}

        {!ctx?.isLoading && !ctx?.url && (
          <div className="w-full h-full flex items-center justify-center">
            <MediaIcon media={media} size="md" />
          </div>
        )}

        {/* PLAY OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              bg-black/60
              rounded-full
              p-3
              backdrop-blur
            "
          >
            <Icon size="md" tone="default">
              <Play />
            </Icon>
          </div>
        </div>

        {/* HOVER OVERLAY */}
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
     FULL (VIDEO PLAYER)
  ---------------------------------------- */
  renderFull: (media, ctx) => {
    if (ctx?.isLoading) {
      return (
        <div className="text-sm text-text-muted">
          Loading video...
        </div>
      )
    }

    if (ctx?.isError || !ctx?.url) {
      return (
        <div className="text-sm text-red-500">
          Failed to load video
        </div>
      )
    }

    return (
      <video
        controls
        autoPlay
        className="
          max-w-full
          max-h-[85vh]
          rounded-md
        "
      >
        <source src={ctx.url} />
      </video>
    )
  },
}