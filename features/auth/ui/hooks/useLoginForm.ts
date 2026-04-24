'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'

export function useLoginForm() {
  const router = useRouter()
  const { signIn, isLoaded } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (!isLoaded || loading) return

    setError(null)
    setLoading(true)

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        // Clerk handles session automatically
        router.replace('/inbox')
      } else {
        setError('Login incomplete')
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
    loading,
    error,
  }
}