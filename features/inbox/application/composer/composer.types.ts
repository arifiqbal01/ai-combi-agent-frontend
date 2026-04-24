// features/inbox/application/composer/composer.types.ts

import { EditorAdapter }
from '@/features/inbox/infrastructure/editor/editor.interface'

import { Attachment }
from '@/features/inbox/domain/attachment/attachment.types'

import { MessagePolicy }
from '@/features/inbox/domain/message/message.policy'

export type ComposerContext={

 conversationId:string

 replyToMessageId?:string

 channelAccountId?:string

 participants?:{

  address:string

  role:string

 }[]

 subject?:string

}

export type ComposerState={

 editor:EditorAdapter | null

 attachments:Attachment[]

 emojiOpen:boolean

 expanded:boolean

 sending:boolean

 policy:MessagePolicy

 context:ComposerContext

}

export type ComposerActions={

 setEditor(
  editor:EditorAdapter
 ):void

 attach(
  attachments:Attachment[]
 ):void

 removeAttachment(
  id:string
 ):void

 insertEmoji(
  emoji:string
 ):void

 toggleEmoji():void

 toggleExpand():void

 clear():void

}