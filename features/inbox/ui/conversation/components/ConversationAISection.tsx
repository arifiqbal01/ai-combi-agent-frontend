'use client'

import { AIInlineBar } from '@/features/ai/ui/components/ai-inline/AIInlineBar'

type Props = {
  conversationId?: string | null
  onInsert?: (content: string) => void
  onView?: (runId: string) => void
}

export function ConversationAISection({
  conversationId,
  onInsert,
  onView,
}: Props) {
  return (
    <AIInlineBar
      conversationId={conversationId}
      onInsert={onInsert}
      onView={onView}
    />
  )
}