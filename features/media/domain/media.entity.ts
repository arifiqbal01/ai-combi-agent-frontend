import { Media } from './media.types'

/* ----------------------------------------
   Create Media Entity
---------------------------------------- */
export function createMediaEntity(
  data: Media
): Media {
  return {
    id: data.id,

    type: data.type,
    mimeType: data.mimeType,

    /**
     * Local optimistic preview only
     */
    directUrl:
      data.directUrl ?? undefined,

    fileName:
      data.fileName ?? undefined,

    fileSize:
      data.fileSize ?? undefined,

    width:
      data.width ?? undefined,

    height:
      data.height ?? undefined,

    duration:
      data.duration ?? undefined,

    source: data.source,
  }
}