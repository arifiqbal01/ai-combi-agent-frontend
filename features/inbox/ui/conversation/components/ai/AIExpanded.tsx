'use client'

import { Stack, Inline, Text, Button } from '@/ui'

type Props = {
  suggestion: string
  onInsert?: () => void
  onRegenerate?: () => void
}

export function AIExpanded({
  suggestion,
  onInsert,
  onRegenerate,
}: Props) {
  return (
    <div className="px-4 py-3 border-t border-ai-border">

      <Stack gap="sm">

        <Text size="sm" className="leading-6">
          {suggestion}
        </Text>

        <Inline gap="xs">
          <Button size="sm" onClick={onInsert}>
            Insert
          </Button>

          <Button size="sm" variant="ghost" onClick={onRegenerate}>
            Improve
          </Button>
        </Inline>

      </Stack>

    </div>
  )
}