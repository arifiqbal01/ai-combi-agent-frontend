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
      className="flex w-16 flex-col items-center gap-2 py-3"
    >
      {/* ICON ONLY ACTIVE */}
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

      {/* LABEL (no background ever) */}
      <Text
        size="xs"
        weight="medium"
        className={clsx(
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