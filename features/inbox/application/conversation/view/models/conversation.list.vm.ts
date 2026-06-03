// features/inbox/application/conversation/view/models/conversation.list.vm.ts
import {
  ConversationSummary
} from '@/features/inbox/domain/conversation/conversation.types'

import {
  ChannelType
} from '@/features/inbox/domain/channel/channel.types'

import {
  Participant
} from '@/features/inbox/domain/participant/participant.types'

import {
  getParticipantLabel
} from '@/features/inbox/domain/participant/participant.selectors'

export type ConversationListItemVM = {
  id: string

  participant?: Participant

  name: string

  subject: string
  preview: string

  unreadCount: number
  lastMessageAt: string

  channel: ChannelType
  channelAccount?: string

  email?: string
  avatarUrl?: string

  /* optional UI fields */
  status?: 'open' | 'closed' | 'pending'
  hasAISuggestion?: boolean
  isAIRunning?: boolean
}

function formatTime(
  iso: string
): string {

  const date = new Date(iso)
  const now = new Date()

  const yesterday = new Date()

  yesterday.setDate(
    now.getDate() - 1
  )

  if (
    date.toDateString() ===
    now.toDateString()
  ) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return 'Yesterday'
  }

  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric'
  })
}

export function mapConversationToListVM(
  conversation: ConversationSummary
): ConversationListItemVM {

  return {
    id: conversation.id,

    participant:
      conversation.participant,

    name: getParticipantLabel(
      conversation.participant
    ),

    subject:
      conversation.subject || '',

    preview:
      conversation.preview || '',

    unreadCount:
      conversation.unreadCount,

    lastMessageAt:
      formatTime(
        conversation.lastMessageAt
      ),

    channel:
      conversation.channel,

    channelAccount: conversation.channelAccount,

    email:
      conversation.participant?.email ??
      undefined,

    avatarUrl:
      conversation.participant?.avatarUrl ??
      undefined,
  }
}