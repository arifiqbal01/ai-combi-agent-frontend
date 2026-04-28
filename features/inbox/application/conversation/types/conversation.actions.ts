// features/inbox/application/conversation/types/conversation.actions.ts

import { Conversation } from '@/features/inbox/domain/conversation/conversation.types'

import {
  Message,
  MessageSyncState
} from '@/features/inbox/domain/message/message.types'

import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'

import {
  AISuggestion,
  AIRun
} from '@/features/inbox/domain/ai/ai.types'

/* =========================
   Participant
========================= */

export type MessageParticipant = {
  address: string
  role: 'to' | 'from' | 'cc' | 'bcc'
}

/* =========================
   Send message
========================= */

export type SendMessageParams = {
  conversationId: string
  body: string
  subject?: string
  clientId?: string
  channelAccountId?: string
  participants?: MessageParticipant[]
  attachments?: Attachment[]
}

/* =========================
   Reply message
========================= */

export type ReplyMessageParams = {
  conversationId: string
  replyToMessageId: string
  body: string
  attachments?: Attachment[]
  clientId?: string
}

/* =========================
   Retry message
========================= */

export type RetryMessageParams = {
  tempId: string
  params: SendMessageParams | ReplyMessageParams
}

/* =========================
   ACTION UNION (STRICT)
========================= */

export type ConversationAction =
  | { type: 'SEND_MESSAGE'; payload: SendMessageParams }
  | { type: 'REPLY_MESSAGE'; payload: ReplyMessageParams }
  | { type: 'RETRY_MESSAGE'; payload: RetryMessageParams }

  | { type: 'SET_CONVERSATION'; payload: Conversation }

  | { type: 'MESSAGE_ADD'; payload: Message }
  | { type: 'MESSAGE_RECONCILE'; payload: Message }

  | {
      type: 'DELIVERY_UPDATE'
      payload: {
        messageId: string
        clientId?: string
        status: MessageSyncState
      }
    }

  | {
      type: 'CONVERSATION_UPDATE'
      payload: Partial<Conversation>
    }

  | { type: 'UNREAD_UPDATE'; payload: number }
  | { type: 'MARK_READ_LOCAL'; payload: string }

  /* =========================
     AI ACTIONS
  ========================= */

  | { type: 'AI_SUGGESTION'; payload: AISuggestion }
  | { type: 'AI_SUGGESTION_ERROR'; payload: Error }
  | { type: 'AI_RUN_UPDATE'; payload: AIRun }

/* =========================
   DISPATCH TYPE
========================= */

export type ConversationDispatch =
  React.Dispatch<ConversationAction>