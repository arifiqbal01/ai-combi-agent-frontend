import { Inline, Badge } from '@/ui'
import HeaderTitle from './HeaderTitle'
import { useSession } from '@/core/session'

export default function HeaderLeft() {
  const { tenantName } = useSession()

  return (
    <Inline gap="md">
      <HeaderTitle />

      {tenantName && (
        <Badge>{tenantName}</Badge>
      )}
    </Inline>
  )
}