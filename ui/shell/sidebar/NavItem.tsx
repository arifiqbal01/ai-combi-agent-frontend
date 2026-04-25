'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, Text } from '@/ui'
import clsx from 'clsx'

type Props = {
  href: string
  label: string
  icon: React.ElementType
}

export default function NavItem({
  href,
  label,
  icon: IconComp,
}: Props) {
  const pathname = usePathname()

  const isActive =
    pathname === href ||
    pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={clsx(
        'flex flex-col items-center justify-center gap-1 py-3 transition w-full',
      )}
    >
      {/* ICON */}
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

      {/* LABEL */}
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