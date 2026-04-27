'use client'

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Keyboard,
  X
} from 'lucide-react'

import clsx from 'clsx'
import { useState, useRef, useEffect } from 'react'

import {
  toggleBold,
  toggleItalic,
  toggleUnderline,
  toggleBulletList,
  toggleOrderedList,
  toggleCode,
  setLink,
  removeLink,
  isBold,
  isItalic,
  isUnderline,
  isBulletList,
  isOrderedList,
  isCode,
  isLinkActive
} from '@/features/inbox/application/composer'

import { EditorAdapter } from '@/features/inbox/infrastructure/editor/editor.interface'
import { ComposerShortcutsPopover } from './ComposerShortcutsPopover'

type Props = {
  editor: EditorAdapter | null
}

export function ComposerToolbar({ editor }: Props) {

  const [showLink, setShowLink] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [url, setUrl] = useState('')
  const [, forceUpdate] = useState(0)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const popRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editor) return
    const update = () => forceUpdate(v => v + 1)
    editor.onUpdate(update)
  }, [editor])

  useEffect(() => {
    if (!showLink) return

    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })

    if (editor) {
      const link = editor.getLink()
      if (link) setUrl(link)
    }
  }, [showLink, editor])

  useEffect(() => {
    function click(e: MouseEvent) {
      const target = e.target as Node
      if (popRef.current && !popRef.current.contains(target)) {
        setShowLink(false)
      }
    }

    if (showLink) {
      document.addEventListener('mousedown', click)
    }

    return () => {
      document.removeEventListener('mousedown', click)
    }
  }, [showLink])

  if (!editor) return null

  function btn(active: boolean) {
    return clsx(
      // 🔥 smaller on mobile
      'flex items-center justify-center rounded-md transition',
      'w-7 h-7 sm:w-8 sm:h-8',

      active
        ? 'bg-gray-200 text-black'
        : 'text-gray-600 hover:bg-gray-100'
    )
  }

  function normalizeUrl(value: string) {
    if (!value) return ''
    if (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:')
    ) return value

    return 'https://' + value
  }

  function applyLink() {
    if (!url) {
      removeLink(editor)
      setShowLink(false)
      editor.focus()
      return
    }

    setLink(editor, normalizeUrl(url))
    setShowLink(false)
    editor.focus()
  }

  return (
    <div className="relative w-full">

      {/* 🔥 SCROLLABLE TOOLBAR */}
      <div className="
        flex items-center gap-1
        overflow-x-auto
        scrollbar-none
        px-1
      ">

        {/* TEXT */}
        <div className="flex items-center gap-1 shrink-0">
          <button className={btn(isBold(editor))} onClick={() => { toggleBold(editor); editor.focus() }}>
            <Bold size={14} />
          </button>

          <button className={btn(isItalic(editor))} onClick={() => { toggleItalic(editor); editor.focus() }}>
            <Italic size={14} />
          </button>

          <button className={btn(isUnderline(editor))} onClick={() => { toggleUnderline(editor); editor.focus() }}>
            <Underline size={14} />
          </button>
        </div>

        <div className="mx-1 w-px h-4 bg-gray-200 shrink-0" />

        {/* LIST */}
        <div className="flex items-center gap-1 shrink-0">
          <button className={btn(isBulletList(editor))} onClick={() => { toggleBulletList(editor); editor.focus() }}>
            <List size={14} />
          </button>

          <button className={btn(isOrderedList(editor))} onClick={() => { toggleOrderedList(editor); editor.focus() }}>
            <ListOrdered size={14} />
          </button>
        </div>

        <div className="mx-1 w-px h-4 bg-gray-200 shrink-0" />

        {/* LINK */}
        <div className="flex items-center gap-1 shrink-0">
          <button className={btn(isLinkActive(editor))} onClick={() => setShowLink(v => !v)}>
            <LinkIcon size={14} />
          </button>
        </div>

        <div className="mx-1 w-px h-4 bg-gray-200 shrink-0" />

        {/* CODE */}
        <div className="flex items-center gap-1 shrink-0">
          <button className={btn(isCode(editor))} onClick={() => { toggleCode(editor); editor.focus() }}>
            <Code size={14} />
          </button>
        </div>

        <div className="mx-1 w-px h-4 bg-gray-200 shrink-0" />

        {/* SHORTCUTS */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            className={btn(showShortcuts)}
            onClick={() => setShowShortcuts(v => !v)}
          >
            <Keyboard size={14} />
          </button>
        </div>

      </div>

      {/* 🔥 RESPONSIVE LINK POPOVER */}
      {showLink && (
        <div
          ref={popRef}
          className="
            absolute z-50 mt-2
            left-0 right-0 sm:left-0 sm:right-auto

            bg-white border rounded-lg shadow-xl
            p-2 flex gap-2 items-center

            w-full sm:w-auto
          "
        >

          <input
            ref={inputRef}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                applyLink()
              }
              if (e.key === 'Escape') setShowLink(false)
            }}
            placeholder="Paste link…"
            className="
              text-sm border rounded-md px-2 py-1
              w-full sm:w-[240px]
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          />

          <button
            onClick={applyLink}
            className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Apply
          </button>

          <button
            onClick={() => {
              removeLink(editor)
              setShowLink(false)
              editor.focus()
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={14} />
          </button>

        </div>
      )}

      <ComposerShortcutsPopover
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

    </div>
  )
}