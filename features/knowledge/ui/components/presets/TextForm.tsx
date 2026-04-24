'use client'

import { useState } from 'react'

import {
 Stack,
 Text,
 Textarea,
 Button,
} from '@/ui'

export function TextForm({
 onSubmit,
}: {
 onSubmit: (value: string) => Promise<void>
}) {
 const [value, setValue] = useState('')

 async function handleSubmit() {
  if (!value.trim()) return

  await onSubmit(value)
  setValue('')
 }

 return (
  <Stack gap="sm">

   <Text weight="medium">Add Knowledge</Text>

   <Textarea
    autoFocus
    value={value}
    onChange={e => setValue(e.target.value)}
    placeholder="Write knowledge..."
   />

   <Button onClick={handleSubmit}>
    Save
   </Button>

  </Stack>
 )
}