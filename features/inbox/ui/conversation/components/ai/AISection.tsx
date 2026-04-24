'use client'

import { useState, useEffect, useRef } from 'react'
import { AIHeader } from './AIHeader'
import { AIExpanded } from './AIExpanded'

type Props = {
  aiState?: 'RUNNING' | 'AUTO_REPLY' | 'SUGGESTION' | 'IDLE' | 'ERROR'
  suggestion?: string
  confidence?: number
  ui?: {
    progress: number
    stageLabel: string
  }
  onInsert?: () => void
  onRegenerate?: () => void
}

export function AISection({
  aiState = 'IDLE',
  suggestion,
  confidence,
  ui,
  onInsert,
  onRegenerate,
}: Props) {
  const [expanded, setExpanded] = useState(false)

  const isRunning = aiState === 'RUNNING'
  const isSuggestion =
    aiState === 'SUGGESTION' && !!suggestion
  const isAutoReply =
    aiState === 'AUTO_REPLY' && !!suggestion
  const isIdle = aiState === 'IDLE'
  const isError = aiState === 'ERROR'

  /* ✅ FIXED */
  const hasSuggestion = !!suggestion
  const canExpand = hasSuggestion

  const lastSuggestionRef = useRef<string | null>(null)

  /* ✅ FIXED */
  useEffect(() => {
    if (!suggestion) return

    if (lastSuggestionRef.current !== suggestion) {
      setExpanded(true)
      lastSuggestionRef.current = suggestion
    }
  }, [suggestion])

  const statusLabel = (() => {
    if (isRunning) return ui?.stageLabel || 'Processing…'
    if (isSuggestion) return 'Suggested reply ready'
    if (isAutoReply) return 'Reply sent automatically'
    if (isError) return 'AI unavailable'
    if (isIdle && hasSuggestion) return 'Last suggestion available'
    return 'Ready'
  })()

console.log('AISection DEBUG', {
  aiState,
  suggestion,
  hasSuggestion: !!suggestion,
  isSuggestion,
  canExpand: !!suggestion,
  expanded,
})

  return (
    <div className="w-full px-6 py-3">

      <div className="
        max-w-[920px]
        mx-auto
        rounded-xl
        border border-ai-border/60
        bg-ai-surface/80
        shadow-sm
      ">

        <AIHeader
          isRunning={isRunning}
          statusLabel={statusLabel}
          progress={ui?.progress}
          expanded={expanded}
          canExpand={canExpand}
          onToggle={() => setExpanded(prev => !prev)}
          confidence={isSuggestion ? confidence : undefined}
        />

        {hasSuggestion && expanded && (
          <AIExpanded
            suggestion={suggestion!}
            onInsert={onInsert}
            onRegenerate={onRegenerate}
          />
        )}

      </div>

    </div>
  )
}