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
} from '@/ui'

import { useCreateAgent } from '../../application/mutations'

export function CreateAgentDialog() {
  const create = useCreateAgent()

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleCreate = () => {
    if (!name) return

    create.mutate(
      {
        name,
        description,
        config: {}, // 🔥 required by backend
      },
      {
        onSuccess: () => {
          setOpen(false)
          setName('')
          setDescription('')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        Add Agent
      </Button>

      <DialogContent
        className="max-w-md w-full rounded-xl p-6 relative"
        onPointerDownOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >

        <DialogClose asChild>
          <button className="absolute right-5 top-5 opacity-70 hover:opacity-100">
            ✕
          </button>
        </DialogClose>

        <DialogHeader className="mb-4 pb-3 border-b">
          <DialogTitle className="text-lg font-semibold">
            Create AI Agent
          </DialogTitle>
        </DialogHeader>

        <Stack gap="md">

          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Name
            </Text>

            <Input
              placeholder="e.g. Support Assistant"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </Stack>

          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Description
            </Text>

            <Input
              placeholder="Optional"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </Stack>

          <Button
            onClick={handleCreate}
            loading={create.isPending}
          >
            Create Agent
          </Button>

        </Stack>
      </DialogContent>
    </Dialog>
  )
}