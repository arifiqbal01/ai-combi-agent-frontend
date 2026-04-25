/* infrastructure/mappers/attachment.mapper.ts */

import { AttachmentDTO } from '../dto/attachment.dto'

import {
  Attachment,
  AttachmentKind
} from '@/features/inbox/domain/attachment/attachment.types'

/* =========================
 Helpers
========================= */

function normalizeMime(mime?: string): string {
  return (mime || '').toLowerCase()
}

/* =========================
 Kind resolver
========================= */

function resolveAttachmentKind(
  mime?: string
): AttachmentKind {

  const m = normalizeMime(mime)

  if (m.startsWith('image/')) return AttachmentKind.IMAGE
  if (m.startsWith('video/')) return AttachmentKind.VIDEO
  if (m.startsWith('audio/')) return AttachmentKind.AUDIO
  if (m === 'application/pdf') return AttachmentKind.PDF

  return AttachmentKind.FILE
}

/* =========================
 Icon resolver
========================= */

function resolveIcon(kind: AttachmentKind): string {

  switch (kind) {
    case AttachmentKind.IMAGE:
      return 'image'

    case AttachmentKind.PDF:
      return 'pdf'

    case AttachmentKind.VIDEO:
      return 'video'

    case AttachmentKind.AUDIO:
      return 'audio'

    default:
      return 'file'
  }
}

/* =========================
 Single mapper
========================= */

export function mapAttachmentDTO(
  dto: AttachmentDTO
): Attachment {

  const kind = resolveAttachmentKind(dto.mime_type)

  return {
    id: dto.id ?? dto.storage_key,

    fileName: dto.file_name || 'file',

    mimeType: dto.mime_type || 'application/octet-stream',

    fileSize:
      typeof dto.file_size === 'number'
        ? dto.file_size
        : 0,

    storageKey: dto.storage_key,

    kind,
    icon: resolveIcon(kind)
  }
}

/* =========================
 List mapper
========================= */

export function mapAttachments(
  attachments: AttachmentDTO[] | null | undefined
): Attachment[] {

  return (attachments || []).map(mapAttachmentDTO)
}