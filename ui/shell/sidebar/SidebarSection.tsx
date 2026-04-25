import { Stack } from '@/ui'
import NavItem from './NavItem'

type Item = {
  label: string
  href: string
  icon: React.ElementType
}

export default function SidebarSection({
  items,
}: {
  items: Item[]
}) {
  return (
    <Stack gap="xs">
      {items.map((item) => (
        <NavItem
          key={item.href}
          {...item}
        />
      ))}
    </Stack>
  )
}