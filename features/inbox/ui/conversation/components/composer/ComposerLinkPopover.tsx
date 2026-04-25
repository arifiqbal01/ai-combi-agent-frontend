'use client'

import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import { Link, X } from 'lucide-react'

type Props = {
  editor: Editor
  onClose: () => void
}

export function ComposerLinkPopover({ editor, onClose }: Props) {

  const ref = useRef<HTMLDivElement | null>(null)
  const [url, setUrl] = useState('')

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

  function apply() {

    if (!url) {
      editor.chain().focus().unsetLink().run()
      onClose()
      return
    }

    editor
      .chain()
      .focus()
      .setLink({ href: url })
      .run()

    onClose()
  }

  return (
    <div
      ref={ref}
      className="
        absolute bottom-14 left-3
        bg-white border rounded-lg shadow-lg
        p-2 flex gap-2 items-center z-50
      "
    >
      <Link size={16} />

      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Paste link…"
        className="
          text-sm border rounded
          px-2 py-1 w-[220px]
        "
      />

      <button
        onClick={apply}
        className="
          text-xs px-2 py-1
          bg-blue-500 text-white rounded
        "
      >
        Apply
      </button>

      <button onClick={onClose}>
        <X size={14} />
      </button>
    </div>
  )
}