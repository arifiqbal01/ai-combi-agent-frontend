import { Media } from './media.types'

/* ----------------------------------------
   Create Media Entity
---------------------------------------- */
export function createMediaEntity(data: Media): Media {
  return {
    id: data.id,

    type: data.type,
    mimeType: data.mimeType,

    storageKey: data.storageKey,

    // 🔥 include variants (important)
    thumbnailKey: data.thumbnailKey ?? undefined,
    previewKey: data.previewKey ?? undefined,

    fileName: data.fileName ?? undefined,
    fileSize: data.fileSize ?? undefined,

    width: data.width ?? undefined,
    height: data.height ?? undefined,
    duration: data.duration ?? undefined,

    source: data.source,
  }
}