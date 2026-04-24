import { Message }
from '../message/message.types'

import { Participant }
from '../participant/participant.types'

import {
 ChannelType
} from '../channel/channel.types'

export const ConversationStatus = {

 OPEN:'open',

 CLOSED:'closed',

 PENDING:'pending'

} as const

export type ConversationStatus =
 typeof ConversationStatus[
  keyof typeof ConversationStatus
 ]

export type Conversation={

 id:string

 subject?:string

 status:ConversationStatus

 channel:ChannelType

 unreadCount:number

 createdAt:string

 updatedAt:string

 participants:Participant[]

 messages?:Message[]
 messageIndex?:Map<string,number>
 lastMessage?:Message

 sender:string

 channelAccount:string

}

export type ConversationSummary={

 id:string

 subject:string

 preview?:string

 unreadCount:number

 lastMessageAt:string

 channel:ChannelType

 sender:string

 channelAccount:string

}