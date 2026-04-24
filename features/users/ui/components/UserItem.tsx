'use client'

import {
  Surface,
  Stack,
  Inline,
  Text,
  Badge,
  Avatar,
} from '@/ui'

import { User } from '../../domain/user.types'
import {
  getUserDisplayName,
  isUserActive,
  isUserInvited,
  isUserDisabled,
} from '../../domain/user.entity'

function getStatusVariant(user: User) {
  if (isUserActive(user)) return 'success'
  if (isUserInvited(user)) return 'warning'
  if (isUserDisabled(user)) return 'danger'
  return 'default'
}

export function UserItem({ user }: { user: User }) {
  return (
    <Surface className="p-4 rounded-lg">
      <Inline gap="md" align="center">
        {/* Avatar */}
        <Avatar label={getUserDisplayName(user)} />

        {/* Content */}
        <Stack className="flex-1">
          <Inline gap="sm" align="center">
            <Text weight="semibold">
              {getUserDisplayName(user)}
            </Text>

            <Badge variant={getStatusVariant(user)}>
              {user.status}
            </Badge>
          </Inline>

          <Text size="sm" tone="muted">
            {user.email}
          </Text>
        </Stack>

        {/* Role */}
        <Badge>{user.role}</Badge>
      </Inline>
    </Surface>
  )
}