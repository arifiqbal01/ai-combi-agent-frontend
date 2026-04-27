import { Stack } from '@/ui'
import NavItem from './NavItem'

type Item = {
  label: string
  href: string
  icon: React.ElementType
}

export default function SidebarSection({
  items,
  variant = 'rail',
  onItemClick,
}: {
  items: Item[]
  variant?: 'rail' | 'drawer'
  onItemClick?: () => void
}) {
  return (
    <Stack gap="xs">
      {items.map((item) => (
        <NavItem
          key={item.href}
          {...item}
          variant={variant}
          onClick={onItemClick} // ✅ PASS DOWN
        />
      ))}
    </Stack>
  )
}