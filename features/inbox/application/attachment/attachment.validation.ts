// features/inbox/application/attachment/services/attachment.validation.ts

import { MessagePolicy } from '@/features/inbox/domain/message/message.policy'

import {
  ALLOWED_ATTACHMENT_MIME_TYPES
} from '@/features/inbox/domain/attachment/attachment.rules'

export function validateAttachment(
  file: File,
  policy: MessagePolicy
): {
  valid: boolean
  reason?: string
} {

  /* =========================
     Capability check
  ========================= */

  if (!policy.capabilities.canAttach) {
    return {
      valid: false,
      reason: 'Attachments not allowed'
    }
  }

  /* =========================
     File size check
  ========================= */

  const maxSizeBytes =
    policy.limits.maxFileSizeMB * 1024 * 1024

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      reason: 'File too large'
    }
  }

  /* =========================
     MIME type check (FIXED)
  ========================= */

  const allowedTypes =
    ALLOWED_ATTACHMENT_MIME_TYPES as readonly string[]

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      reason: 'File type not allowed'
    }
  }

  /* =========================
     Valid
  ========================= */

  return {
    valid: true
  }
}

/* =========================
   Attachment count limit
========================= */

export function validateAttachmentLimit(
  current: number,
  incoming: number,
  max: number
): {
  valid: boolean
  reason?: string
} {

  if (current + incoming > max) {
    return {
      valid: false,
      reason: 'Attachment limit reached'
    }
  }

  return {
    valid: true
  }
}