// features/media/infrastructure/adapters/media.adapter.ts

import { Media } from '../../domain/media.types'
import { MediaVariant } from '../../domain/media.types'

export type MediaRenderContext = {
  variant: MediaVariant

  /**
   * 🔥 Core rendering data (REQUIRED for adapters)
   */
  url?: string | null

  /**
   * 🔄 Fetch state
   */
  isLoading?: boolean
  isError?: boolean

  /**
   * UI interactions (optional)
   */
  onClick?: () => void
}

export type MediaAdapter = {
  type: Media['type']

  canHandle: (media: Media) => boolean

  renderPreview: (
    media: Media,
    ctx?: MediaRenderContext
  ) => React.ReactNode

  renderFull?: (
    media: Media,
    ctx?: MediaRenderContext
  ) => React.ReactNode
}