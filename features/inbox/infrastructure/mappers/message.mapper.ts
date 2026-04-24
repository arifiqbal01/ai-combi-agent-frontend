/* infrastructure/mappers/message.mapper.ts */

import {
 MessageDTO
} from '../dto/message.dto'

import {
 Message,
 MessageAuthor,
 MessageKind,
 MessageDirection,
 MessageAuthorType,
 DeliveryStatus
} from '@/features/inbox/domain/message'

import {
 mapAttachments
} from './attachment.mapper'

import {
 Participant,
 ParticipantTransportRole
} from '@/features/inbox/domain/participant/participant.types'

import {
 processMessages
} from '@/features/inbox/application/message/message.pipeline'

import {
  normalizeDirection,
  normalizeDeliveryStatus,
  resolveKind,
  resolveAuthor,
  resolveFlags,
  formatDisplayTime,
  resolveParticipants
} from './utils/message.utils'

/* =========================
 Message mapper
========================= */

export function mapMessageDTO(

 dto:MessageDTO,

 channelAccount?:string,

 conversationSender?:string

):Message{

 const kind =
  resolveKind(dto)

 const direction =
  normalizeDirection(dto.direction)

 const createdAt =
  dto.timestamp

 const deliveryStatus =
  normalizeDeliveryStatus(
   dto.delivery_status
  )

 return{

  id:dto.id,

  clientId:
   dto.client_id || undefined,

  direction,

  kind,

  author:
   resolveAuthor(dto),

  subject:undefined,

  bodyText:

   dto.body_text ||

   dto.preview ||

   undefined,

  bodyHtml:
   dto.body || '',

  attachments:

   mapAttachments(
    dto.attachments || []
   ),

  participants:

   resolveParticipants(

    dto,

    channelAccount,

    conversationSender

   ),

  flags:{

   aiGenerated:
    dto.actor_type==='ai',

   autoSent:false,

   failed:
    deliveryStatus===
    DeliveryStatus.FAILED

  },

  meta:{

   createdAt,

   displayTime:
    formatDisplayTime(
     createdAt
    ),

   status:
    deliveryStatus

  }

 }

}

/* =========================
 Message list mapper
========================= */

export function mapMessages(

 messages:MessageDTO[],

 channelAccount?:string,

 conversationSender?:string

){

 if(!messages?.length)
  return []

 const mapped = messages.map(

  message=>

   mapMessageDTO(

    message,

    channelAccount,

    conversationSender

   )

 )

 return processMessages(mapped)

}