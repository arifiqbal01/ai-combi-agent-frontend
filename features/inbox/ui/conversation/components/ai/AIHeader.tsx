'use client'

import { Text, Button, Badge, Icon } from '@/ui'
import { Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

type Props = {
  isRunning: boolean
  statusLabel: string
  progress?: number
  expanded: boolean
  canExpand: boolean
  onToggle: () => void
  confidence?: number
}

export function AIHeader({
  isRunning,
  statusLabel,
  progress,
  expanded,
  canExpand,
  onToggle,
  confidence,
}: Props) {


  // ✅ LOG MUST BE HERE
  console.log('AIHeader DEBUG', {
    isRunning,
    canExpand,
    expanded,
    progress,
  })

  return (
    <div className="flex items-center gap-3 px-4 py-2">

      {/* ICON */}
      <div className="h-6 w-6 rounded-full bg-ai-strip flex items-center justify-center">
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

        <Text size="sm" weight="medium">
          AI
        </Text>

        <Text size="xs" tone="secondary">
          {statusLabel}
        </Text>

        {confidence !== undefined && (
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
                className="h-full bg-ai-accent"
                style={{ width: `${progress ?? 0}%` }}
              />
            </div>
          </>
        )}

        {/* 🔥 FORCE BUTTON VISIBILITY */}
        {canExpand && (
          <div className="flex-shrink-0">
            <Button
              size="sm"
              variant="secondary"
              onClick={onToggle}
              rightIcon={
                expanded
                  ? <ChevronUp size={14} />
                  : <ChevronDown size={14} />
              }
            >
              {expanded ? 'Hide' : 'View'}
            </Button>
          </div>
        )}

      </div>

    </div>
  )
}