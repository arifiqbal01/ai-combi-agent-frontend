import {

 Conversation,
 ConversationStatus

} from './conversation.types'

export function getLastMessage(

 conversation:Conversation

){

 return conversation.lastMessage

}

export function getUnreadCount(

 conversation:Conversation

):number{

 return conversation.unreadCount

}

export function isClosed(

 conversation:Conversation

):boolean{

 return (

  conversation.status===

  ConversationStatus.CLOSED

 )

}

export function getConversationDisplayName(
  conversation: Conversation
): string {

  if (conversation.subject) {
    return conversation.subject
  }

  const sender =
    conversation.participants?.find(
      p => p.role === 'from'
    )

  if (sender?.address) {
    return sender.address
  }

  if (conversation.participants?.length) {
    return (
      conversation.participants[0]?.address ??
      'Unknown'
    )
  }

  return 'Unknown'
}