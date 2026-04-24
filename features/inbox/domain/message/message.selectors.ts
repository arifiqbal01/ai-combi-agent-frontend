import {
 Message,
 MessageDirection,
 MessageVariant
} from './message.types'

import {

 resolveMessageIdentity

} from './message.identity'

/* =========================
 Direction selectors
========================= */

export function isInbound(

 message:Message

):boolean{

 return (

  message.direction===

  MessageDirection.INBOUND

 )

}

export function isOutbound(

 message:Message

):boolean{

 return (

  message.direction===

  MessageDirection.OUTBOUND

 )

}

/* =========================
 Identity selectors
========================= */

export function isAIMessage(

 message:Message

):boolean{

 return resolveMessageIdentity(message)
  .isAI

}

export function isSystemMessage(

 message:Message

):boolean{

 return resolveMessageIdentity(message)
  .isSystem

}

export function isCustomerMessage(

 message:Message

):boolean{

 return resolveMessageIdentity(message)
  .variant===MessageVariant.CUSTOMER

}

export function isAgentMessage(

 message:Message

):boolean{

 return resolveMessageIdentity(message)
  .variant===MessageVariant.AGENT

}

/* =========================
 Content selectors
========================= */

export function hasAttachments(

 message:Message

):boolean{

 return message.attachments?.length>0

}

export function getMessageBody(

 message:Message

):string{

 return (

  message.bodyHtml ||

  message.bodyText ||

  ''

 )

}