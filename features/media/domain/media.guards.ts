import { MEDIA_TYPE } from './media.constants'
import { Media } from './media.types'

/* ----------------------------------------
   Type Guards
---------------------------------------- */
export function isImage(media: Media): boolean {
  return media.type === MEDIA_TYPE.IMAGE
}

export function isVideo(media: Media): boolean {
  return media.type === MEDIA_TYPE.VIDEO
}

export function isAudio(media: Media): boolean {
  return media.type === MEDIA_TYPE.AUDIO
}

export function isDocument(media: Media): boolean {
  return media.type === MEDIA_TYPE.DOCUMENT
}

/* ----------------------------------------
   Capability Checks
---------------------------------------- */
export function canPreview(media: Media): boolean {
  return (
    isImage(media) ||
    isVideo(media) ||
    isAudio(media) ||
    isDocument(media)
  )
}

export function isPlayable(media: Media): boolean {
  return isVideo(media) || isAudio(media)
}

/* ----------------------------------------
   Variant Helpers (🔥 NEW)
---------------------------------------- */
export function hasThumbnail(media: Media): boolean {
  return !!media.thumbnailKey
}

export function hasPreview(media: Media): boolean {
  return !!media.previewKey
}

export function getBestPreviewKey(media: Media): string {
  return (
    media.thumbnailKey ||
    media.previewKey ||
    media.storageKey
  )
}

/* ----------------------------------------
   File Helpers
---------------------------------------- */
export function getDisplayName(media: Media): string {
  return media.fileName || 'File'
}

/* ----------------------------------------
   Fallback Type Detection (optional)
---------------------------------------- */
export function isImageMime(mime?: string): boolean {
  return !!mime && mime.startsWith('image/')
}

export function isVideoMime(mime?: string): boolean {
  return !!mime && mime.startsWith('video/')
}

export function isAudioMime(mime?: string): boolean {
  return !!mime && mime.startsWith('audio/')
}