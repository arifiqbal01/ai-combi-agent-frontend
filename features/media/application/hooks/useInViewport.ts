'use client'

import { useEffect, useRef, useState } from 'react'

export function useInViewport(
  rootMargin = '200px'
) {
  const ref =
    useRef<HTMLDivElement>(null)

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

    const element = ref.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }

      observer.disconnect()
    }
  }, [rootMargin])

  return {
    ref,
    visible,
  }
}