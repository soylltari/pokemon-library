'use client'

import { useEffect, useRef } from 'react'

export const useIntersection = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callbackRef.current()
      }
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return ref
}
