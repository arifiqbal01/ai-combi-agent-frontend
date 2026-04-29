'use client'

import Link from 'next/link'
import { Inline, Text } from '@/ui'
import { useAuth } from '@clerk/nextjs'

export function Header() {
  const { isSignedIn } = useAuth()

  return (
    <header className="border-b border-border-subtle bg-bg-surface">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center">
          <Text weight="semibold">
            AI Combi Agent
          </Text>
        </Link>

        {/* Navigation */}
        <Inline gap="md" className="items-center">

          <Link
            href="/privacy"
            className="text-sm text-text-secondary hover:underline"
          >
            Privacy
          </Link>

          {/* Auth-aware CTA */}
          {isSignedIn ? (
            <Link
              href="/inbox"
              className="inline-flex items-center justify-center rounded-md px-3 h-8 bg-brand text-white text-sm font-medium hover:opacity-90 transition"
            >
              Open Inbox
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md px-3 h-8 bg-brand text-white text-sm font-medium hover:opacity-90 transition"
            >
              Sign in
            </Link>
          )}

        </Inline>
      </div>
    </header>
  )
}
