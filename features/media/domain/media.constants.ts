/* -----------------------------
   Media Type
----------------------------- */
export const MEDIA_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  OTHER: 'other',
} as const

/* -----------------------------
   Media Source (channel)
----------------------------- */
export const MEDIA_SOURCE = {
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  INSTAGRAM: 'instagram',
  UPLOAD: 'upload',
} as const

/* -----------------------------
   Media Variant
----------------------------- */
export const MEDIA_VARIANT = {
  THUMBNAIL: 'thumbnail',
  PREVIEW: 'preview',
  FULL: 'full',
} as const