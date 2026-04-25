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

import { Message } from '@/features/inbox/domain/message/message.types'

/* =========================
 Channel normalization
========================= */

function normalizeChannel(channel?: string): ChannelType {
  switch ((channel || '').toLowerCase()) {
    case 'whatsapp':
      return ChannelType.WHATSAPP
    case 'slack':
      return ChannelType.SLACK
    case 'instagram':
      return ChannelType.INSTAGRAM
    case 'system':
      return ChannelType.SYSTEM
    case 'email':
    default:
      return ChannelType.EMAIL
  }
}

/* =========================
 Message normalization
========================= */

function normalizeMessageStatus(message: Message): Message {
  if (!message.meta) return message

  if (message.meta.status === 'pending') {
    return {
      ...message,
      meta: {
        ...message.meta,
        status: 'sent'
      }
    }
  }

  return message
}

/* =========================
 Conversation list mapper
========================= */

export function mapConversationListItemDTO(
  dto: ConversationListItemDTO
): ConversationSummary {

  return {
    id: dto.id,
    subject: dto.subject || dto.sender || 'Conversation',
    preview: dto.preview || '',
    unreadCount: dto.unread_count ?? 0,
    lastMessageAt: dto.last_message_at,
    channel: normalizeChannel(dto.channel_type),

    sender: dto.sender ?? '', // ✅ FIX
    channelAccount: dto.channel_account ?? '' // ✅ FIX
  }
}

/* =========================
 Conversation detail mapper
========================= */

export function mapConversationDetailDTO(
  dto: ConversationDetailDTO
): Conversation {

  const messagesDTO = dto.messages ?? []

  const mappedMessages: Message[] =
    mapMessages(
      messagesDTO,
      dto.channel_account ?? '',
      dto.sender ?? ''
    )

  const normalizedMessages =
    mappedMessages.map(normalizeMessageStatus)

  const orderedMessages =
    [...normalizedMessages].sort((a, b) => {
      const aTime = new Date(a.meta.createdAt).getTime()
      const bTime = new Date(b.meta.createdAt).getTime()
      return aTime - bTime
    })

  const messageIndex = new Map<string, number>()

  orderedMessages.forEach((m, i) => {
    const primaryKey = m.clientId ?? m.id

    messageIndex.set(primaryKey, i)
    messageIndex.set(m.id, i)

    if (m.clientId) {
      messageIndex.set(m.clientId, i)
    }
  })

  const lastMessage =
    orderedMessages.length > 0
      ? orderedMessages[orderedMessages.length - 1]
      : undefined

  return {
    id: dto.id,
    subject: dto.subject || dto.sender || '',
    status: ConversationStatus.OPEN,
    channel: normalizeChannel(dto.channel_type),
    unreadCount: dto.unread_count ?? 0,
    createdAt: dto.last_message_at,
    updatedAt: dto.last_message_at,
    participants: [],
    messages: orderedMessages,
    messageIndex,
    lastMessage,

    sender: dto.sender ?? '', // ✅ FIX
    channelAccount: dto.channel_account ?? '' // ✅ FIX
  }
}