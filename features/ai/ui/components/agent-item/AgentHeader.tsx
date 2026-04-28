'use client'

import { Agent } from '../../../domain/ai.types'
import { Stack, Inline, Text, Badge } from '@/ui'

export function AgentHeader({ agent }: { agent: Agent }) {
  return (
    <Stack gap="xs">

      <Inline className="justify-between items-center gap-2">

        <Text weight="semibold" className="truncate">
          {agent.name}
        </Text>

        <Inline gap="xs" className="shrink-0">

          {agent.isDefault && (
            <Badge variant="default">Default</Badge>
          )}

          <Badge
            variant={agent.isActive ? 'success' : 'warning'}
          >
            {agent.isActive ? 'Enabled' : 'Disabled'}
          </Badge>

        </Inline>

      </Inline>

      {agent.description && (
        <Text size="sm" tone="muted" className="truncate">
          {agent.description}
        </Text>
      )}

    </Stack>
  )
}