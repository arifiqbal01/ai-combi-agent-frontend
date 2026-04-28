'use client'

import { useState, useEffect } from 'react'
import { AIHeader } from './AIHeader'
import { AIExpanded } from './AIExpanded'

type Props = {
  conversationId: string | null

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
  conversationId,
  aiState = 'IDLE',
  suggestion,
  confidence,
  ui,
  onInsert,
  onRegenerate,
}: Props) {

  const storageKey = `ai:expanded:${conversationId}`

  const [expanded, setExpanded] = useState(false)

  /* =========================
     LOAD FROM STORAGE
  ========================= */

  useEffect(() => {
    if (!conversationId) return

    try {
      const saved = localStorage.getItem(storageKey)

      if (saved !== null) {
        setExpanded(saved === 'true')
      } else if (suggestion) {
        // first time only
        setExpanded(true)
      }
    } catch {
      // fail silently (SSR / privacy mode)
    }
  }, [conversationId])

  /* =========================
     SAVE TO STORAGE
  ========================= */

  useEffect(() => {
    if (!conversationId) return

    try {
      localStorage.setItem(storageKey, String(expanded))
    } catch {
      // ignore write failures
    }
  }, [expanded, conversationId])

  /* =========================
     STATE FLAGS
  ========================= */

  const isRunning = aiState === 'RUNNING'
  const isSuggestion = aiState === 'SUGGESTION' && !!suggestion
  const isAutoReply = aiState === 'AUTO_REPLY' && !!suggestion
  const isIdle = aiState === 'IDLE'
  const isError = aiState === 'ERROR'

  const hasSuggestion = !!suggestion
  const canExpand = hasSuggestion

  /* =========================
     VISIBILITY LOGIC
  ========================= */

  const shouldShow =
    isRunning ||
    isSuggestion ||
    isAutoReply ||
    isError ||
    hasSuggestion ||
    isIdle

  if (!shouldShow) return null

  /* =========================
     STATUS LABEL
  ========================= */

  const statusLabel = (() => {
    if (isRunning) return ui?.stageLabel || 'Processing…'
    if (isSuggestion) return 'Suggested reply ready'
    if (isAutoReply) return 'Reply sent automatically'
    if (isError) return 'AI unavailable'
    if (isIdle && hasSuggestion) return 'Last suggestion available'
    return 'Ready'
  })()

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="
      w-full
      px-2 py-1.5
      sm:px-6 sm:py-3
      flex-shrink-0
    ">

      <div className="
        w-full
        sm:max-w-[920px] sm:mx-auto

        rounded-lg sm:rounded-xl
        border border-ai-border/50 sm:border-ai-border/60
        bg-ai-surface/90 sm:bg-ai-surface/80

        shadow-none sm:shadow-sm

        overflow-hidden
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
            suggestion={suggestion}
            onInsert={onInsert}
            onRegenerate={onRegenerate}
          />
        )}

      </div>

    </div>
  )
}