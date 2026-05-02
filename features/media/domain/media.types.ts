import {
  MEDIA_TYPE,
  MEDIA_SOURCE,
  MEDIA_VARIANT,
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
   Media Variant
----------------------------- */
export type MediaVariant =
  (typeof MEDIA_VARIANT)[keyof typeof MEDIA_VARIANT]

/* -----------------------------
   Media (Domain)
----------------------------- */
export type Media = {
  id: string

  type: MediaType
  mimeType?: string

  storageKey: string

  // 🔥 variants
  thumbnailKey?: string
  previewKey?: string

  fileName?: string
  fileSize?: number

  width?: number
  height?: number
  duration?: number

  source: MediaSource
}