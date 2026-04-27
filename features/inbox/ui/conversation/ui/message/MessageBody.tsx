'use client'

import { useMemo, useState, useRef, useEffect } from 'react'

type Props = {
  html?: string
}

export function MessageBody({ html }: Props) {

  const [expanded, setExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const safeHtml = useMemo(() => {
    if (!html) return ''
    return html.replace(
      /<a(?![^>]*target=)/gi,
      '<a target="_blank" rel="noopener noreferrer" '
    )
  }, [html])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // check overflow AFTER render
    const isTooLong = el.scrollHeight > el.clientHeight + 10
    setIsOverflow(isTooLong)

  }, [safeHtml, expanded])

  if (!safeHtml) return null

  return (
    <div className="text-[14px] leading-[20px]">

      <div
        ref={ref}
        className={`
          break-words

          [&_img]:max-w-full
          [&_img]:h-auto

          [&_a]:text-[rgb(var(--state-info))]
          [&_a]:underline
          [&_a]:break-all

          [&_p]:my-2

          ${
            !expanded
              ? 'line-clamp-6 overflow-hidden'
              : ''
          }
        `}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />

      {/* ✅ INLINE READ MORE */}
      {!expanded && isOverflow && (
        <span
          onClick={() => setExpanded(true)}
          className="
            text-[13px]
            text-[rgb(var(--state-info))]
            cursor-pointer
            font-medium
          "
        >
          Read more
        </span>
      )}

      {/* optional collapse */}
      {expanded && (
        <span
          onClick={() => setExpanded(false)}
          className="
            ml-2
            text-[12px]
            text-gray-500
            cursor-pointer
          "
        >
          Show less
        </span>
      )}

    </div>
  )
}