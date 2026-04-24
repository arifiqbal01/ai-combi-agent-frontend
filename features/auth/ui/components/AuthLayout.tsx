'use client'

import {
  Surface,
  Stack,
  Text,
} from '@/ui'

type Props = {
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-muted px-4">
      <Surface
        variant="elevated"
        className="
          w-full
          max-w-md
          rounded-2xl
          p-8
          shadow-lg
        "
      >
        <Stack gap="lg">
          {/* HEADER */}
          <Stack gap="xs" className="text-center">
            {/* Optional branding */}
            <Text
              size="sm"
              tone="brand"
              weight="semibold"
            >
              AI Combi Agent
            </Text>

            <Text size="xl" weight="semibold">
              {title}
            </Text>

            {description && (
              <Text size="sm" tone="secondary">
                {description}
              </Text>
            )}
          </Stack>

          {/* CONTENT */}
          {children}

          {/* FOOTER */}
          {footer && (
            <Text
              size="sm"
              tone="secondary"
              className="text-center"
            >
              {footer}
            </Text>
          )}
        </Stack>
      </Surface>
    </div>
  )
}