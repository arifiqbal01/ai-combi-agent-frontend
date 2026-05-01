'use client'

import { Text, Button, Badge, Icon } from '@/ui'
import { Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'

type Props = {
  isRunning: boolean
  statusLabel: string
  progress?: number
  confidence?: number

  hasSuggestion: boolean
  expanded: boolean
  isAutoReply: boolean

  onAction: () => void
}

export function AIInlineHeader({
  isRunning,
  statusLabel,
  progress,
  confidence,
  hasSuggestion,
  expanded,
  isAutoReply,
  onAction,
}: Props) {

  /* -----------------------------
     STATE COLORS
  ----------------------------- */
  const variant = (() => {
    if (isRunning) return 'running'
    if (isAutoReply) return 'auto'
    if (hasSuggestion) return 'suggestion'
    return 'default'
  })()

  const styles = {
    container: clsx(
      'flex items-center gap-3 px-4 py-2',
      variant === 'auto' && 'bg-green-50 border-green-200',
      variant === 'suggestion' && 'bg-blue-50 border-blue-200',
      variant === 'running' && 'bg-purple-50 border-purple-200'
    ),

    iconBg: clsx(
      'h-6 w-6 rounded-full flex items-center justify-center',
      variant === 'auto' && 'bg-green-100 text-green-600',
      variant === 'suggestion' && 'bg-blue-100 text-blue-600',
      variant === 'running' && 'bg-purple-100 text-purple-600',
      variant === 'default' && 'bg-ai-strip'
    ),

    progressBar: clsx(
      'h-full',
      variant === 'running' && 'bg-purple-500',
      variant === 'suggestion' && 'bg-blue-500',
      variant === 'auto' && 'bg-green-500',
      variant === 'default' && 'bg-ai-accent'
    ),
  }

  return (
    <div className={styles.container}>

      {/* ICON */}
      <div className={styles.iconBg}>
        <Icon size="xs">
          {isRunning ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles />
          )}
        </Icon>
      </div>

      {/* TEXT */}
      <div className="flex items-center gap-2">
        <Text size="sm" weight="medium">AI</Text>

        <Text size="xs" tone="secondary">
          {statusLabel}
        </Text>

        {confidence !== undefined && hasSuggestion && (
          <Badge>{confidence}%</Badge>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-2">

        {/* PROGRESS */}
        {isRunning && (
          <>
            <Text size="xs" tone="muted">
              {progress?.toFixed(0)}%
            </Text>

            <div className="w-20 h-1.5 bg-black/10 rounded-full overflow-hidden">
              <div
                className={styles.progressBar}
                style={{ width: `${progress ?? 0}%` }}
              />
            </div>
          </>
        )}

        {/* ACTION BUTTON */}
        {!isAutoReply && !isRunning && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onAction}
            rightIcon={
              hasSuggestion
                ? expanded
                  ? <ChevronUp size={14} />
                  : <ChevronDown size={14} />
                : undefined
            }
          >
            {hasSuggestion
              ? expanded
                ? 'Hide'
                : 'View'
              : 'Open'}
          </Button>
        )}

      </div>

    </div>
  )
}