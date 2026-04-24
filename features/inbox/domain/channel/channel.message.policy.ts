// feature/inbox/domain/channel/message.channel.rules.ts
import { ChannelType }
from './channel.types'

export type ChannelMessagePolicy={

 capabilities:{
  canReply:boolean
  canAttach:boolean
  canAI:boolean
 }

 limits:{
  maxMessageLength:number
  maxAttachments:number
  maxFileSizeMB:number
 }

}

export const DEFAULT_CHANNEL_POLICY:ChannelMessagePolicy={

 capabilities:{
  canReply:true,
  canAttach:true,
  canAI:true
 },

 limits:{
  maxMessageLength:5000,
  maxAttachments:10,
  maxFileSizeMB:25
 }

}

export const CHANNEL_MESSAGE_POLICY:
Record<ChannelType,ChannelMessagePolicy>={

 [ChannelType.EMAIL]:{

  capabilities:{
   canReply:true,
   canAttach:true,
   canAI:true
  },

  limits:{
   maxMessageLength:10000,
   maxAttachments:20,
   maxFileSizeMB:25
  }

 },

 [ChannelType.WHATSAPP]:{

  capabilities:{
   canReply:true,
   canAttach:true,
   canAI:true
  },

  limits:{
   maxMessageLength:1024,
   maxAttachments:1,
   maxFileSizeMB:16
  }

 },

 [ChannelType.SLACK]:{

  capabilities:{
   canReply:true,
   canAttach:true,
   canAI:true
  },

  limits:{
   maxMessageLength:4000,
   maxAttachments:10,
   maxFileSizeMB:50
  }

 },

 [ChannelType.INSTAGRAM]:{

  capabilities:{
   canReply:true,
   canAttach:false,
   canAI:true
  },

  limits:{
   maxMessageLength:1000,
   maxAttachments:0,
   maxFileSizeMB:0
  }

 }

}

export function getChannelMessagePolicy(

 channel:ChannelType | null | undefined

):ChannelMessagePolicy{

 if(!channel)
  return DEFAULT_CHANNEL_POLICY

 return (

  CHANNEL_MESSAGE_POLICY[channel]

  ?? DEFAULT_CHANNEL_POLICY

 )

}