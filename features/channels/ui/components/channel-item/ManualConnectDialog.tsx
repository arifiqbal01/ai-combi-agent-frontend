'use client'

import { useState, useEffect } from 'react'
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
  toast,
} from '@/ui'
import { useConnectChannel } from '@/features/channels/application/mutations'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  channelId: string | null
}

export function ManualConnectDialog({
  open,
  onOpenChange,
  channelId,
}: Props) {
  const connect = useConnectChannel()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ✅ Gmail defaults
  const [imapHost, setImapHost] = useState('imap.gmail.com')
  const [imapPort, setImapPort] = useState('993')

  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com')
  const [smtpPort, setSmtpPort] = useState('587') // ✅ FIXED
  const [smtpEncryption, setSmtpEncryption] = useState('tls') // ✅ FIXED

  // 🔥 reset form
  useEffect(() => {
    if (!open) {
      setUsername('')
      setPassword('')
      setImapHost('imap.gmail.com')
      setImapPort('993')
      setSmtpHost('smtp.gmail.com')
      setSmtpPort('587') // ✅ FIXED
      setSmtpEncryption('tls') // ✅ FIXED
    }
  }, [open])

  // 🔥 auto-detect provider (simple but powerful)
  useEffect(() => {
    if (!username) return

    const domain = username.split('@')[1]?.toLowerCase()

    if (!domain) return

    // Gmail
    if (domain.includes('gmail.com')) {
      setImapHost('imap.gmail.com')
      setImapPort('993')
      setSmtpHost('smtp.gmail.com')
      setSmtpPort('587')
      setSmtpEncryption('tls')
    }

    // Outlook
    if (domain.includes('outlook.com') || domain.includes('hotmail.com')) {
      setImapHost('outlook.office365.com')
      setImapPort('993')
      setSmtpHost('smtp.office365.com')
      setSmtpPort('587')
      setSmtpEncryption('tls')
    }

  }, [username])

  const handleSubmit = () => {
    if (!channelId) return

    const cleanUsername = username.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanUsername || !cleanPassword) {
      toast.error('Username and password required')
      return
    }

    if (!smtpHost || !smtpPort) {
      toast.error('SMTP configuration required')
      return
    }

    if (!imapHost || !imapPort) {
      toast.error('IMAP configuration required')
      return
    }

    connect.mutate(
      {
        id: channelId,
        body: {
          data: {
            username: cleanUsername,
            password: cleanPassword,
            imap_host: imapHost,
            imap_port: Number(imapPort),
            smtp_host: smtpHost,
            smtp_port: Number(smtpPort),
            smtp_encryption: smtpEncryption || 'tls', // ✅ safety fallback
          },
        },
      },
      {
        onSuccess: (res) => {
          if (res.status === 'connected') {
            toast.success('Channel connected')
            onOpenChange(false)
          }
        },
        onError: () => {
          toast.error('Connection failed. Check credentials or settings.')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6 rounded-xl relative">

        <DialogClose asChild>
          <button className="absolute right-5 top-5 opacity-70 hover:opacity-100">
            ✕
          </button>
        </DialogClose>

        <DialogHeader className="mb-4 pb-3 border-b">
          <DialogTitle>Connect Email</DialogTitle>
        </DialogHeader>

        <Stack gap="md">

          <Stack gap="xs">
            <Text size="sm">Email / Username</Text>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Stack>

          <Stack gap="xs">
            <Text size="sm">Password</Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>

          <Stack gap="xs">
            <Text size="sm">IMAP Host</Text>
            <Input value={imapHost} onChange={(e) => setImapHost(e.target.value)} />
          </Stack>

          <Stack gap="xs">
            <Text size="sm">IMAP Port</Text>
            <Input value={imapPort} onChange={(e) => setImapPort(e.target.value)} />
          </Stack>

          <Stack gap="xs">
            <Text size="sm">SMTP Host</Text>
            <Input value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
          </Stack>

          <Stack gap="xs">
            <Text size="sm">SMTP Port</Text>
            <Input value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
          </Stack>

          <Stack gap="xs">
            <Text size="sm">Encryption</Text>
            <Select value={smtpEncryption} onValueChange={setSmtpEncryption}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ssl">SSL</SelectItem>
                <SelectItem value="tls">TLS</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </Stack>

          <Text size="xs" tone="muted">
            For Gmail, use an App Password instead of your account password.
          </Text>

          <Button
            onClick={handleSubmit}
            loading={connect.isPending}
            className="w-full"
          >
            Connect
          </Button>

        </Stack>
      </DialogContent>
    </Dialog>
  )
}