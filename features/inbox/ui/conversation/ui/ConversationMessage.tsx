'use client'

import {
  MessagePresentationModel
} from '@/features/inbox/application/conversation/view/models/message.presentation.vm'

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

export function ConversationMessage({ message }: Props) {

  const isInbound = message.direction === 'in'

  const hasContent =
    message.bodyHtml ||
    message.hasAttachments

  const showAvatar =
    isInbound && !message.grouped

  return (

    <MessageContainer
      align={message.align}
      grouped={message.grouped}
    >

      <div className="flex items-end gap-2 md:gap-3 w-full">

        {/* ✅ DESKTOP: ALWAYS RESERVE SPACE */}
        <div className="hidden md:flex w-8 shrink-0">
          {isInbound && showAvatar && (
            <Avatar
              label={message.authorName}
              size="sm"
            />
          )}
        </div>

        {/* MESSAGE */}
        <div className="flex flex-col w-full">

          {/* HEADER (desktop only) */}
          <div className="hidden md:block">
            <MessageHeader
              author={{
                name: message.authorName,
                type: message.isAI ? 'ai' : 'human'
              }}
              variant={message.variant}
              hidden={!message.showAuthor}
            />
          </div>

                      {/* CONTENT */}
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
              </MessageBubble>
            )}

          {/* FOOTER */}
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