'use client'

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

type Props={
 message:any
}

export function ConversationMessage({
 message
}:Props){

 const hasContent =
  message.bodyHtml ||
  message.attachments?.length

 const showAvatar =
  message.direction==='in' &&
  !message.grouped

 return(

  <MessageContainer

   align={message.align}

   grouped={message.grouped}

  >

   <div className="flex gap-3 items-end">

    {/* AVATAR COLUMN */}

    {message.direction==='in' && (

     showAvatar
      ? (
        <Avatar
         label={message.authorName}
         size="sm"
        />
       )
      : (
        <div className="w-7"/>
       )

    )}

    {/* MESSAGE COLUMN */}

    <div className="flex flex-col">

     <MessageHeader

      author={{
       name:message.authorName
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

        <MessageBody
         html={message.bodyHtml}
        />

       )}

       {message.attachments?.length>0 && (

        <MessageAttachments
         attachments={message.attachments}
        />

       )}

       {message.state && (

        <MessageStatus
         state={message.state}
        />

       )}

      </MessageBubble>

     )}

     {message.showStatus && (

      <MessageFooter

       time={message.time}

       status={message.status}

       direction={
        message.direction
       }

      />

     )}

    </div>

   </div>

  </MessageContainer>

 )
}