import { Conversation } from '@/features/inbox/domain/conversation/conversation.types'

import {
  Message,
  MessageSyncState
} from '@/features/inbox/domain/message/message.types'

import { applyDeliveryUpdate } from '@/features/inbox/domain/message/message.reconciliation.engine'

import { ConversationAction } from '../types/conversation.actions'

export function messageReducer(
  conversation: Conversation | null,
  action: ConversationAction
): Conversation | null {

  if (!conversation) return conversation

  switch (action.type) {

    /* =========================
       ADD MESSAGE
    ========================= */

    case 'MESSAGE_ADD': {
      const incoming: Message = action.payload

      const messages = [
        ...(conversation.messages ?? []),
        incoming
      ]

      const index = new Map(conversation.messageIndex ?? [])
      const newIndex = messages.length - 1

      index.set(incoming.id, newIndex)

      if (incoming.clientId) {
        index.set(incoming.clientId, newIndex)
      }

      return {
        ...conversation,
        messages,
        messageIndex: index,
        lastMessage: incoming
      }
    }

    /* =========================
       RECONCILE MESSAGE
    ========================= */

    case 'MESSAGE_RECONCILE': {
      const incoming: Message = action.payload

      const index = new Map(conversation.messageIndex ?? [])

      const existingIndex =
        incoming.clientId
          ? index.get(incoming.clientId)
          : index.get(incoming.id)

      const messages = [...(conversation.messages ?? [])]

      if (existingIndex === undefined) {

        const newIndex = messages.length

        messages.push(incoming)

        index.set(incoming.id, newIndex)

        if (incoming.clientId) {
          index.set(incoming.clientId, newIndex)
        }

        return {
          ...conversation,
          messages,
          messageIndex: index,
          lastMessage: incoming
        }
      }

      messages[existingIndex] = incoming

      index.set(incoming.id, existingIndex)

      if (incoming.clientId) {
        index.set(incoming.clientId, existingIndex)
      }

      return {
        ...conversation,
        messages,
        messageIndex: index,
        lastMessage: incoming
      }
    }

    /* =========================
       DELIVERY UPDATE
    ========================= */

    case 'DELIVERY_UPDATE': {
      const payload = action.payload as {
        messageId?: string
        clientId?: string
        status: MessageSyncState
      }

      const { messageId, clientId, status } = payload

      if (!messageId && !clientId) {
        return conversation // nothing to update
      }

      return {
        ...conversation,
        messages: applyDeliveryUpdate(
          conversation.messages ?? [],
          messageId,
          clientId,
          status
        )
      }
    }

    default:
      return conversation
  }
}