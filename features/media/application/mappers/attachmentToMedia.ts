import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'
import { Media } from '../../domain/media.types'
import { MEDIA_TYPE, MEDIA_SOURCE } from '../../domain/media.constants'

export function mapAttachmentToMedia(
  file: Attachment
): Media {
  return {
    id: file.id,

    type: mapKindToMediaType(file.kind),

    mimeType: file.mimeType,

    storageKey: file.storageKey,

    fileName: file.fileName,
    fileSize: file.fileSize,

    source: MEDIA_SOURCE.UPLOAD, // default (can improve later)
  }
}

/* ----------------------------------------
   Mapping
---------------------------------------- */

function mapKindToMediaType(
  kind: Attachment['kind']
): Media['type'] {
  switch (kind) {
    case 'image':
      return MEDIA_TYPE.IMAGE

    case 'video':
      return MEDIA_TYPE.VIDEO

    case 'audio':
      return MEDIA_TYPE.AUDIO

    case 'pdf':
      return MEDIA_TYPE.DOCUMENT

    default:
      return MEDIA_TYPE.OTHER
  }
}