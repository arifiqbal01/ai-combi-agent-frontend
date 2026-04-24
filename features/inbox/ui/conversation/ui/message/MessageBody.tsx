'use client'

import { useMemo, useState, useRef, useEffect } from 'react'

type Props = {
  html: string
}

const PREVIEW_HEIGHT = 240

export function MessageBody({ html }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)
  const [measured, setMeasured] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)

  const safeHtml = useMemo(() => {
    if (!html) return ''

    return html.replace(
      /<a(?![^>]*target=)/gi,
      '<a target="_blank" rel="noopener noreferrer" '
    )
  }, [html])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const needsCollapse = el.scrollHeight > PREVIEW_HEIGHT + 20

    setIsOverflow(needsCollapse)
    setMeasured(true)
  }, [safeHtml])

  if (!safeHtml) return null

  return (
    <div className="text-[14px] leading-[22px] w-full min-w-0">
      <div className="relative">
        <div
          ref={contentRef}
          className={`
            w-full min-w-0 max-w-full
            break-words

            transition-[max-height]
            duration-200 ease-out

            ${!measured ? 'opacity-0' : 'opacity-100'}

            [&_img]:max-w-full
            [&_img]:h-auto

            [&_table]:max-w-full
            [&_table]:block
            [&_table]:overflow-x-auto

            /* GLOBAL LINK STYLE */
            [&_a]:text-[rgb(var(--state-info))]
            [&_a]:underline
            [&_a]:break-all

            [&_p]:my-2

            ${
              measured && !expanded && isOverflow
                ? 'overflow-hidden'
                : ''
            }
          `}
          style={
            measured && !expanded && isOverflow
              ? { maxHeight: PREVIEW_HEIGHT }
              : undefined
          }
          dangerouslySetInnerHTML={{
            __html: safeHtml
          }}
        />

        {/* FADE FIXED */}
        {measured && !expanded && isOverflow && (
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgb(var(--bg-surface)), transparent)'
            }}
          />
        )}
      </div>

      {isOverflow && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="
            mt-2 text-xs font-medium
            text-[rgb(var(--state-info))]
            hover:opacity-80
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[rgb(var(--state-info))]
            rounded
          "
        >
          {expanded ? 'Show less' : 'Show full email'}
        </button>
      )}
    </div>
  )
}