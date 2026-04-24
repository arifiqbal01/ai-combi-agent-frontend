'use client'

import {

 useConversationController

} from '@/features/inbox/application/conversation/controller'

import {

 useConversationAIController

} from '@/features/inbox/application/ai/controller'

import {

 ConversationLayout,
 ConversationHeader,
 ConversationTimeline,
 ConversationComposer,
 ConversationAISection

} from './components'

import {

 ConversationEmpty

} from './ui/ConversationEmpty'

import {

 ConversationLoading

} from './ui/ConversationLoading'

type Props={

 conversationId:string | null

}

export function ConversationView({

 conversationId

}:Props){

 const controller=

 useConversationController({

  conversationId

 })

 const ai =
 useConversationAIController({

  state:controller.state   // ← FIXED

 })

 if(!conversationId)
  return <ConversationEmpty/>

 if(controller.loading)
  return <ConversationLoading/>

 if(!controller.conversation)
  return <ConversationEmpty/>

 return(

  <ConversationLayout

   header={

    <ConversationHeader

     conversation={
      controller.conversation
     }

    />

   }

   timeline={

    <ConversationTimeline

     timeline={
      controller.timeline
     }

     onScrollStateChange={
      controller.setScrolled
     }

    />

   }

   aiSection={
    <ConversationAISection
      aiState={ai.aiState}
      suggestion={ai.suggestion?.content}
      confidence={ai.suggestion?.confidencePercent}

      /* ✅ use controller UI model */
      ui={ai.ui}

      onInsert={() => {
        if (!ai.suggestion) return

        controller.replyMessage({
          body: ai.suggestion.content,
          attachments: [],
          replyToMessageId:
            controller.lastInboundMessageId
        })
      }}
    />
   }

   composer={

    <ConversationComposer

     onSend={(params)=>{

      controller.replyMessage({

       body:params.body,

       attachments:
        params.attachments,

       replyToMessageId:
        controller.lastInboundMessageId

      })

     }}

     sending={
      controller.replying
     }

    />

   }

  />

 )
}