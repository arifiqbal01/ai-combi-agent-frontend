import { useEffect, useMemo, useState } from 'react'

import {
  resolveAISuggestionIdentity
} from '@/features/inbox/domain/ai/ai.identity'

import {
  shouldDisplaySuggestion
} from '@/features/inbox/domain/ai/ai.rules'

import {
  getAIStageLabel,
  getNextLocalProgress,
  resolveAIProgress
} from '@/features/inbox/domain/ai/ai.progress'

import { AIRunState } from '@/features/inbox/domain/ai/ai.types'

type Props = {
  state: any
}

/* =========================
   🔥 STRICT AI STATE TYPE
========================= */

type AIState =
  | 'RUNNING'
  | 'AUTO_REPLY'
  | 'SUGGESTION'
  | 'IDLE'
  | 'ERROR'

export function useConversationAIController({
  state
}: Props) {

  /* =========================
     SOURCE STATE
  ========================= */

  const suggestion =
    state?.aiSuggestion ?? null

  const run =
    state?.aiRun ?? null

  /* =========================
     IDENTITY
  ========================= */

  const identity =
    useMemo(() => {

      if (!suggestion)
        return null

      return resolveAISuggestionIdentity(
        suggestion
      )

    }, [suggestion])

  /* =========================
     AI STATE (🔥 FIXED)
  ========================= */

  const aiState: AIState =
    useMemo((): AIState => {

      // running always wins
      if (run?.active)
        return 'RUNNING'

      // backend failure → surface error
      if (run?.state === AIRunState.FAILED)
        return 'ERROR'

      if (identity?.isAutoReply)
        return 'AUTO_REPLY'

      if (shouldDisplaySuggestion(suggestion))
        return 'SUGGESTION'

      return 'IDLE'

    }, [run, identity, suggestion])

  /* =========================
     LOCAL PROGRESS ENGINE
  ========================= */

  const [localProgress, setLocalProgress] = useState(5)

  useEffect(() => {

    if (aiState !== 'RUNNING')
      return

    const interval = setInterval(() => {
      setLocalProgress(prev =>
        getNextLocalProgress(prev)
      )
    }, 400)

    return () => clearInterval(interval)

  }, [aiState])

  /* =========================
     OPTIONAL DELAY (UX)
  ========================= */

  const [showProgress, setShowProgress] = useState(false)

  useEffect(() => {

    if (aiState === 'RUNNING') {

      const t = setTimeout(
        () => setShowProgress(true),
        800
      )

      return () => clearTimeout(t)
    }

    setShowProgress(false)

  }, [aiState])

  /* =========================
     DERIVED UI MODEL
  ========================= */

  const progressValue =
    useMemo(() => {

      return resolveAIProgress({
        backendProgress: run?.progress,
        localProgress
      })

    }, [run?.progress, localProgress])

  const stageLabel =
    useMemo(() => {

      return getAIStageLabel(
        run?.stage
      )

    }, [run?.stage])

  /* =========================
     FINAL RETURN
  ========================= */

  return {

    aiState, // ✅ now strictly typed

    suggestion,

    identity,

    run,

    confidence:
      suggestion?.confidence ?? null,

    shouldShow:
      aiState !== 'IDLE',

    ui: {
      progress: progressValue,
      stageLabel,
      showProgress
    }

  }
}