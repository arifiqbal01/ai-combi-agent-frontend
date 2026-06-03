import { Menu, Building2 } from 'lucide-react'
import { Badge } from '@/ui'
import { Brand } from '@/ui/components/brand'
import { useSession } from '@/core/session'

import MobileDrawer from '../sidebar/MobileDrawer'
import { useMobileDrawer } from '../sidebar/useMobileDrawer'

export default function HeaderLeft() {
  const { tenantName } = useSession()

  const {
    isOpen,
    openDrawer,
    closeDrawer,
  } = useMobileDrawer()

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={openDrawer}
          className="md:hidden p-2 rounded-md hover:bg-bg-muted"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <Brand variant="header" />

        {tenantName && (
          <Badge className="h-7 px-2 text-xs flex items-center gap-1">
            <Building2 size={12} />
            {tenantName}
          </Badge>
        )}
      </div>

      <MobileDrawer
        open={isOpen}
        onClose={closeDrawer}
      />
    </>
  )
}