import {
  MEDIA_TYPE,
  MEDIA_SOURCE,
} from './media.constants'

/* -----------------------------
   Media Type
----------------------------- */
export type MediaType =
  (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE]

/* -----------------------------
   Media Source
----------------------------- */
export type MediaSource =
  (typeof MEDIA_SOURCE)[keyof typeof MEDIA_SOURCE]

/* -----------------------------
   Media (Domain)
----------------------------- */
export type Media = {
  id: string

  type: MediaType
  mimeType?: string

  /**
   * Local optimistic preview only.
   * Persisted media fetch signed URLs lazily.
   */
  directUrl?: string

  fileName?: string
  fileSize?: number

  width?: number
  height?: number
  duration?: number

  source: MediaSource
}