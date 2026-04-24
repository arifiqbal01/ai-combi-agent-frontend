'use client'

import { useState } from 'react'

import {
 Stack,
 Text,
 Input,
 Button,
 Inline,
 toast,
} from '@/ui'

type FAQ = { q: string; a: string }

export function FAQForm({
 onSubmit,
}: {
 onSubmit: (data: FAQ[]) => Promise<void>
}) {
 const [items, setItems] = useState<FAQ[]>([
  { q: '', a: '' },
 ])

 function update(index: number, key: 'q' | 'a', value: string) {
  const next = [...items]
  next[index][key] = value
  setItems(next)
 }

 function addItem() {
  setItems([...items, { q: '', a: '' }])
 }

 function removeItem(index: number) {
  if (items.length === 1) return
  setItems(items.filter((_, i) => i !== index))
 }

 async function handleSubmit() {
  const valid = items.filter(i => i.q && i.a)

  if (!valid.length) {
   toast.error('Add at least one FAQ')
   return
  }

  await onSubmit(valid)
 }

 return (
  <Stack gap="sm">

   <Text weight="medium">Add FAQs</Text>

   {items.map((item, i) => (
    <Stack key={i} gap="xs" className="border rounded-md p-2">
     <Input
      placeholder="Question"
      value={item.q}
      onChange={e => update(i, 'q', e.target.value)}
     />

     <Input
      placeholder="Answer"
      value={item.a}
      onChange={e => update(i, 'a', e.target.value)}
     />

     <Inline className="justify-end">
      <Button size="xs" variant="ghost" onClick={() => removeItem(i)}>
       Remove
      </Button>
     </Inline>
    </Stack>
   ))}

   <Inline>
    <Button variant="secondary" onClick={addItem}>
     Add more
    </Button>

    <Button onClick={handleSubmit}>
     Save
    </Button>
   </Inline>

  </Stack>
 )
}