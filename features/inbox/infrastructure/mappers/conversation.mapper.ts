import {
  ConversationListItemDTO,
  ConversationDetailDTO
} from '../dto/conversation.dto'

import {
  Conversation,
  ConversationSummary,
  ConversationStatus
} from '@/features/inbox/domain/conversation/conversation.types'

import {
  ChannelType
} from '@/features/inbox/domain/channel/channel.types'

import {
  mapMessages
} from './message.mapper'

/* =========================
 Channel normalization
========================= */

function normalizeChannel(channel:string):ChannelType{
  if(channel===ChannelType.WHATSAPP) return ChannelType.WHATSAPP
  if(channel===ChannelType.SLACK) return ChannelType.SLACK
  if(channel===ChannelType.INSTAGRAM) return ChannelType.INSTAGRAM
  if(channel===ChannelType.SYSTEM) return ChannelType.SYSTEM
  return ChannelType.EMAIL
}

/* =========================
 🔥 NEW: normalize message status
========================= */

function normalizeMessageStatus(message:any){
  if(!message?.meta) return message

  // 🔥 TEMP FIX FOR BETA
  if(message.meta.status === 'pending'){
    return {
      ...message,
      meta: {
        ...message.meta,
        status: 'sent'
      },
      syncState: 'sent'
    }
  }

  return message
}

/* =========================
 Conversation list mapper
========================= */

export function mapConversationListItemDTO(
  dto:ConversationListItemDTO
):ConversationSummary{

  return{
    id:dto.id,
    subject: dto.subject || dto.sender || 'Conversation',
    preview: dto.preview || '',
    unreadCount: dto.unread_count,
    lastMessageAt: dto.last_message_at,
    channel: normalizeChannel(dto.channel_type),
    sender: dto.sender,
    channelAccount: dto.channel_account
  }
}

/* =========================
 Conversation detail mapper
========================= */

export function mapConversationDetailDTO(
  dto:ConversationDetailDTO
):Conversation{

  const mappedMessages =
    mapMessages(
      dto.messages || [],
      dto.channel_account,
      dto.sender
    )

  /* 🔥 APPLY NORMALIZATION HERE */
  const normalizedMessages =
    mappedMessages.map(normalizeMessageStatus)

  /* ensure correct order */
  const orderedMessages =
    [...normalizedMessages].sort(
      (a,b)=>
        new Date(a.meta.createdAt).getTime()
        -
        new Date(b.meta.createdAt).getTime()
    )

  /* build message index */
  const messageIndex = new Map<string,number>()

  orderedMessages.forEach((m,i)=>{
    const key = m.clientId || m.id

    messageIndex.set(key,i)

    if(m.clientId){
      messageIndex.set(m.clientId,i)
    }

    messageIndex.set(m.id,i)
  })

  const lastMessage =
    orderedMessages.length
      ? orderedMessages[orderedMessages.length-1]
      : undefined

  return{
    id:dto.id,
    subject: dto.subject || dto.sender || '',
    status: ConversationStatus.OPEN,
    channel: normalizeChannel(dto.channel_type),
    unreadCount: dto.unread_count,
    createdAt: dto.last_message_at,
    updatedAt: dto.last_message_at,
    participants: [],
    messages: orderedMessages,
    messageIndex,
    lastMessage,
    sender: dto.sender,
    channelAccount: dto.channel_account
  }
}