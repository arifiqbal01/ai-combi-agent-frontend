// app/(public)/page.tsx
'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Main } from '@/features/public/components/Main'
import { HomePage } from '@/features/public/home/HomePage'

export default function Page() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      router.replace('/inbox')
    }
  }, [isLoaded, isSignedIn, router])

  // ⛔ IMPORTANT: do NOT block rendering
  // Google OAuth requires page to load publicly

  return (
    <Main>
      <HomePage />
    </Main>
  )
}