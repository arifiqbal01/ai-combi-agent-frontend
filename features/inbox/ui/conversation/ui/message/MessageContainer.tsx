'use client'

import clsx from 'clsx'

type Props = {
  align: 'left' | 'right' | 'center'
  grouped?: boolean
  children: React.ReactNode
}

export function MessageContainer({
  align,
  grouped,
  children
}: Props) {
  return (
    <div
      className={clsx(
        'flex w-full px-6',

        align === 'right' && 'justify-end',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',

        grouped ? 'mt-1' : 'mt-5'
      )}
    >
      <div className="max-w-[min(680px,90vw)] w-fit min-w-0 flex flex-col">
        {children}
      </div>
    </div>
  )
}