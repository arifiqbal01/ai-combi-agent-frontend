'use client'

import { useState } from 'react'
import { useSmartAgentRun } from '@/features/ai/application/useSmartAgentRun'

import { AIInlineHeader } from './AIInlineHeader'
import { AIInlineExpanded } from './AIInlineExpanded'

type Props = {
  conversationId?: string | null
  onInsert?: (content: string) => void
  onView?: (runId: string) => void
}

export function AIInlineBar({
  conversationId,
  onInsert,
  onView,
}: Props) {
  const {
    run,
    suggestion,
    isRunning,
    canShowSuggestion,
    showAutoReplyMessage,
  } = useSmartAgentRun(conversationId ?? undefined)

  const [expanded, setExpanded] = useState(false)

  // No active run → nothing to show
  if (!run) return null

  const hasSuggestion = !!suggestion?.content

  /* -----------------------------
     LABEL
  ----------------------------- */
  const statusLabel = (() => {
    if (isRunning) return run.stage || 'Processing…'
    if (showAutoReplyMessage) return 'Reply sent automatically'
    if (canShowSuggestion) return 'Suggestion ready'
    return 'AI ready'
  })()

  /* -----------------------------
     ACTION LOGIC
  ----------------------------- */
  const handlePrimaryAction = () => {
    if (canShowSuggestion) {
      setExpanded((prev) => !prev)
    } else if (run?.runId) {
      onView?.(run.runId)
    }
  }

  return (
      <div className="w-full px-2 sm:px-4 py-2 border-t border-ai-border">

        {/* 🔥 width controller */}
        <div className="max-w-[860px] mx-auto w-full">

          <div className="
            rounded-lg
            border border-ai-border/60
            bg-ai-surface/80
            overflow-hidden
          ">

            <AIInlineHeader
              isRunning={isRunning}
              statusLabel={statusLabel}
              progress={run.progress}
              confidence={
                canShowSuggestion
                  ? Math.round((suggestion?.confidence ?? 0) * 100)
                  : undefined
              }
              hasSuggestion={hasSuggestion}
              expanded={expanded}
              isAutoReply={showAutoReplyMessage}
              onAction={handlePrimaryAction}
            />

            {expanded && canShowSuggestion && (
              <AIInlineExpanded
                suggestion={suggestion!.content}
                onInsert={() => {
                  onInsert?.(suggestion!.content)
                  setExpanded(false)
                }}
              />
            )}

          </div>

        </div>
      </div>
    )
}