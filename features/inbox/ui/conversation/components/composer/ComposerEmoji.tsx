'use client'

import { useEffect, useRef } from 'react'

type Props = {
  onSelect: (emoji: string) => void
  onClose: () => void
}

const emojis = ['😀','😂','👍','🔥','🎉','❤️']

export function ComposerEmoji({ onSelect, onClose }: Props) {

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    function click(e: MouseEvent) {
      const target = e.target as Node

      if (ref.current && !ref.current.contains(target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', click)

    return () => {
      document.removeEventListener('mousedown', click)
    }

  }, [onClose])

  return (
    <div
      ref={ref}
      className="
        bg-white border rounded-lg
        p-2 shadow flex gap-2
      "
    >
      {emojis.map(e => (
        <button
          key={e}
          onClick={() => onSelect(e)}
          className="text-lg"
        >
          {e}
        </button>
      ))}
    </div>
  )
}