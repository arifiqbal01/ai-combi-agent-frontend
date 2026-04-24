'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth, useClerk } from '@clerk/nextjs'

export default function AcceptInvitePage() {
  const params = useSearchParams()
  const { isLoaded, userId } = useAuth()
  const { redirectToSignIn } = useClerk()

  const hasRun = useRef(false)

  useEffect(() => {
    if (!isLoaded || hasRun.current) return

    hasRun.current = true

    const token = params.get('token')

    if (!token) {
      window.location.replace('/not-allowed')
      return
    }

    sessionStorage.setItem('invite_token', token)

    if (!userId) {
      redirectToSignIn({
        redirectUrl: `/invite/accept?token=${token}`,
      })
      return
    }

    window.location.replace('/invite/callback')
  }, [isLoaded, userId, params, redirectToSignIn])

  return null
}