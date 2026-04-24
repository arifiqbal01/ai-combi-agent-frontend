// features/inbox/application/conversation/types/conversation.actions.ts

import { Attachment }
from '@/features/inbox/domain/attachment/attachment.types'

export type SendMessageParams={

 conversationId:string

 body:string

 subject?:string

 clientId?:string

 channelAccountId?:string

 participants?:{

  address:string

  role:string

 }[]

 attachments?:Attachment[]

}

export type ReplyMessageParams={

 conversationId:string

 replyToMessageId:string

 body:string

 attachments?:Attachment[]

 clientId?:string

}

export type RetryMessageParams={

 tempId:string

 params:
  | SendMessageParams
  | ReplyMessageParams

}