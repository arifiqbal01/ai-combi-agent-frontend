import { Stack, Text } from '@/ui'

type Props = {
  label: string
  children: React.ReactNode
  description?: string
  error?: string
}

export function Field({
  label,
  children,
  description,
  error,
}: Props) {
  return (
    <Stack gap="xs">
      <Text size="sm" weight="medium">
        {label}
      </Text>

      {description && !error && (
        <Text size="xs" className="text-muted-foreground">
          {description}
        </Text>
      )}

      {children}

      {/* ✅ Error state */}
      {error && (
        <Text size="xs" className="text-red-500">
          {error}
        </Text>
      )}
    </Stack>
  )
}