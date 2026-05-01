'use client'

import { Stack, Inline, Button } from '@/ui'

type Props = {
  suggestion: string
  onInsert?: () => void
}

export function AIInlineExpanded({
  suggestion,
  onInsert,
}: Props) {
  return (
    <div className="px-4 py-3 border-t border-ai-border">

      <Stack gap="sm">

        <div
          className="
            max-h-[30vh]
            overflow-y-auto
            pr-1

            prose prose-sm max-w-none
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