'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

/* =========================================================
   CARD
========================================================= */

type CardProps = {
  children: ReactNode
  className?: string
  size?: 'default' | 'compact'
}

export function Card({
  children,
  className,
  size = 'default',
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-border-subtle bg-bg-surface shadow-sm',
        size === 'compact' ? 'text-sm' : 'text-base',
        className
      )}
    >
      {children}
    </div>
  )
}

/* =========================================================
   CARD HEADER
========================================================= */

type CardHeaderProps = {
  title?: string
  description?: string
  action?: ReactNode
}

export function CardHeader({
  title,
  description,
  action,
}: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-4 py-3">
      <div className="space-y-0.5">
        {title && (
          <h3 className="text-sm font-semibold text-text-primary">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-xs text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}

/* =========================================================
   CARD BODY
========================================================= */

type CardBodyProps = {
  children: ReactNode
  className?: string
}

export function CardBody({
  children,
  className,
}: CardBodyProps) {
  return (
    <div
      className={clsx(
        'px-4 py-4',
        className
      )}
    >
      {children}
    </div>
  )
}

/* =========================================================
   CARD FOOTER
========================================================= */

type CardFooterProps = {
  children: ReactNode
}

export function CardFooter({ children }: CardFooterProps) {
  return (
    <div className="border-t border-border-subtle px-4 py-3">
      {children}
    </div>
  )
}
