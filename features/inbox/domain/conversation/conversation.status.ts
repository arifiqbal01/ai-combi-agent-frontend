import {

 ConversationStatus

} from './conversation.types'

export function isOpen(
 status:ConversationStatus
):boolean{

 return status===
  ConversationStatus.OPEN

}

export function isClosed(
 status:ConversationStatus
):boolean{

 return status===
  ConversationStatus.CLOSED

}

export function canReply(
 status:ConversationStatus
):boolean{

 return status!==
  ConversationStatus.CLOSED

}

export function canReopen(
 status:ConversationStatus
):boolean{

 return status===
  ConversationStatus.CLOSED

}