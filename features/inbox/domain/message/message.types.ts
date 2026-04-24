// features/inbox/domain/message/message.types.ts
import { Attachment }
from '../attachment/attachment.types'

import { Participant }
from '../participant/participant.types'

import { MessageAuthor }
from './message.author'


export const MessageDirection = {

 INBOUND:'inbound',

 OUTBOUND:'outbound'

} as const

export type MessageDirection =
 typeof MessageDirection[keyof typeof MessageDirection]

export const MessageKind = {

 HUMAN:'human',

 AI:'ai',

 SYSTEM:'system',

 AUTO:'auto'

} as const

export type MessageKind =
 typeof MessageKind[keyof typeof MessageKind]


export type MessageFlags={

 aiGenerated?:boolean

 autoSent?:boolean

 failed?:boolean

 edited?:boolean

}

export type MessageMeta={

 createdAt:string

 displayTime:string

 status:string

}

export type Message={

 id:string

 clientId?:string

 direction:MessageDirection

 kind:MessageKind

 subject?:string

 bodyHtml:string
 bodyText?:string

 author:MessageAuthor

 attachments:Attachment[]

 participants:Participant[]

 flags?:MessageFlags

 meta:MessageMeta

}

export type SyncableMessage = Message & {

 syncState?:MessageSyncState

 tempId?:string
 clientId?:string

}


export const MessageVariant = {

 CUSTOMER:'customer',

 AGENT:'agent',

 AI:'ai',

 SYSTEM:'system',

 INTERNAL:'internal'

} as const

export type MessageVariant =
 typeof MessageVariant[keyof typeof MessageVariant]


 export const MessageSyncState = {

 PENDING:'pending',

 SENDING:'sending',

 SENT:'sent',

 DELIVERED:'delivered',

 READ:'read',

 FAILED:'failed'

} as const

export type MessageSyncState =
 typeof MessageSyncState[keyof typeof MessageSyncState]


export const MessageAuthorType = {

 HUMAN:'human',

 AI:'ai',

 SYSTEM:'system'

} as const

export type MessageAuthorType =
 typeof MessageAuthorType[
  keyof typeof MessageAuthorType
 ]

export type MessageIdentity={

 actorType:MessageAuthorType

 variant:MessageVariant

 direction:MessageDirection

 isAI:boolean

 isHuman:boolean

 isSystem:boolean

 isOutbound:boolean

 isInbound:boolean

 isAutomated:boolean

 displayName:string

}

export const DeliveryStatus = {

 PENDING:'pending',

 SENT:'sent',

 DELIVERED:'delivered',

 READ:'read',

 FAILED:'failed'

} as const

export type DeliveryStatus =
 typeof DeliveryStatus[
  keyof typeof DeliveryStatus
 ]