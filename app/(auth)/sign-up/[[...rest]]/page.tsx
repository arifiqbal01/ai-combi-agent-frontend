'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = sessionStorage.getItem('invite_token')

      if (!token) {
        router.replace('/not-allowed')
      } else {
        setAllowed(true)
      }

      setReady(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [router])

  if (!ready) return null
  if (!allowed) return null

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/login"
      />
    </div>
  )
}