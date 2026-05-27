'use client'

import { useEffect, useRef, useState } from 'react'

export function useInViewport(
  rootMargin = '200px'
) {
  const ref =
    useRef<HTMLElement | null>(null)

  const [visible, setVisible] =
    useState(false)

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting)
        },
        { rootMargin }
      )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, visible }
}