'use client'

import { Surface } from '@/ui'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

export default function Header() {
  return (
    <Surface
      className="flex !h-full items-center justify-between px-3 md:px-5"
    >
      <HeaderLeft />
      <HeaderRight />
    </Surface>
  )
}