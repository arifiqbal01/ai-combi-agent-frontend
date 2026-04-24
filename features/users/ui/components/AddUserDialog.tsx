'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Button,
  Stack,
  Input,
  Text,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  toast,
} from '@/ui'

import { useAddUser } from '../../application/mutations'

// AddUserDialog.tsx

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'agent', label: 'Agent' },
  { value: 'viewer', label: 'Viewer' },
]

// 🔥 VALIDATION HELPERS
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export function AddUserDialog() {
  const create = useAddUser()

  const [open, setOpen] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('viewer')

  const isFormValid =
    isValidEmail(email) && password.length >= 8

  const handleCreate = () => {
    if (!isValidEmail(email)) {
      toast.error('Invalid email')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    create.mutate(
      { email, password, role },
      {
        onSuccess: () => {
          toast.success('User created')
          setOpen(false)

          setEmail('')
          setPassword('')
          setRole('member')
        },
        onError: (err: any) => {
          toast.error(
            err?.message || 'Failed to create user'
          )
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        Add User
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
            Add User
          </DialogTitle>
        </DialogHeader>

        <Stack gap="md">
          {/* EMAIL */}
          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Email
            </Text>

            <Input
              placeholder="user@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              hasError={
                email.length > 0 &&
                !isValidEmail(email)
              }
            />
          </Stack>

          {/* PASSWORD */}
          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Password
            </Text>

            <Input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              hasError={
                password.length > 0 &&
                password.length < 8
              }
            />
          </Stack>

          {/* ROLE */}
          <Stack gap="xs">
            <Text size="sm" weight="medium">
              Role
            </Text>

            <Select
              value={role}
              onValueChange={setRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem
                    key={r.value}
                    value={r.value}
                  >
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Stack>

          {/* ACTION */}
          <Button
            onClick={handleCreate}
            loading={create.isPending}
            disabled={!isFormValid}
          >
            Create User
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}