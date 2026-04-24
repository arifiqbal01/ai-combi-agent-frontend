'use client'

import { Surface, Inline } from '@/ui'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

export default function Header() {
  return (
    <Surface
      className="
        flex h-full items-center justify-between
        px-4
      "
    >
      <HeaderLeft />
      <HeaderRight />
    </Surface>
  )
}