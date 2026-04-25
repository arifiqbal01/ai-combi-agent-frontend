'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onFiles: (files: File[]) => void
}

export function ComposerFiles({ children, onFiles }: Props) {

  function drop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()

    const files = Array.from(e.dataTransfer.files)
    onFiles(files)
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={drop}
    >
      {children}
    </div>
  )
}