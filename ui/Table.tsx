'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

type TableProps = {
  children: ReactNode
  size?: 'default' | 'compact'
}

export function Table({
  children,
  size = 'default',
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={clsx(
          'w-full border-collapse text-left',
          size === 'compact' ? 'text-sm' : 'text-base'
        )}
      >
        {children}
      </table>
    </div>
  )
}

/* --------------------------------------------------------- */

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-border-subtle bg-bg-muted">
      {children}
    </thead>
  )
}

/* --------------------------------------------------------- */

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

/* --------------------------------------------------------- */

export function TableRow({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <tr
      onClick={onClick}
      className={clsx(
        'border-b border-border-subtle',
        onClick &&
          'cursor-pointer hover:bg-bg-muted'
      )}
    >
      {children}
    </tr>
  )
}

/* --------------------------------------------------------- */

export function TableCell({
  children,
  align = 'left',
}: {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
}) {
  return (
    <td
      className={clsx(
        'px-4 py-2',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right'
      )}
    >
      {children}
    </td>
  )
}

/* --------------------------------------------------------- */

export function TableHeaderCell({
  children,
  align = 'left',
}: {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
}) {
  return (
    <th
      scope="col"
      className={clsx(
        'px-4 py-2 text-xs font-medium uppercase tracking-wide text-text-secondary',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right'
      )}
    >
      {children}
    </th>
  )
}
