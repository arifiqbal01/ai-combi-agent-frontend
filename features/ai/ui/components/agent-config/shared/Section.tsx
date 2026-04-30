import { Stack, Text } from '@/ui'
import clsx from 'clsx'

type Props = {
  title: string
  children: React.ReactNode
  description?: string
  disabled?: boolean
}

export function Section({
  title,
  children,
  description,
  disabled,
}: Props) {
  return (
    <Stack
      gap="sm"
      className={clsx(
        'border rounded-lg p-4',
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      <Stack gap="xs">
        <Text weight="medium">{title}</Text>

        {description && (
          <Text size="xs" className="text-muted-foreground">
            {description}
          </Text>
        )}
      </Stack>

      {children}
    </Stack>
  )
}