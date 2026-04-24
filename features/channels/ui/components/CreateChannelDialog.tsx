'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Button,
  Input,
  Stack,
  Text,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/ui'
import { useCreateChannel } from '../../application/mutations'
import {
  CHANNEL_TYPES,
  PROVIDERS,
} from '../../domain/channel.constants'

import {
  ChannelType,
  Provider,
} from '../../domain/channel.types'

export function CreateChannelDialog() {
  const create = useCreateChannel()

  const [open, setOpen] = useState(false)

  const [label, setLabel] = useState('')
  const [channelType, setChannelType] = useState<ChannelType>('email')
  const [provider, setProvider] = useState<Provider>('gmail')

  const providerOptions = PROVIDERS[channelType]

  const handleCreate = () => {
    if (!label) return

    create.mutate(
      {
        label,
        channel_type: channelType,
        provider,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setLabel('')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        Add Channel
      </Button>

      <DialogContent
          className="
            max-w-md
            w-full
            relative
            rounded-xl
            p-6
          "
          onPointerDownOutside={() => setOpen(false)}
          onEscapeKeyDown={() => setOpen(false)}
        >

          {/* CLOSE */}
          <DialogClose asChild>
            <button className="absolute right-5 top-5 text-lg opacity-70 hover:opacity-100">
              ✕
            </button>
          </DialogClose>

          {/* HEADER */}
          <DialogHeader className="mb-4 pb-3 border-b">
            <DialogTitle className="text-lg font-semibold">
              Connect Channel
            </DialogTitle>
          </DialogHeader>

        <Stack gap="md">

          {/* TYPE */}
<Stack gap="xs">
  <Text size="sm" weight="medium">
    Channel Type
  </Text>

  <Select
      value={channelType}
      onValueChange={(val: ChannelType) => {
        setChannelType(val)
        setProvider(PROVIDERS[val][0].value) // reset safely
      }}
    >
    <SelectTrigger>
      <SelectValue placeholder="Select channel type" />
    </SelectTrigger>

    <SelectContent>
      {CHANNEL_TYPES.map((t) => (
        <SelectItem key={t.value} value={t.value}>
          {t.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</Stack>
<Stack gap="xs">
  <Text size="sm" weight="medium">
    Provider
  </Text>

  <Select
      value={provider}
      onValueChange={(val: Provider) => setProvider(val)}
    >
    <SelectTrigger>
      <SelectValue placeholder="Select provider" />
    </SelectTrigger>

    <SelectContent>
      {providerOptions.map((p) => (
        <SelectItem key={p.value} value={p.value}>
          {p.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</Stack>

          {/* LABEL */}
          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Label
            </Text>

            <Input
              placeholder="e.g. Support Gmail"
              value={label}
              onChange={(e) =>
                setLabel(e.target.value)
              }
            />
          </Stack>

          {/* ACTION */}
          <Button
            onClick={handleCreate}
            loading={create.isPending}
          >
            Create Channel
          </Button>

        </Stack>
      </DialogContent>
    </Dialog>
  )
}