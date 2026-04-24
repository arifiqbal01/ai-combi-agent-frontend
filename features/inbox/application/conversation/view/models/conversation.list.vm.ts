import {

 ConversationSummary

} from '@/features/inbox/domain/conversation/conversation.types'

export type ConversationListItemVM={

 id:string

 name:string

 subject:string

 preview:string

 unreadCount:number

 lastMessageAt:string

 channel:string

 email:string

}

function formatTime(
 iso:string
){

 const date=new Date(iso)

 const now=new Date()

 const yesterday=new Date()

 yesterday.setDate(
  now.getDate()-1
 )

 if(
  date.toDateString()===
  now.toDateString()
 ){

  return date.toLocaleTimeString(
   [],
   {
    hour:'2-digit',
    minute:'2-digit'
   }
  )

 }

 if(
  date.toDateString()===
  yesterday.toDateString()
 ){

  return 'Yesterday'

 }

 return date.toLocaleDateString(
  [],
  {
   month:'short',
   day:'numeric'
  }
 )

}

export function mapConversationToListVM(
  conversation: ConversationSummary
): ConversationListItemVM {

  return {
    id: conversation.id,
    name: conversation.sender,
    subject: conversation.subject || '',
    preview: conversation.preview || '',
    unreadCount: conversation.unreadCount,
    lastMessageAt: formatTime(conversation.lastMessageAt),
    channel: conversation.channel,
    email: conversation.sender,

    /* TEMP FALLBACK */
    status: (conversation as any).status ?? 'open',
    hasAISuggestion: (conversation as any)?.ai?.hasSuggestion ?? false,
    isAIRunning: (conversation as any)?.ai?.isRunning ?? false
  }
}