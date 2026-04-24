'use client'

import {
  PageLayout,
  PageHeader,
  PageSection,
  PageActions,
  EmptyState,
  LoadingState,
  Button,
} from '@/ui'

import { useUsers } from '../../application/queries'
import { AddUserDialog } from '../components/AddUserDialog'
import { UserList } from '../components/UserList'

export function UsersScreen() {
  const { data, isLoading } = useUsers()

  return (
    <PageLayout>
      <PageHeader
        title="Users"
        description="Manage tenant users and roles"
        actions={
          <PageActions>
            <AddUserDialog />
          </PageActions>
        }
      />

      <PageSection>
        {isLoading && <LoadingState />}

        {!isLoading && !data?.items?.length && (
          <EmptyState title="No users yet" />
        )}

        {data?.items && <UserList users={data.items} />}
      </PageSection>
    </PageLayout>
  )
}