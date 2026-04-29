import Link from 'next/link'
import { Inline, Text } from '@/ui'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface mt-12">
      <div className="mx-auto max-w-5xl px-4 py-6">

        <Inline className="justify-between items-center">

          {/* Left */}
          <Text size="sm" tone="muted">
            © {new Date().getFullYear()} AI Combi Agent
          </Text>

          {/* Right */}
          <Inline gap="md">
            <Link
              href="/privacy"
              className="text-sm text-text-secondary hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              href="/login"
              className="text-sm text-text-secondary hover:underline"
            >
              Sign in
            </Link>
          </Inline>

        </Inline>

      </div>
    </footer>
  )
}