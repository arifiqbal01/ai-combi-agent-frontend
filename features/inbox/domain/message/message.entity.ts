import { Message, MessageDirection, MessageKind }
from './message.types'

export function isInbound(
 message:Message
){

 return message.direction===MessageDirection.INBOUND

}

export function isOutbound(
 message:Message
){

 return message.direction===MessageDirection.OUTBOUND

}

export function isAIMessage(
 message:Message
){

 return message.kind===MessageKind.AI

}

export function isSystemMessage(
 message:Message
){

 return message.kind===MessageKind.SYSTEM

}

export function hasAttachments(
 message:Message
){

 return message.attachments.length>0

}

export function getMessageBody(
 message:Message
){

 return message.bodyHtml ||

        message.bodyText ||

        ''

}