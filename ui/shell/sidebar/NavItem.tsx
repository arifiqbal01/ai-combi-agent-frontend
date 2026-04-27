'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, Text } from '@/ui'
import clsx from 'clsx'

type Props = {
  href: string
  label: string
  icon: React.ElementType
  variant?: 'rail' | 'drawer'
  onClick?: () => void
}

export default function NavItem({
  href,
  label,
  icon: IconComp,
  variant = 'rail',
  onClick,
}: Props) {
  const pathname = usePathname()

  const isActive =
    pathname === href ||
    pathname.startsWith(`${href}/`)

  // ✅ DRAWER (mobile)
  if (variant === 'drawer') {
    return (
      <Link
        href={href}
        onClick={() => onClick?.()}
        className={clsx(
          'flex items-center gap-3 px-3 py-2 rounded-md transition',
          isActive
            ? 'bg-bg-muted text-text-primary'
            : 'text-text-secondary hover:bg-bg-muted/50'
        )}
      >
        <Icon size="md">
          <IconComp />
        </Icon>

        <Text size="sm" weight="medium">
          {label}
        </Text>
      </Link>
    )
  }

  // ✅ DESKTOP RAIL
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-1 py-3 transition w-full"
    >
      <div
        className={clsx(
          'flex h-10 w-10 items-center justify-center rounded-xl transition',
          isActive
            ? 'bg-bg-muted'
            : 'hover:bg-bg-muted/50'
        )}
      >
        <Icon
          size="md"
          tone={isActive ? 'default' : 'muted'}
        >
          <IconComp />
        </Icon>
      </div>

      <Text
        size="xs"
        weight="medium"
        className={clsx(
          'text-center',
          isActive
            ? 'text-text-primary'
            : 'text-text-secondary'
        )}
      >
        {label}
      </Text>
    </Link>
  )
}