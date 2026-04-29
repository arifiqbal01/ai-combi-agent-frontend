'use client'

import { Stack, Inline, Button } from '@/ui'

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

        {/* 🔥 HTML CONTENT (TYPOGRAPHY ENABLED) */}
        <div
          className="
            max-h-[30vh]
            overflow-y-auto
            pr-1

            prose prose-sm max-w-none
            prose-p:my-2
            prose-ul:my-2
            prose-li:my-1
          "
          dangerouslySetInnerHTML={{ __html: suggestion }}
        />

        <Inline gap="xs">
          <Button size="sm" onClick={onInsert}>
            Insert
          </Button>
        </Inline>

      </Stack>

    </div>
  )
}