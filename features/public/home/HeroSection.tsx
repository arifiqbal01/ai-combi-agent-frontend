import Link from 'next/link'
import { Stack, Inline, Text } from '@/ui'

export function HeroSection() {
  return (
   <section className="py-1 md:py-1">
  <div className="max-w-6xl">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

      {/* LEFT */}
      <Stack gap="md">

        <Text
          as="h1"
          weight="bold"
          className="text-3xl md:text-5xl leading-tight"
        >
          AI-powered inbox for modern teams
        </Text>

        <Text tone="secondary" className="text-base md:text-lg max-w-md">
          AI Combi Agent unifies your Gmail conversations into a single workspace.
          Respond faster, stay organized, and automate replies with intelligent assistance.
        </Text>

        <Stack gap="xs">
          <Inline gap="sm">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md px-6 h-10 bg-brand text-white font-medium text-sm hover:opacity-90 transition"
            >
              Sign in
            </Link>
          </Inline>

          <Text size="xs" tone="muted">
            Access is available by invitation only.
          </Text>
        </Stack>

        <Text size="xs" tone="muted">
          By continuing, you agree to our{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </Text>

      </Stack>

      {/* RIGHT */}
      <div className="rounded-xl border border-border-subtle bg-bg-muted/30 p-4 shadow-sm">
        <div className="h-44 md:h-60 rounded-lg bg-gradient-to-br from-bg-muted to-bg-surface flex items-center justify-center text-sm text-text-secondary">
          Product Preview
        </div>
      </div>

    </div>

  </div>
</section>
  )
}