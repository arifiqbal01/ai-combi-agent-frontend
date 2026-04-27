import { Inline, Icon } from '@/ui'
import { Bell } from 'lucide-react'
import HeaderActions from './HeaderActions'
import UserMenu from './UserMenu'

export default function HeaderRight() {
  return (
    <Inline gap="sm">
      <HeaderActions />

      <UserMenu />
    </Inline>
  )
}