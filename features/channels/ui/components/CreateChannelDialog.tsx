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
} from '../../domain/channel.constants'

import {
  ChannelType,
} from '../../domain/channel.types'

export function CreateChannelDialog() {
  const create = useCreateChannel()

  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState('')
  const [channelType, setChannelType] =
    useState<ChannelType>('gmail')

  const handleCreate = () => {
    if (!label) return

    create.mutate(
      {
        label,
        channel_type: channelType,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setLabel('')
          setChannelType('gmail')
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
        <DialogClose asChild>
          <button className="absolute right-5 top-5 text-lg opacity-70 hover:opacity-100">
            ✕
          </button>
        </DialogClose>

        <DialogHeader className="mb-4 pb-3 border-b">
          <DialogTitle className="text-lg font-semibold">
            Connect Channel
          </DialogTitle>
        </DialogHeader>

        <Stack gap="md">
          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Channel Type
            </Text>

            <Select
              value={channelType}
              onValueChange={(val: ChannelType) =>
                setChannelType(val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select channel type" />
              </SelectTrigger>

              <SelectContent>
                {CHANNEL_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Stack>

          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Label
            </Text>

            <Input
              placeholder="e.g. Support WhatsApp"
              value={label}
              onChange={(e) =>
                setLabel(e.target.value)
              }
            />
          </Stack>

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