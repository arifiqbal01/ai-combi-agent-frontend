'use client'

import { useState } from 'react'

import {
 Stack,
 Text,
 Textarea,
 Button,
} from '@/ui'

export function CompanyForm({
 onSubmit,
}: {
 onSubmit: (data: {
  about: string
  services?: string
  tone?: string
 }) => Promise<void>
}) {
 const [about, setAbout] = useState('')
 const [services, setServices] = useState('')
 const [tone, setTone] = useState('')

 async function handleSubmit() {
  if (!about.trim()) return

  await onSubmit({ about, services, tone })

  setAbout('')
  setServices('')
  setTone('')
 }

 return (
  <Stack gap="sm">

   <Text weight="medium">Company Info</Text>

   <Textarea
    autoFocus
    placeholder="About your company"
    value={about}
    onChange={e => setAbout(e.target.value)}
   />

   <Textarea
    placeholder="Services (optional)"
    value={services}
    onChange={e => setServices(e.target.value)}
   />

   <Textarea
    placeholder="Tone (optional)"
    value={tone}
    onChange={e => setTone(e.target.value)}
   />

   <Button onClick={handleSubmit}>
    Save
   </Button>

  </Stack>
 )
}