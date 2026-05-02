// features/media/infrastructure/registry/media.registry.ts

import { Media } from '../../domain/media.types'

import { imageAdapter } from '../adapters/image.adapter'
import { videoAdapter } from '../adapters/video.adapter'
import { audioAdapter } from '../adapters/audio.adapter'
import { documentAdapter } from '../adapters/document.adapter'

import { MediaAdapter } from '../adapters/media.adapter'

/* ----------------------------------------
   Adapter Registry
---------------------------------------- */
const adapters: MediaAdapter[] = [
  imageAdapter,
  videoAdapter,
  audioAdapter,
  documentAdapter,
]

/* ----------------------------------------
   Fallback Adapter (important)
---------------------------------------- */
const fallbackAdapter: MediaAdapter = {
  type: 'other',

  canHandle: () => true,

  renderPreview: (media) => (
    <div className="px-3 py-2 border rounded text-xs">
      Unsupported: {media.fileName || 'file'}
    </div>
  ),
}

/* ----------------------------------------
   Get Adapter
---------------------------------------- */
export function getMediaAdapter(media: Media): MediaAdapter {
  return (
    adapters.find((a) => a.canHandle(media)) ||
    fallbackAdapter
  )
}