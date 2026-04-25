'use client'

import {
  MessagePresentationModel
} from '@/features/inbox/application/conversation/view/models/message.presentation.vm'

import {
  MessageVariant
} from '@/features/inbox/domain/message'

import {
  MessageContainer
} from './message/MessageContainer'

import {
  MessageHeader
} from './message/MessageHeader'

import {
  MessageBubble
} from './message/MessageBubble'

import {
  MessageBody
} from './message/MessageBody'

import {
  MessageAttachments
} from './message/MessageAttachments'

import {
  MessageFooter
} from './message/MessageFooter'

import {
  MessageStatus
} from './message/MessageStatus'

import { Avatar } from '@/ui'

type Props = {
  message: MessagePresentationModel
}

export function ConversationMessage({
  message
}: Props){

  const isInbound = message.direction === 'in'

  const hasContent =
    message.bodyHtml ||
    message.hasAttachments

  const showAvatar =
    isInbound && !message.grouped

  return(

    <MessageContainer
      align={message.align}
      grouped={message.grouped}
    >

      <div className="flex gap-3 items-end">

        {/* AVATAR */}

        {isInbound && (

          showAvatar
            ? (
              <Avatar
                label={message.authorName}
                size="sm"
              />
            )
            : <div className="w-7"/>

        )}

        {/* MESSAGE */}

        <div className="flex flex-col">

          <MessageHeader
            author={{
              name: message.authorName,
              type: message.isAI
                ? 'ai'
                : 'human'
            }}
            variant={message.variant}
            hidden={!message.showAuthor}
          />

          {hasContent && (

            <MessageBubble
              variant={message.variant}
              grouped={message.grouped}
            >

              {message.bodyHtml && (
                <MessageBody html={message.bodyHtml}/>
              )}

              {message.hasAttachments && (
                <MessageAttachments
                  attachments={message.attachments}
                />
              )}

              {message.status && (
                <MessageStatus
                  state={message.status}
                />
              )}

            </MessageBubble>

          )}

          {message.showStatus && (

            <MessageFooter
              time={message.time}
              status={message.status}
              direction={message.direction}
            />

          )}

        </div>

      </div>

    </MessageContainer>
  )
}