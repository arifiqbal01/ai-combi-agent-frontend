import { Switch, Text } from '@/ui'

type Props = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
  description?: string
  disabled?: boolean
}

export function Toggle({
  label,
  checked,
  onChange,
  description,
  disabled,
}: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <Text size="sm" weight="medium">
          {label}
        </Text>

        {description && (
          <Text size="xs" className="text-muted-foreground">
            {description}
          </Text>
        )}
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled} // ✅ PASS DOWN
      />
    </div>
  )
}