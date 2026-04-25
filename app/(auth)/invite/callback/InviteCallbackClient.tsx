'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { authApi } from '@/features/auth/infrastructure/api/auth.api'

export default function InviteCallbackClient() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

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
        // ✅ Use API layer (no direct fetch)
        const data = await authApi.acceptInvite({
          token: inviteToken,
        })

        // ✅ Store tenant (bootstrap step)
        if (data?.tenant_id) {
          localStorage.setItem('tenant_id', data.tenant_id)
        }

        // ✅ cleanup
        sessionStorage.removeItem('invite_token')

        // ✅ redirect to app
        router.replace('/')
      } catch (err: any) {
        const message = err?.message || ''

        // ✅ allow already accepted flow
        if (message.includes('already consumed')) {
          router.replace('/')
          return
        }

        router.replace('/not-allowed')
      }
    }

    run()
  }, [isLoaded, isSignedIn, router])

  return (
    <div className="h-screen flex items-center justify-center">
      <span className="text-sm text-muted">
        Setting up your workspace...
      </span>
    </div>
  )
}