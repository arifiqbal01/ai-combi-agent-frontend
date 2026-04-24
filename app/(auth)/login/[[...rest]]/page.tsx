'use client'

import { SignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useBootstrap } from '@/core/session/useBootstrap'

export default function LoginPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const { ready, hasTenant } = useBootstrap()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded || !ready) return
    if (!isSignedIn) return

    if (!hasTenant) {
      router.replace('/not-allowed')
      return
    }

    router.replace('/inbox')
  }, [isLoaded, isSignedIn, ready, hasTenant, router])

  if (!isLoaded || (isSignedIn && !ready)) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center">
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
      </div>
    )
  }

  return null
}