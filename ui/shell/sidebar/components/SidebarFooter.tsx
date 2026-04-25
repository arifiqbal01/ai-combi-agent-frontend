import { Stack } from '@/ui'
import NavItem from '../NavItem'

type Item = {
  label: string
  href: string
  icon: React.ElementType
}

export default function SidebarFooter({
  items,
}: {
  items: Item[]
}) {
  return (
    <div className="border-t border-white/10 pt-3">
      <Stack gap="xs">
        {items.map((item) => (
          <NavItem
            key={item.href}
            {...item}
          />
        ))}
      </Stack>
    </div>
  )
}