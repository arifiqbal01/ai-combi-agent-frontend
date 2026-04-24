'use client'

import { useLoginForm } from '../hooks/useLoginForm'
import { AuthLayout } from './AuthLayout'

import {
  Stack,
  Text,
  Input,
  Button,
} from '@/ui'

export function LoginForm() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
    loading,
    error,
  } = useLoginForm()

  return (
    <AuthLayout
      title="Sign in"
      description="Continue to your workspace"
      footer={
        <>
          Don’t have an account?{' '}
          <span className="text-brand font-medium">
            Contact admin
          </span>
        </>
      }
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        {/* EMAIL */}
        <Stack gap="xs">
          <label className="text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Stack>

        {/* PASSWORD */}
        <Stack gap="xs">
          <label className="text-sm font-medium">
            Password
          </label>

          <Input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
        </Stack>

        {/* ERROR */}
        {error && (
          <Text size="sm" tone="danger">
            {error}
          </Text>
        )}

        {/* ACTION */}
        <Button
          type="submit"
          loading={loading}
          disabled={!email || !password}
          className="mt-2"
        >
          Continue
        </Button>
      </form>
    </AuthLayout>
  )
}