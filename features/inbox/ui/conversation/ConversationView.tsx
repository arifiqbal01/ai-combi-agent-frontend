'use client'

import {
  useConversationController
} from '@/features/inbox/application/conversation/controller'

import {
  useConversationAIController
} from '@/features/inbox/application/ai/controller'

import {
  useMessagePolicy
} from '@/features/inbox/application/message/useMessagePolicy'

import {
  ConversationLayout,
  ConversationHeader,
  ConversationTimeline,
  ConversationComposer,
  ConversationAISection
} from './components'

import { ConversationEmpty } from './ui/ConversationEmpty'
import { ConversationLoading } from './ui/ConversationLoading'

import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'

import { useInboxContext } from '@/features/inbox/ui/context/inbox-context'

import { Icon } from '@/ui'
import { ChevronLeft } from 'lucide-react'

type Props = {
  conversationId: string | null
}

export function ConversationView({ conversationId }: Props) {

  const controller = useConversationController({
    conversationId
  })

  const ai = useConversationAIController({
    state: controller.state
  })

  const policy = useMessagePolicy(conversationId)

  const { clearSelection } = useInboxContext()

  if (!conversationId) return <ConversationEmpty />
  if (controller.loading) return <ConversationLoading />
  if (!controller.conversation) return <ConversationEmpty />

  return (

    <div className="
      relative
      h-full
      min-h-0
    ">

      <ConversationLayout

        header={
          <ConversationHeader
            conversation={controller.conversation}
          />
        }

        timeline={
          <ConversationTimeline
            timeline={controller.timeline}
            onScrollStateChange={controller.setScrolled}
          />
        }

        aiSection={
          <ConversationAISection
            aiState={ai.aiState}
            suggestion={ai.suggestion?.content}
            confidence={ai.suggestion?.confidencePercent}
            ui={ai.ui}

            onInsert={() => {
              if (!ai.suggestion) return
              if (!controller.lastInboundMessageId) return

              controller.replyMessage({
                body: ai.suggestion.content,
                attachments: [],
                replyToMessageId: controller.lastInboundMessageId
              })
            }}
          />
        }

        composer={
          <ConversationComposer
            policy={policy}
            context={{
              conversationId,
              channel: controller.conversation.channel
            }}
            sending={controller.sending}
            onSend={(params) => {
              if (!controller.lastInboundMessageId) return

              controller.replyMessage({
                body: params.body,
                attachments: (params.attachments ?? []) as Attachment[],
                replyToMessageId: controller.lastInboundMessageId
              })
            }}
          />
        }

      />

    </div>
  )
}