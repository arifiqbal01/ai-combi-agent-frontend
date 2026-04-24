'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export default function InviteCallbackPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn, getToken } = useAuth()

  // 🔥 prevent double execution (VERY IMPORTANT)
  const hasRun = useRef(false)

  useEffect(() => {
    async function run() {
      if (!isLoaded || !isSignedIn || hasRun.current) return

      hasRun.current = true

      const inviteToken = sessionStorage.getItem('invite_token')

      if (!inviteToken) {
        router.replace('/not-allowed')
        return
      }

      try {
        // 🔥 FORCE fresh token
        const clerkToken = await getToken({ skipCache: true })

        if (!clerkToken) {
          throw new Error('No auth token')
        }

       const res = await fetch(
          'http://localhost:8000/api/v1/auth/accept-invite',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${clerkToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: inviteToken,
            }),
          }
        )

        const data = await res.json()

        console.log('FINAL TENANT ID:', data?.tenant_id)
        console.log('LOCAL STORAGE:', localStorage.getItem('tenant_id'))

        if (!res.ok) {
          if (data?.detail?.includes('already consumed')) {
            console.log('Invite already accepted → continuing')
          } else {
            throw new Error(data?.detail || 'Invite failed')
          }
        }

        if (data?.tenant_id) {
          localStorage.setItem('tenant_id', data.tenant_id)
        }

        sessionStorage.removeItem('invite_token')

        router.replace('/')
      } catch (err) {
        console.error(err)
        router.replace('/not-allowed')
      }
    }

    run()
  }, [isLoaded, isSignedIn, getToken, router])

  return (
    <div className="h-screen flex items-center justify-center">
      <span className="text-sm text-muted">
        Setting up your workspace...
      </span>
    </div>
  )
}