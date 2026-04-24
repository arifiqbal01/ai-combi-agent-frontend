import { Stack } from '@/ui'
import NavItem from '../NavItem'

type Item = {
  label: string
  href: string
  icon: React.ElementType
}

export default function SidebarFooter({
  items,
  collapsed,
}: {
  items: Item[]
  collapsed?: boolean
}) {
  return (
    <div className="border-t border-white/10 pt-3">
      <Stack gap="xs">
        {items.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={collapsed}
          />
        ))}
      </Stack>
    </div>
  )
}