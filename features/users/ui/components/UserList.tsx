'use client'

import { Stack } from '@/ui'
import { User } from '../../domain/user.types'
import { UserItem } from './UserItem'

export function UserList({ users }: { users: User[] }) {
  return (
    <Stack gap="sm">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Stack>
  )
}