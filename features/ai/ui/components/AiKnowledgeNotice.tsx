'use client'

import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Inline,
  Stack,
} from '@/ui'

import { useRouter } from 'next/navigation'
import { useHasKnowledge } from '@/features/knowledge/application/queries/useHasKnowledge'

export function AiKnowledgeNotice() {
  const router = useRouter()
  const { data: hasKnowledge, isLoading } = useHasKnowledge()

  if (isLoading || hasKnowledge) return null

  return (
    <Alert variant="warning">

      <Inline className="justify-between gap-4">

        {/* TEXT */}
        <Stack gap="xs">
          <AlertTitle>
            Knowledge required
          </AlertTitle>

          <AlertDescription>
            AI agents need knowledge to generate useful responses.
          </AlertDescription>
        </Stack>

        {/* ACTION */}
        <Button
          size="sm"
          className="shrink-0"
          onClick={() => router.push('/knowledge')}
        >
          Add Knowledge
        </Button>

      </Inline>

    </Alert>
  )
}